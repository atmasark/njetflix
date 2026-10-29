import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import imdbLogo from '../assets/imdb.png';
import Poster from '../components/Poster';
import StatusMessage from '../components/StatusMessage';
import { fetchMovie } from '../state/moviesSlice';
import { useAppDispatch, useAppSelector } from '../state/store';
import {
  Chip, Chips, PrimaryButton, RatedBadge, Skeleton,
} from '../styles/shared';

const Backdrop = styled.div<{ $image: string }>`
  position: absolute;
  inset: 0 0 auto 0;
  z-index: -1;
  height: 75vh;
  overflow: hidden;
  mask-image: linear-gradient(180deg, #000 30%, transparent);

  &::before {
    content: '';
    position: absolute;
    inset: -40px;
    background: url(${(p) => p.$image}) center 20% / cover no-repeat;
    filter: blur(40px) saturate(1.2);
    opacity: 0.45;
  }
`;

const Page = styled.article`
  position: relative;
  isolation: isolate;
  padding: calc(var(--header-height) + 24px) var(--gutter) 80px;
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 320px) minmax(0, 1fr);
  gap: clamp(24px, 5vw, 64px);
  max-width: 1120px;
  margin: 0 auto;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const BackButton = styled.button`
  grid-column: 1 / -1;
  justify-self: start;
  padding: 6px 0;
  border: 0;
  background: none;
  color: var(--text-muted);
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--text);
  }
`;

const PosterFrame = styled.div`
  overflow: hidden;
  border-radius: 14px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);

  @media (max-width: 720px) {
    width: min(240px, 70%);
    margin: 0 auto;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 12px;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 18px;
  color: var(--text-muted);
`;

const Imdb = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
  font-weight: 600;
`;

const OutOf = styled.span`
  color: var(--text-muted);
  font-weight: 400;
`;

const Plot = styled.p`
  max-width: 62ch;
  color: #d4d4dc;
  font-size: 1.0625rem;
`;

const Credits = styled.dl`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 10px 24px;
  margin: 0;
  padding-top: 20px;
  border-top: 1px solid var(--border);

  dt {
    color: var(--text-muted);
  }

  dd {
    margin: 0;
  }
`;

export default function MovieDetails() {
  const params = useParams();
  const id = Number(params.id);
  const isValidId = /^\d+$/.test(params.id ?? '');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const current = useAppSelector((state) => state.movies.current);
  // Show what the list already knows while the full details load
  const summary = useAppSelector((state) => state.movies.list.data.find((movie) => movie.id === id));

  useEffect(() => {
    if (!isValidId) return undefined;
    const request = dispatch(fetchMovie(id));
    return () => request.abort();
  }, [dispatch, id, isValidId]);

  const details = current.data?.id === id ? current.data : null;
  const movie = details ?? summary;

  if (!isValidId || (current.status === 'failed' && current.requestedId === id)) {
    return (
      <Page>
        <title>Movie not found · Njetflix</title>
        <StatusMessage
          emoji="🎞️"
          title="Njet found"
          action={<PrimaryButton to="/all">Browse all movies</PrimaryButton>}
        >
          {isValidId ? current.error : 'That is not a valid movie link.'}
        </StatusMessage>
      </Page>
    );
  }

  // Go back if the user came from inside the app, otherwise to the front page
  const goBack = () => (location.key === 'default' ? navigate('/') : navigate(-1));

  return (
    <Page aria-busy={!details}>
      {movie && <title>{`${movie.title} · Njetflix`}</title>}
      {movie && <Backdrop $image={movie.poster} aria-hidden />}
      <Inner>
        <BackButton type="button" onClick={goBack}>← Back</BackButton>
        <PosterFrame>
          {movie
            ? <Poster src={movie.poster} title={movie.title} eager />
            : <Skeleton $height="auto" $radius="0" style={{ aspectRatio: '2 / 3' }} />}
        </PosterFrame>
        <Info>
          {movie ? (
            <>
              <Title>{movie.title}</Title>
              <Meta>
                <span>{movie.year}</span>
                <RatedBadge>{movie.rated}</RatedBadge>
                <Imdb>
                  <img src={imdbLogo} alt="IMDb" width={44} height={21} />
                  {movie.imdbRating}
                  <OutOf>/ 10</OutOf>
                </Imdb>
              </Meta>
              <Chips aria-label="Genres">
                {movie.genre.map((genre) => <Chip key={genre}>{genre}</Chip>)}
              </Chips>
              <Plot>{movie.plot}</Plot>
            </>
          ) : (
            <>
              <Skeleton $width="70%" $height="56px" />
              <Skeleton $width="40%" $height="24px" />
              <Skeleton $height="96px" />
            </>
          )}
          <Credits>
            <dt>{details && details.director.length > 1 ? 'Directors' : 'Director'}</dt>
            <dd>{details ? details.director.join(', ') : <Skeleton $width="50%" />}</dd>
            <dt>Starring</dt>
            <dd>{details ? details.actors.join(', ') : <Skeleton $width="80%" />}</dd>
          </Credits>
        </Info>
      </Inner>
    </Page>
  );
}
