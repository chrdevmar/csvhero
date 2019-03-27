import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const initialState = {};

const sagaMiddleware = createSagaMiddleware();

const middleware = [ sagaMiddleware ];

if(process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

export default createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
  )
);

sagaMiddleware.run(rootSaga);