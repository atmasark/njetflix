import React from 'react';
import styled from 'styled-components';

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

const Movie = styled.div.attrs((props: any) => ({
  poster: props.poster,
}))`
  flex: 0 0 auto;
  min-height: 300px;
  width: 200px;
  margin-right: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.poster});
`;


export default (props: any) => {
  const { genre, movies } = props;
  const moviesInGenre = movies.filter((movie: any) => movie.genre.includes(genre.name));
  return (
    <Wrapper>
      <ListHeader>
        <Title>
          {genre.name}
          {' '}
          (
          {genre.count}
          )
        </Title>
        <ShowAll>Show all</ShowAll>
      </ListHeader>
      <ScrollableList>
        {moviesInGenre.map((movie: any) => <Movie poster={movie.poster} />)}
      </ScrollableList>
    </Wrapper>
  );
};
