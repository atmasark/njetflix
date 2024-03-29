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
  margin: 0 0 0 10px;
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
    </Wrapper>
  );
};
