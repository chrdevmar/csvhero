import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const initialState = {};

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(
      sagaMiddleware,
      logger
    ),
  )
);

sagaMiddleware.run(rootSaga);