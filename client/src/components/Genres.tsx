import React, { createRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import List from './genres/List';
import Sidebar from './genres/Sidebar';
import { Genre, ListElement, State } from './types';
import { setActiveGenre } from '../state/modules/movies/thunks';
import { getAllGenres } from '../state/modules/movies/selectors';

const Wrapper = styled.div`
  display: flex;
`;

const Genres = (props: {
  movies: ListElement[];
  genres: Genre[];
  activeGenre: string | null;
  setActiveGenre: (genre: string) => void;
}) => {
  const {
    movies, genres, activeGenre, setActiveGenre,
  } = props;
  const refs = genres.reduce((refsObj, genre) => {
    // @ts-ignore
    refsObj[genre.name] = createRef();
    return refsObj;
  }, {});

  const handleClick = (genre: string) => {
    // @ts-ignore
    refs[genre].current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };
  return (
    <Wrapper>
      {movies && (
        <>
          <Sidebar
            genres={genres}
            activeGenre={activeGenre}
            handleClick={handleClick}
          />
          <List
            movies={movies}
            genres={genres}
            activeGenre={activeGenre}
            setActiveGenre={setActiveGenre}
            refs={refs}
          />
        </>
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state: State) => ({
  movies: state.movies.list.data,
  genres: getAllGenres(state),
  activeGenre: state.movies.activeGenre,
});

const mapDispatchToProps = (dispatch: any) => ({
  setActiveGenre(genre: string) {
    dispatch(setActiveGenre(genre));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
