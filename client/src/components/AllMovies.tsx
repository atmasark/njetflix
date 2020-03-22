import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ListElement, State } from './types';
import { fetchCurrentMovie } from '../state/modules/movies/thunks';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1em;
  padding: 100px 50px;
`;

const Movie = styled.div.attrs((props: { poster: string }) => ({
  poster: props.poster,
}))`
  min-height: 450px;
  min-width: 300px;
  margin: 0px 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.poster});
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
    // history.push('/');
  };

  return (
    <Wrapper>
      {movies.map((movie: ListElement) => (
        <Movie
          onClick={() => handleClick(movie.id)}
          key={movie.id}
          poster={movie.poster}
        />
      ))}
    </Wrapper>
  );
};

const mapStateToProps = (state: State) => ({
  movies: state.movies.list.data,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchCurrentMovie(id: number) {
    dispatch(fetchCurrentMovie(id));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllMovies));
