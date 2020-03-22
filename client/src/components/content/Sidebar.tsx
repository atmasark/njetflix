import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Genre, ListElement } from '../types';
import { setActiveGenre } from '../../state/modules/movies/thunks';
import { getAllGenres } from '../../state/modules/movies/selectors';

const Wrapper = styled.div`
  display: flex;
  flex: 1 1;
`;

const List = styled.ul`
  position: fixed;
  top: 50%;
  transform: translate(0,-50%);
  list-style: none;
`;

const ListItem = styled.li.attrs((props: { isActive: boolean }) => ({
  isActive: props.isActive,
}))`
  background: ${(props) => props.isActive && 'linear-gradient(90deg, rgba(255,0,0,0.5) 0%, rgba(255,255,255,0) 100%)'};
  padding-left: ${(props) => props.isActive && '20px'};
`;

const Navigation = (props: { movies: ListElement[]; genres: Genre[]; activeGenre: string; setActiveGenre: any; }) => {
  const { movies, genres, activeGenre, setActiveGenre } = props;
  const handleOnClick = (genre: string) => {
    setActiveGenre(genre)
  }
  if (movies) {
    return (
      <Wrapper>
        <List>
          {genres.map((genre: Genre) =>
            <ListItem
              isActive={genre.name === activeGenre}
              onClick={() => handleOnClick(genre.name)}
              key={genre.name}>
              {genre.name}
            </ListItem>)}
        </List>
      </Wrapper>
    )
  } else return <></>
};


const mapStateToProps = (state: any) => ({
  movies: state.movies.list.data,
  genres: getAllGenres(state),
  activeGenre: state.movies.activeGenre,
})

const mapDispatchToProps = (dispatch: any) => ({
  setActiveGenre(genre: string) {
    dispatch(setActiveGenre(genre))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)