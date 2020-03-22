import React from 'react';
import styled from 'styled-components';
import List from './content/List';

const Wrapper = styled.div`
  flex: 2.1 1;
  width: 75%;
  padding-top: 100px;
`;

export default () => (
  <Wrapper>
    <List />
    <List />
    <List />
    <List />
    <List />
    <List />
  </Wrapper>
);
