import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ListElement } from '../../../types';

const Wrapper = styled.div`
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
      {moviesInGenre.map((movie: ListElement) => <Movie key={movie.id} onClick={() => handleClick(movie.id)} poster={movie.poster} />)}
    </Wrapper>
  );
};

// @ts-ignore
export default withRouter(ScrollableList);
