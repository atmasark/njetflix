import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from './state/modules/movies';
import './index.css';

const App = ({ dispatch }: any) => {
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  return (
    <p> Hello world</p>
  );
};

export default connect()(App);
