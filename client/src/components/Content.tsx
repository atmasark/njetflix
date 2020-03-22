import React from 'react';
import styled from 'styled-components';
import List from './content/List';
import Sidebar from './content/Sidebar';

const Wrapper = styled.div`
  display: flex;
`;

export default () => (
  <Wrapper>
    <Sidebar />
    <List />
  </Wrapper>
);
