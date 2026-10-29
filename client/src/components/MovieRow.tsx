import { useId, useRef, type Ref } from 'react';
import styled from 'styled-components';
import useScrollEdges from '../hooks/useScrollEdges';
import type { MovieSummary } from '../types';
import MovieCard from './MovieCard';

const Section = styled.section`
  scroll-margin-top: var(--sticky-offset);
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--gutter);
`;

const Title = styled.h2`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 600;
`;

const Count = styled.span`
  margin-left: 10px;
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 400;
`;

const Arrows = styled.div`
  display: flex;
  gap: 8px;

  @media (hover: none) {
    display: none;
  }
`;

const Arrow = styled.button`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--surface);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;

  &:hover:not(:disabled) {
    background: var(--surface-raised);
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

const Track = styled.ul`
  display: grid;
  grid-auto-columns: clamp(140px, 15vw, 210px);
  grid-auto-flow: column;
  gap: 14px;
  margin: 0;
  padding: 16px var(--gutter) 28px;
  overflow-x: auto;
  list-style: none;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--gutter);
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & > li {
    scroll-snap-align: start;
  }
`;

export default function MovieRow({
  title, movies, sectionKey, ref,
}: {
  title: string;
  movies: MovieSummary[];
  sectionKey?: string;
  ref?: Ref<HTMLElement>;
}) {
  const headingId = useId();
  const trackRef = useRef<HTMLUListElement>(null);
  const { canScrollLeft, canScrollRight } = useScrollEdges(trackRef);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    track?.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <Section ref={ref} data-section={sectionKey} aria-labelledby={headingId}>
      <Heading>
        <Title id={headingId}>
          {title}
          <Count>{movies.length}</Count>
        </Title>
        {(canScrollLeft || canScrollRight) && (
          <Arrows>
            <Arrow type="button" aria-label={`Scroll ${title} left`} disabled={!canScrollLeft} onClick={() => scroll(-1)}>‹</Arrow>
            <Arrow type="button" aria-label={`Scroll ${title} right`} disabled={!canScrollRight} onClick={() => scroll(1)}>›</Arrow>
          </Arrows>
        )}
      </Heading>
      <Track ref={trackRef}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </Track>
    </Section>
  );
}
