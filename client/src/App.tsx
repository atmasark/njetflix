import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { fetchMovieList } from './state/modules/movies';
import Header from './components/Header';
import Genres from './components/Genres';
import AllMovies from './components/AllMovies';

import './index.scss';

const App = ({ dispatch }: any) => {
  useEffect(() => {
    dispatch(fetchMovieList());
  }, []);
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/genres">
          <Genres />
        </Route>
        <Route path="/">
          <AllMovies />
        </Route>
      </Switch>
    </Router>
  );
};

export default connect()(App);
