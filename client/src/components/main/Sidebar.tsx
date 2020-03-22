import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
  display: flex;
  flex: 1 1;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  transform: translate(0,-50%);
`;

const List = styled.ul`
  list-style: none;
`;

const ListElement = styled.li``;

export default () => (
  <Wrapper>
    <Container>
      <List>
        <ListElement>genre</ListElement>
        <ListElement>genre</ListElement>
        <ListElement>genre</ListElement>
        <ListElement>genre</ListElement>
        <ListElement>genre</ListElement>
        <ListElement>genre</ListElement>
        <ListElement>genre</ListElement>
        <ListElement>genre</ListElement>
        <ListElement>genre</ListElement>
        <ListElement>genre</ListElement>
        <ListElement>genre</ListElement>
        <ListElement>genre</ListElement>
      </List>
    </Container>
  </Wrapper>
);
