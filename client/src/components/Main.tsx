import React from 'react';
import styled from 'styled-components';
import Content from './main/Content';
import Sidebar from './main/Sidebar';

const Wrapper = styled.div`
  display: flex;
`;

export default () => (
  <Wrapper>
    <Sidebar />
    <Content />
  </Wrapper>
);
