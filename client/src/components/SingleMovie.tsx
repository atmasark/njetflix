import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Overview from './singleMovie/Overview';
import { State } from './types';
import { fetchCurrentMovie } from '../state/modules/movies';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 50px 0px 0px 15px;
  @media only screen and (max-width: 756px) {
    flex-direction: column
  }
`;

const Poster = styled.div.attrs((props: { poster: string }) => ({
  poster: props.poster,
}))`
  min-height: 570px;
  min-width: 400px;
  @media only screen and (max-width: 756px) {
    min-height: unset;
    min-width: unset;
    height: 358px;
    width: 250px;
    margin: 0px auto 30px auto;
  }
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.poster});
  `;

const SingleMovie = (props: {
  currentMovie?: any;
}) => {
  const { currentMovie } = props;
  if (!currentMovie.isLoading) {
    return (
      <Wrapper>
        <Poster poster={currentMovie.data.poster} />
        <Overview currentMovie={currentMovie} />
      </Wrapper>
    );
  } return <></>;
};


const mapStateToProps = (state: State) => ({
  currentMovie: state.movies.current,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchCurrentMovie(id: number) {
    dispatch(fetchCurrentMovie(id));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
