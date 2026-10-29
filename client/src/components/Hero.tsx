import styled from 'styled-components';
import {
  Chip, Chips, PrimaryButton, RatedBadge, SecondaryButton,
} from '../styles/shared';
import type { MovieSummary } from '../types';
import Poster from './Poster';

const Wrapper = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 48px;
  min-height: min(78vh, 720px);
  padding: calc(var(--header-height) + 40px) var(--gutter) 64px;
  overflow: hidden;
  isolation: isolate;

  @media (max-width: 899px) {
    grid-template-columns: minmax(0, 1fr);
    min-height: auto;
  }
`;

const Backdrop = styled.div<{ $image: string }>`
  position: absolute;
  inset: -40px;
  z-index: -1;
  background: url(${(p) => p.$image}) center / cover no-repeat;
  filter: blur(36px) saturate(1.3);
  opacity: 0.5;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, var(--bg) 10%, transparent 70%),
      linear-gradient(0deg, var(--bg) 5%, transparent 50%);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 640px;
`;

const Eyebrow = styled.p`
  color: var(--accent);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: clamp(2.25rem, 5.5vw, 4rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--text-muted);
`;

const Rating = styled.span`
  color: var(--imdb);
  font-weight: 600;
`;

const Plot = styled.p`
  display: -webkit-box;
  overflow: hidden;
  color: #d4d4dc;
  font-size: 1.0625rem;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
`;

const HeroPoster = styled(Poster)`
  width: clamp(200px, 22vw, 300px);
  border-radius: 14px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
  transform: rotate(2deg);

  @media (max-width: 899px) {
    display: none;
  }
`;

export default function Hero({ movie }: { movie: MovieSummary }) {
  return (
    <Wrapper aria-labelledby="hero-title">
      <Backdrop $image={movie.poster} aria-hidden />
      <Content>
        <Eyebrow>Top rated on Njetflix</Eyebrow>
        <Title id="hero-title">{movie.title}</Title>
        <Meta>
          <span>{movie.year}</span>
          <RatedBadge>{movie.rated}</RatedBadge>
          <Rating>
            ★
            {' '}
            {movie.imdbRating}
          </Rating>
        </Meta>
        <Chips aria-label="Genres">
          {movie.genre.map((genre) => <Chip key={genre}>{genre}</Chip>)}
        </Chips>
        <Plot>{movie.plot}</Plot>
        <Actions>
          <PrimaryButton to={`/movie/${movie.id}`}>More info</PrimaryButton>
          <SecondaryButton to="/all">Browse all movies</SecondaryButton>
        </Actions>
      </Content>
      <HeroPoster src={movie.poster} title={movie.title} eager />
    </Wrapper>
  );
}
