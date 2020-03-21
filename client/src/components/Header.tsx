import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 100px;
  padding: 0 15px;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(79,79,79,0.1) 100%);
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

const Text = styled.p`
  align-self: center;
`;

export default () => (
  <Wrapper>
    <HeaderContent>
      <Logo />
      <Text>Placeholder</Text>
    </HeaderContent>
  </Wrapper>
);
