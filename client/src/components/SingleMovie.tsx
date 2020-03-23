import React from 'react';
import { connect } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Overview from './singleMovie/Overview';
import { State } from './types';
import { fetchCurrentMovie } from '../state/modules/movies';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 50px 0px 0px 15px;
`;

const Poster = styled.div.attrs((props: { poster: string }) => ({
  poster: props.poster,
}))`
  min-height: 570px;
  min-width: 400px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.poster});
  `;

const SingleMovie = (props: {
  currentMovie?: any;
}) => {
  const { currentMovie } = props;
  const { id } = useParams();
  if (!currentMovie.isLoading && Object.keys(currentMovie.data).length === 0 && currentMovie.data.constructor === Object) {
    return <Redirect to="/" />;
  } if (!currentMovie.isLoading) {
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
