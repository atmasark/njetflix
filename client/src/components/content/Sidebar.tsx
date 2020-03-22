import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Genre } from '../types';

const Wrapper = styled.div`
  display: flex;
  flex: 1 1;
`;

const List = styled.ul`
  position: fixed;
  top: 50%;
  transform: translate(0,-50%);
  list-style: none;
  padding-left: 0;
`;

const bringForwards = keyframes`
  from {
    padding: 5px 0 5px 15px;
  }
  to {
    padding: 5px 0 5px 30px;
  }
`

const ListItem = styled.li.attrs((props: { isActive: boolean }) => ({
  isActive: props.isActive,
}))`
  background: ${(props) => props.isActive && 'linear-gradient(90deg, rgba(255,0,0,0.5) 0%, rgba(255,255,255,0) 100%)'};
  font-size: 20px;
  padding: 5px 0 5px 15px;
  animation: ${(p: { isActive: boolean }) =>
    p.isActive && bringForwards}
    ease-out 0.25s forwards;
`;

export default (props: { genres: Genre[]; activeGenre: string | null; handleClick: (genre: string) => void; }) => {
  const { genres, activeGenre, handleClick } = props;
  return (
    <Wrapper>
      <List>
        {genres.map((genre: Genre) =>
          <ListItem
            isActive={genre.name === activeGenre}
            onClick={() => handleClick(genre.name)}
            key={genre.name}>
            {genre.name}
          </ListItem>)}
      </List>
    </Wrapper>
  )
};

