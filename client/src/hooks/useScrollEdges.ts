import { useEffect, useState, type RefObject } from 'react';

// Whether a horizontally scrollable element can still scroll left or right
export default function useScrollEdges(ref: RefObject<HTMLElement | null>) {
  const [edges, setEdges] = useState({ canScrollLeft: false, canScrollRight: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const update = () => {
      const canScrollLeft = el.scrollLeft > 1;
      const canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
      setEdges((prev) => (
        prev.canScrollLeft === canScrollLeft && prev.canScrollRight === canScrollRight
          ? prev
          : { canScrollLeft, canScrollRight }
      ));
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      resizeObserver.disconnect();
    };
  }, [ref]);

  return edges;
}
