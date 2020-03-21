import {
  createStore, applyMiddleware, combineReducers, compose,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import * as reducers from './modules';

export default () => {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const combinedReducer = combineReducers({
    ...reducers,
  });

  const composedMiddleware = typeof window !== 'undefined'
    ? composeWithDevTools(middlewareEnhancer) : compose(
      middlewareEnhancer,
    );

  const store = createStore(combinedReducer, composedMiddleware);

  return store;
};
