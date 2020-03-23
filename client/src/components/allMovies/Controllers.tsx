import React from 'react';
import styled from 'styled-components';
import Filter from './controllers/Filter';
import SortBy from './controllers/SortBy';


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 25px;
`;

export default () => (
  <Wrapper>
    <Filter />
    <SortBy />
  </Wrapper>
);
