import { put, call, takeEvery, takeLatest, select } from 'redux-saga/effects';

import db from '../../util/db';

import {
  FETCH_FILTERED_ROWS_REQUESTED,
  FETCH_FILTERED_ROWS_SUCCESS,
  ROW_FILTER_UPDATED,
  IMPORT_COMPLETE,
  TOTAL_ROWS_COUNTED,
  COUNT_TOTAL_ROWS
} from '../reducers/data';

function generateCollectionFromFilter(filter = {}) {
  let collection = db[process.env.REACT_APP_DB_TABLE_NAME]
  return collection
}

function* fetchRows(){
  const filter = yield select(state => state.data.filter);

  const filteredRowCount = yield call(() => {
    return generateCollectionFromFilter(filter).toArray()
  });

  yield put({
    type: FETCH_FILTERED_ROWS_SUCCESS,
    payload: filteredRowCount,
  });
}

function* countTotalRows(){
  const totalRowCount = yield call(() => {
    return db[process.env.REACT_APP_DB_TABLE_NAME].count()
  });

  yield put({
    type: TOTAL_ROWS_COUNTED,
    payload: totalRowCount,
  });
}

export function* watchFetchFilteredRowsRequested(){
	yield takeEvery(FETCH_FILTERED_ROWS_REQUESTED, fetchRows);
}

export function* watchRowFilterUpdated(){
	yield takeEvery(ROW_FILTER_UPDATED, fetchRows);
}

export function* watchImportComplete(){
	yield takeEvery(IMPORT_COMPLETE, fetchRows);
}

export function* watchCountTotalRows(){
	yield takeLatest(COUNT_TOTAL_ROWS, countTotalRows);
}