import React from 'react';
import styled from 'styled-components';
import Section from './list/Section';
import { Genre, ListElement } from '../types';

const Wrapper = styled.div`
  flex: 2.1 1;
  width: 75%;
  padding-top: 100px;
`;

export default (props: { movies: ListElement[]; genres: Genre[]; activeGenre: string | null; setActiveGenre: (genre: string) => void; refs: any; }) => {
  const { movies, genres, activeGenre, setActiveGenre, refs } = props;

  return (
    <Wrapper>
      {genres.map((genre: Genre) => <Section key={genre.name} genre={genre} movies={movies} activeGenre={activeGenre} setActiveGenre={setActiveGenre} refs={refs} />)}
    </Wrapper>
  )
};
