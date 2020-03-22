import React from 'react';
import styled from 'styled-components';
import { ListElement } from '../../types';

const Wrapper = styled.div`
  margin-bottom: 80px;
`;

const ListHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 25px;
`;

const Title = styled.p`
  font-size: 26px;
  margin: 0;
`;

const ShowAll = styled.p`
  padding-right: 15px;
  margin: 0;
`;

const ScrollableList = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
`;

const Movie = styled.div.attrs((props: { poster: string }) => ({
  poster: props.poster,
}))`
  flex: 0 0 auto;
  min-height: 300px;
  width: 200px;
  margin-right: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.poster});
`;


export default (props: { genre: any; movies: ListElement[] }) => {
  const { genre, movies } = props;
  let moviesInGenre;
  if (genre === 'All') moviesInGenre = movies;
  else moviesInGenre = movies.filter((movie: ListElement) => movie.genre.includes(genre.name));
  return (
    <Wrapper>
      <ListHeader>
        <Title>
          {genre.name || 'All movies'}
          {' '}
          (
          {genre.count || movies.length}
          )
        </Title>
        <ShowAll>Show all</ShowAll>
      </ListHeader>
      <ScrollableList>
        {moviesInGenre.map((movie: ListElement) => <Movie poster={movie.poster} />)}
      </ScrollableList>
    </Wrapper>
  );
};
