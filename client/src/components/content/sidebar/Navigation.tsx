import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Genre } from '../../types';
import { setActiveGenre } from '../../../state/modules/movies/thunks';

const List = styled.ul`
  position: fixed;
  top: 50%;
  transform: translate(0,-50%);
  list-style: none;
`;

const ListItem = styled.li``;

const Navigation = (props: { genres: Genre[]; setActiveGenre: any; }) => {
  const { genres, setActiveGenre } = props;
  const handleOnClick = (genre: string) => {
    setActiveGenre(genre)
  }
  return (
    <List>
      {genres.map((genre: Genre) => <ListItem onClick={() => handleOnClick(genre.name)} key={genre.name}>{genre.name}</ListItem>)}
    </List>
  )
};


const mapStateToProps = (state: any) => ({
  activeGenre: state.movies.activeGenre
})

const mapDispatchToProps = (dispatch: any) => ({
  setActiveGenre(genre: string) {
    dispatch(setActiveGenre(genre))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)