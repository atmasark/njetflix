import React from 'react';
import styled from 'styled-components';
import Section from './list/Section';
import { Genre, ListElement } from '../types';

const Wrapper = styled.div`
  flex: 2.1 1;
  width: 75%;
  padding: 100px 0 0 0;
  @media only screen and (min-width: 1600px) {
    padding: 250px 0 0 0;
  }
  &:last-child {
   margin-bottom: 200px;
  }
`;

export default (props: {
  movies: ListElement[];
  genres: Genre[];
  activeGenre: string | null;
  setActiveGenre: (genre: string) => void;
  fetchCurrentMovie: (id: number) => void;
  refs: any;
}) => {
  const {
    movies,
    genres,
    activeGenre,
    setActiveGenre,
    fetchCurrentMovie,
    refs,
  } = props;

  return (
    <Wrapper>
      {genres.map((genre: Genre) => (
        <Section
          key={genre.name}
          genre={genre}
          movies={movies}
          activeGenre={activeGenre}
          setActiveGenre={setActiveGenre}
          fetchCurrentMovie={fetchCurrentMovie}
          refs={refs}
        />
      ))}
    </Wrapper>
  );
};
