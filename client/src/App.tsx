import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchMovieList } from './state/modules/movies';
import Header from './components/Header';
import './index.scss';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`;

const App = ({ dispatch }: any) => {
  useEffect(() => {
    dispatch(fetchMovieList());
  }, []);
  return (
    <Layout>
      <Header />
    </Layout>
  );
};

export default connect()(App);
