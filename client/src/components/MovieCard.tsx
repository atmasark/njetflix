import { Link } from 'react-router';
import styled from 'styled-components';
import type { MovieSummary } from '../types';
import Poster from './Poster';

const Card = styled(Link)`
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--surface);
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: 40px 12px 12px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.92));
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.25s ease, transform 0.25s ease;

  ${Card}:hover &,
  ${Card}:focus-visible & {
    opacity: 1;
    transform: none;
  }
`;

const Title = styled.p`
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.3;
`;

const Meta = styled.p`
  margin-top: 2px;
  color: var(--text-muted);
  font-size: 0.8125rem;
`;

const Star = styled.span`
  color: var(--imdb);
`;

export default function MovieCard({ movie }: { movie: MovieSummary }) {
  return (
    <Card to={`/movie/${movie.id}`} aria-label={`${movie.title} (${movie.year})`}>
      <Poster src={movie.poster} title={movie.title} />
      <Overlay aria-hidden>
        <Title>{movie.title}</Title>
        <Meta>
          {movie.year}
          {' · '}
          <Star>★</Star>
          {' '}
          {movie.imdbRating}
        </Meta>
      </Overlay>
    </Card>
  );
}
