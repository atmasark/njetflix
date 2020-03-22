import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getAllGenres } from '../../state/modules/movies/selectors';
import List from './content/List';

const Wrapper = styled.div`
  flex: 2.1 1;
  width: 75%;
  padding-top: 100px;
`;

const Content = (props: any) => {
  const { movies, genres } = props;
  return (
    <Wrapper>
      {movies
        && genres.map((genre: any) => <List genre={genre} movies={movies} />)}

    </Wrapper>
  );
};

const mapStateToProps = (state: any) => ({
  movies: state.movies.list.data,
  genres: getAllGenres(state),
});

export default connect(mapStateToProps)(Content);
