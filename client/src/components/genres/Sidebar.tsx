import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Genre } from '../types';

const Wrapper = styled.div`
  display: flex;
  flex: 1 1;
  @media only screen and (max-width: 550px) {
    display: none;
  }
`;

const List = styled.ul`
  position: fixed;
  top: 50%;
  transform: translate(0,-50%);
  list-style: none;
  padding-left: 0;
`;

const ListItemContainer = styled.div`
`;

const bringForwards = keyframes`
 0% {
    padding: 5px 0 5px 15px;
  }
  25% {
    padding: 5px 0 5px 18.75px;
  }
  100% {
    padding: 12px 0 12px 30px;
  }
`;

const ListItem = styled.li.attrs((props: { isActive: boolean }) => ({
  isActive: props.isActive,
}))`
  background: ${(props) => props.isActive && 'linear-gradient(90deg, rgba(255,0,0,0.5) 0%, rgba(255,255,255,0) 100%)'};
  font-size: 20px;
  padding: 5px 0 5px 15px;
  animation: ${(p: { isActive: boolean }) => p.isActive && bringForwards}
    ease-out 0.75s forwards;
  ${ListItemContainer}:hover & {
    cursor: pointer;    
  }
`;

export default (props: {
  genres: Genre[];
  activeGenre: string | null;
  handleClick: (genre: string) => void;
}) => {
  const { genres, activeGenre, handleClick } = props;
  return (
    <Wrapper>
      <List>
        {genres.map((genre: Genre) => (
          <ListItemContainer key={genre.name}>
            <ListItem
              isActive={genre.name === activeGenre}
              onClick={() => handleClick(genre.name)}
            >
              {genre.name}
            </ListItem>
          </ListItemContainer>
        ))}
      </List>
    </Wrapper>
  );
};
