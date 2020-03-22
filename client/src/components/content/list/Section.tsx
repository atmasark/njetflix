import React from 'react';
import styled from 'styled-components';
import SectionHeader from './section/SectionHeader'
import ScrollableList from './section/ScrollableList'
import { ListElement } from '../../types';

const Wrapper = styled.div`
  margin-bottom: 80px;
`;

export default (props: { genre: any; movies: ListElement[] }) => {
  const { genre, movies } = props;
  let moviesInGenre;
  if (genre === 'All') moviesInGenre = movies;
  else moviesInGenre = movies.filter((movie: ListElement) => movie.genre.includes(genre.name));
  return (
    <Wrapper>
      <SectionHeader genre={genre} amountOfMovies={movies.length} />
      <ScrollableList moviesInGenre={moviesInGenre} />
    </Wrapper >
  );
};
