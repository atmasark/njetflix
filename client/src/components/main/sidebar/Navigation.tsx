import React from 'react';
import styled from 'styled-components';
import { Genre } from '../../types';

const List = styled.ul`
  top: 50%;
  transform: translate(0,-50%);
  list-style: none;
`;

const ListItem = styled.li``;

export default (props: { genres: Genre[] }) => {
  const { genres } = props;
  return (
    <List>
      {genres.map((genre: Genre) => <ListItem>{genre.name}</ListItem>)}
    </List>
  )
};
