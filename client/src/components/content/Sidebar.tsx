import React from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components';
import Navigation from './sidebar/Navigation'
import { getAllGenres } from '../../state/modules/movies/selectors';
import { Genre, ListElement, State } from '../types';

const Wrapper = styled.div`
  display: flex;
  flex: 1 1;
`;

const Sidebar = (props: { movies: ListElement[]; genres: Genre[] }) => {
  const { movies, genres } = props;
  if (movies) {
    return (
      <Wrapper>
        <Navigation genres={genres} />
      </Wrapper>
    )
  } else return <></>
};

const mapStateToProps = (state: State) => ({
  movies: state.movies.list.data,
  genres: getAllGenres(state),
});

export default connect(mapStateToProps)(Sidebar);