import React from 'react';
import styled from 'styled-components';
import Details from './overview/Details';
import MainInfo from './overview/MainInfo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 30px;
  @media only screen and (max-width: 756px) {
    padding: 0px 10px;
  }
`;

const Plot = styled.p`
`;

export default (props: { currentMovie: any }) => {
  const { currentMovie } = props;
  return (
    <Wrapper>
      <MainInfo currentMovie={currentMovie} />
      <Details currentMovie={currentMovie} />
      <Plot>{currentMovie.data.plot}</Plot>
    </Wrapper>
  );
};
