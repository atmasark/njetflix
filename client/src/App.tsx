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
import SingleMovie from './components/SingleMovie';

import './index.scss';

const App = ({ dispatch }: any) => {
  useEffect(() => {
    dispatch(fetchMovieList());
  }, []);
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/all">
          <AllMovies />
        </Route>
        <Route exact path="/movie/:id">
          <SingleMovie />
        </Route>
        <Route path="/">
          <Genres />
        </Route>
      </Switch>
    </Router>
  );
};

export default connect()(App);
