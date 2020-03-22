import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SectionHeader from './section/SectionHeader';
import ScrollableList from './section/ScrollableList';
import { ListElement, Genre } from '../../types';

const Wrapper = styled.div`
  margin-bottom: 200px;
`;

export default (props: {
  genre: Genre;
  movies: ListElement[];
  activeGenre?: string | null;
  setActiveGenre?: (genre: string) => void;
  refs: any;
}) => {
  const {
    genre, movies, activeGenre, setActiveGenre, refs,
  } = props;
  const moviesInGenre = movies.filter((movie: ListElement) => movie.genre.includes(genre.name));

  const [pageHeight, setPageHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    setPageHeight(window.innerHeight);
    window.addEventListener('resize', (e) => {
      setTimeout(() => {
        setPageHeight(window.innerHeight);
      }, 300);
    });
  }, []);


  const observerMargin = Math.floor(pageHeight / 2);
  useEffect(() => {
    const options = {
      rootMargin: `-${
        window.innerHeight % 2 === 0 ? observerMargin - 1 : observerMargin
        }px 0px -${observerMargin}px 0px`,
    };
    const intersectionCallback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.target.id !== activeGenre && entry.isIntersecting) {
          // @ts-ignore
          setActiveGenre(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(intersectionCallback, options);
    observer.observe(refs[genre.name].current);
    return () => observer.disconnect();
  }, [activeGenre, pageHeight]);


  return (
    <Wrapper id={genre.name} ref={refs[genre.name]}>
      <SectionHeader
        genre={genre}
        amountOfMovies={movies.length}
      />
      <ScrollableList
        moviesInGenre={moviesInGenre}
      />
    </Wrapper>
  );
};
