import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMovieList } from './state/modules/movies';
import Header from './components/Header';
import Content from './components/Content';

import './index.scss';

const App = ({ dispatch }: any) => {
  useEffect(() => {
    dispatch(fetchMovieList());
  }, []);
  return (
    <>
      <Header />
      <Content />
    </>
  );
};

export default connect()(App);
