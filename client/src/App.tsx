import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMovieList } from './state/modules/movies';
import './index.css';

const App = ({ dispatch }: any) => {
  useEffect(() => {
    dispatch(fetchMovieList());
  }, []);
  return (
    <p> Hello world</p>
  );
};

export default connect()(App);
