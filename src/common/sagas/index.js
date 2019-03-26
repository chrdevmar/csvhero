import { put, call, takeEvery, takeLatest, select } from 'redux-saga/effects';

import db from '../../util/db';

import {
  UPDATE_FILTERED_ROWS_REQUESTED,
  UPDATE_FILTERED_ROWS_SUCCESS,
  ROW_FILTER_UPDATED,
} from '../reducers/data';

function generateCollectionFromFilter(filter = {}) {
  let collection = db[process.env.REACT_APP_DB_TABLE_NAME]
  return collection
}

function* updateFilteredRows(action){
  yield put({
    type: ROW_FILTER_UPDATED,
    payload: action.payload
  });

  const filteredRowCount = yield call(() => {
    return generateCollectionFromFilter(action.payload).toArray()
  });

  yield put({
    type: UPDATE_FILTERED_ROWS_SUCCESS,
    payload: filteredRowCount,
  });
}

export function* watchUpdateFilteredRowsRequested(){
	yield takeEvery(UPDATE_FILTERED_ROWS_REQUESTED, updateFilteredRows);
}