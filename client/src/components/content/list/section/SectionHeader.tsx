import React from 'react';
import styled from 'styled-components';
import { Genre } from '../../../types';

const Wrapper = styled.div`
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


export default (props: { genre: Genre; amountOfMovies: number }) => {
  const { genre, amountOfMovies } = props;
  return (
    <Wrapper>
      <Title>
        {genre.name || 'All movies'}
        {' '}
        (
          {genre.count || amountOfMovies}
        )
        </Title>
      <ShowAll>Show all</ShowAll>
    </Wrapper>
  );
};

