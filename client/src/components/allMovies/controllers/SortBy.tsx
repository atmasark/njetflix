import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setMoviesSortBy } from '../../../state/modules/movies/thunks';
import { State } from '../../types';

const Wrapper = styled.div`
  display: flex;
  @media only screen and (min-width: 800px) {
    justify-content: space-evenly;
  }
`;

const Title = styled.p`
  font-size: 16px;
`;

const OptionContainer = styled.div``;

const Option = styled.p.attrs((props: { id: string; sortBy: string; }) => ({
  id: props.id,
  sortBy: props.sortBy,
}))`
  font-size: 16px;
  &::before {
    content: '▼';
    margin: 0 10px;
    visibility: ${(p: { id: string; sortBy: string; }) => (p.id !== p.sortBy) && 'hidden'};
  }
  ${OptionContainer}:hover & {
    cursor: pointer;    
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
      <OptionContainer><Option id="AZ" sortBy={sortBy} onClick={() => handleClick('AZ')}>A-Z</Option></OptionContainer>
      <OptionContainer><Option id="IMDB_RATING" sortBy={sortBy} onClick={() => handleClick('IMDB_RATING')}>Rating</Option></OptionContainer>
      <OptionContainer><Option id="YEAR" sortBy={sortBy} onClick={() => handleClick('YEAR')}>Year</Option></OptionContainer>
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
