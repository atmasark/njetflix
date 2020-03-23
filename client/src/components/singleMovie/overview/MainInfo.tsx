import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/imdb.png';

const SubtitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImdbContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0px;
`;

const GreyText = styled.p`
  color: grey;
`;


const Logo = styled.div.attrs((props: { logo: string }) => ({
  logo: props.logo,
}))`
  margin-right: 10px;
  min-height: 25px;
  min-width: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.logo});
`;


export default (props: { currentMovie: any }) => {
  const { currentMovie } = props;
  return (
    <>
      <Title>{currentMovie.data.title}</Title>
      <SubtitleRow>
        <GreyText>{currentMovie.data.year}</GreyText>
        <GreyText>
          Rated:
          {' '}
          {currentMovie.data.rated}
        </GreyText>
        <ImdbContainer>
          <Logo logo={logo} />
          <GreyText>{currentMovie.data.imdbRating}</GreyText>
        </ImdbContainer>
      </SubtitleRow>
    </>
  );
};
