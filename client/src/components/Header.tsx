import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const Wrapper = styled.div`
  position: sticky; 
  top: 0;
  background: linear-gradient(0deg, rgba(255,255,255,0.8) 0%, rgba(181,181,181,0.9) 100%);
  z-index: 2;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 15px;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Logo = styled.div`
  width: 200px;
  margin-right: 50px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${logo});
`;

const StyledLink = styled(Link)`
  align-self: center;
  text-decoration: none;
  margin: 18px 20px;
  color: #303030;
  font-size: 20px;
`;

export default () => (
  <Wrapper>
    <Container>
      <HeaderContent>
        <Logo />
        <StyledLink to="/all">All movies</StyledLink>
        <StyledLink to="/">By genre</StyledLink>
      </HeaderContent>
    </Container>
  </Wrapper>
);
