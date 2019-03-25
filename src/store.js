import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import rootReducer from './reducers';

const initialState = {};

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    logger
  ),
);