import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setMoviesSortBy } from '../../../state/modules/movies/thunks';
import { State } from '../../types';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Title = styled.p``;

const Option = styled.p.attrs((props: { id: string; sortBy: string; }) => ({
  id: props.id,
  sortBy: props.sortBy,
}))`
  &::before {
    content: '▼';
    margin: 0 10px;
    visibility: ${(p: { id: string; sortBy: string; }) => (p.id !== p.sortBy) && 'hidden'};
  }
`;

const SortBy = (props: { sortBy: string; setMoviesSortBy: (type: string) => void }) => {
  const { sortBy, setMoviesSortBy } = props;
  const handleClick = (type: string) => {
    setMoviesSortBy(type);
  };
  return (
    <Wrapper>
      <Title>Sort by: </Title>
      <Option id="AZ" sortBy={sortBy} onClick={() => handleClick('AZ')}>A-Z</Option>
      <Option id="IMDB_RATING" sortBy={sortBy} onClick={() => handleClick('IMDB_RATING')}>Rating</Option>
      <Option id="YEAR" sortBy={sortBy} onClick={() => handleClick('YEAR')}>Year</Option>
    </Wrapper>
  );
};

const mapStateToProps = (state: State) => ({
  sortBy: state.movies.list.sortBy,
});

const mapDispatchToProps = (dispatch: any) => ({
  setMoviesSortBy(type: string) {
    dispatch(setMoviesSortBy(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
