import { useCallback, useEffect, useRef, useState } from 'react';

/*
 * Tracks which section crosses a horizontal line 30% down the viewport.
 * A percentage rootMargin keeps working when the window is resized, so there is
 * no need to measure the page height or listen for resize events.
 */
export default function useActiveSection(keys: string[]) {
  const sections = useRef(new Map<string, HTMLElement>());
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const key = (entry.target as HTMLElement).dataset.section;
        if (entry.isIntersecting && key) setActive(key);
      });
    }, { rootMargin: '-30% 0px -69% 0px' });

    sections.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [keys]);

  // Callback ref to attach to each section; React 19 runs the returned cleanup on unmount
  const register = useCallback((key: string) => (el: HTMLElement | null) => {
    if (!el) return undefined;
    sections.current.set(key, el);
    return () => {
      sections.current.delete(key);
    };
  }, []);

  const scrollTo = useCallback((key: string) => {
    sections.current.get(key)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(key);
  }, []);

  return {
    active: active ?? keys[0] ?? null, register, scrollTo,
  };
}
