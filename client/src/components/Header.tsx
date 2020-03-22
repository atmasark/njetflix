import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const Wrapper = styled.div`
  position: sticky; 
  top: 0;
  background: linear-gradient(0deg, rgba(255,255,255,0.8) 0%, rgba(181,181,181,0.9) 100%);
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

const Text = styled.p`
  align-self: center;
`;

export default () => (
  <Wrapper>
    <Container>
      <HeaderContent>
        <Logo />
        <Text>Placeholder</Text>
      </HeaderContent>
    </Container>
  </Wrapper>
);
