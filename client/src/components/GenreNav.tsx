import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import type { Genre } from '../types';

const Nav = styled.nav`
  position: sticky;
  z-index: 10;

  /* Vertical sidebar on wide screens */
  @media (min-width: 900px) {
    top: calc(var(--header-height) + 24px);
    align-self: start;
    padding-left: var(--gutter);
  }

  /* Horizontal chip bar under the header on narrow screens */
  @media (max-width: 899px) {
    top: var(--header-height);
    padding: 10px var(--gutter);
    background: rgba(12, 12, 16, 0.9);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
  }
`;

const List = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 900px) {
    flex-direction: column;
    gap: 2px;
  }

  @media (max-width: 899px) {
    gap: 8px;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Item = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  border: 0;
  background: none;
  color: ${(p) => (p.$active ? 'var(--text)' : 'var(--text-muted)')};
  font-weight: ${(p) => (p.$active ? 600 : 400)};
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s, background 0.2s, box-shadow 0.2s, padding 0.25s ease;

  &:hover {
    color: var(--text);
  }

  @media (min-width: 900px) {
    padding: 6px 12px 6px ${(p) => (p.$active ? '20px' : '12px')};
    border-radius: 0 8px 8px 0;
    background: ${(p) => (p.$active
    ? 'linear-gradient(90deg, rgba(229, 9, 20, 0.35), transparent)'
    : 'none')};
    box-shadow: inset ${(p) => (p.$active ? '3px' : '0')} 0 0 var(--accent);
  }

  @media (max-width: 899px) {
    padding: 6px 14px;
    border: 1px solid ${(p) => (p.$active ? 'var(--accent)' : 'var(--border)')};
    border-radius: 999px;
    background: ${(p) => (p.$active ? 'rgba(229, 9, 20, 0.2)' : 'var(--surface)')};
    font-size: 0.875rem;
  }
`;

const Count = styled.span`
  color: var(--text-muted);
  font-size: 0.8125rem;
  font-weight: 400;

  @media (max-width: 899px) {
    display: none;
  }
`;

export default function GenreNav({ genres, active, onSelect }: {
  genres: Genre[];
  active: string | null;
  onSelect: (genre: string) => void;
}) {
  const listRef = useRef<HTMLUListElement>(null);

  // In the horizontal chip bar, keep the active genre centered in view
  useEffect(() => {
    const list = listRef.current;
    const button = list?.querySelector('[aria-current]');
    if (!list || !button || list.scrollWidth <= list.clientWidth) return;
    const listRect = list.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    list.scrollTo({
      left: list.scrollLeft + buttonRect.left - listRect.left - (listRect.width - buttonRect.width) / 2,
      behavior: 'smooth',
    });
  }, [active]);

  return (
    <Nav aria-label="Genres">
      <List ref={listRef}>
        {genres.map((genre) => (
          <li key={genre.name}>
            <Item
              type="button"
              $active={genre.name === active}
              aria-current={genre.name === active ? 'true' : undefined}
              onClick={() => onSelect(genre.name)}
            >
              {genre.name}
              <Count>{genre.count}</Count>
            </Item>
          </li>
        ))}
      </List>
    </Nav>
  );
}
