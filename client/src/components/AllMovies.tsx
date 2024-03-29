import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Controllers from './allMovies/Controllers';
import { ListElement, State } from './types';
import { fetchCurrentMovie } from '../state/modules/movies/thunks';
import { getTitleFilteredMovies } from '../state/modules/movies/selectors';


const MovieList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media only screen and (max-width: 1280px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  grid-gap: 1em;
  padding: 100px 50px;
`;

const MovieContainer = styled.div``;

const Movie = styled.div.attrs((props: { poster: string; }) => ({
  poster: props.poster,
}))`
  height: 450px;
  max-width: 300px;
  margin: 0px auto;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.poster});
  transition: transform .2s;
  ${MovieContainer}:hover & {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const AllMovies = ({ history, ...props }:
  {
    history: any;
    movies: ListElement[];
    fetchCurrentMovie: (id: number) => void;
  }) => {
  const {
    movies,
    fetchCurrentMovie,
  } = props;

  const handleClick = (id: number) => {
    fetchCurrentMovie(id);
    history.push(`/movie/${id}`);
  };

  return (
    <>
      <Controllers />
      <MovieList>
        {movies.map((movie: ListElement) => (
          <MovieContainer key={movie.id}>
            <Movie
              onClick={() => handleClick(movie.id)}
              poster={movie.poster}
            />
          </MovieContainer>
        ))}
      </MovieList>
    </>
  );
};

const mapStateToProps = (state: State) => ({
  movies: getTitleFilteredMovies(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchCurrentMovie(id: number) {
    dispatch(fetchCurrentMovie(id));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllMovies));
