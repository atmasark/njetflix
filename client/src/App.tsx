import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMovieList } from './state/modules/movies';
import Header from './components/Header';

import './index.scss';

const App = ({ dispatch }: any) => {
  useEffect(() => {
    dispatch(fetchMovieList());
  }, []);
  return (
    <>
      <Header />
    </>
  );
};

export default connect()(App);
