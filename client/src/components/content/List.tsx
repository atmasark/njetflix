import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getAllGenres } from '../../state/modules/movies/selectors';
import Section from './list/Section';
import { Genre, ListElement, State } from '../types';

const Wrapper = styled.div`
  flex: 2.1 1;
  width: 75%;
  padding-top: 100px;
`;

const Content = (props: { movies: ListElement[]; genres: Genre[] }) => {
  const { movies, genres } = props;
  if (movies) {
    return (
      <Wrapper>
        <Section genre="All" movies={movies} />
        {genres.map((genre: Genre) => <Section key={genre.name} genre={genre} movies={movies} />)}
      </Wrapper>
    );
  } else return <></>
};

const mapStateToProps = (state: State) => ({
  movies: state.movies.list.data,
  genres: getAllGenres(state),
});

export default connect(mapStateToProps)(Content);
