import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ListElement } from '../../../types';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 20px 0px;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
`;

const MovieContainer = styled.div``;

const Movie = styled.div.attrs((props: { poster: string }) => ({
  poster: props.poster,
}))`
  flex: 0 0 auto;
  height: 450px;
  max-width: 300px;
  min-width: 300px;
  margin: 0px 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.poster});
  transition: transform .2s;
  ${MovieContainer}:hover & {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const ScrollableList = ({ history, ...props }:
  {
    history: any;
    moviesInGenre: ListElement[];
    fetchCurrentMovie: (id: number) => void;
  }) => {
  const { moviesInGenre, fetchCurrentMovie } = props;

  const handleClick = (id: number) => {
    fetchCurrentMovie(id);
    history.push(`/movie/${id}`);
  };
  return (
    <Wrapper>
      {moviesInGenre.map((movie: ListElement) => (
        <MovieContainer key={movie.id}>
          <Movie
            onClick={() => handleClick(movie.id)}
            poster={movie.poster}
          />
        </MovieContainer>
      ))}
    </Wrapper>
  );
};

// @ts-ignore
export default withRouter(ScrollableList);
