import { put, call, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { isBefore, isAfter, parse } from 'date-fns';

import db from '../../util/db';

import {
  FETCH_FILTERED_ROWS_REQUESTED,
  FETCH_FILTERED_ROWS_SUCCESS,
  ROW_FILTER_UPDATED,
  IMPORT_COMPLETE,
  TOTAL_ROWS_COUNTED,
  COUNT_TOTAL_ROWS,
  COLUMNS_UPDATED,
  ADD_FILTER,
  REMOVE_FILTER,
  SET_FILTERS,
} from '../reducers/data';

function generateCollectionFromFilter(filters = []) {
  let collection = db[process.env.REACT_APP_DB_TABLE_NAME]
  filters.forEach(filter => {
    collection = collection.filter(row => {
      switch(filter.operator){
        case '=':
          return row[filter.field] === filter.value;
        case 'not':
          return row[filter.field] !== filter.value;
        case '>':
          return row[filter.field] > filter.value;
        case '<':
          return row[filter.field] < filter.value;
        case 'in':
          return filter.value.split(',').includes(row[filter.field]);
        case 'not in':
          return !filter.value.split(',').includes(row[filter.field]);
        case 'before':
          return isBefore(parse(row[filter.field]), parse(filter.value));
        case 'after':
          return isAfter(parse(row[filter.field]), parse(filter.value));
        default:
          return true;
      }
    })
  })
  return collection
}

function* fetchRows(){
  const filters = yield select(state => state.data.filters);

  const filteredRowCount = yield call(() => {
    return generateCollectionFromFilter(filters).toArray()
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

export function* watchColumnsUpdated(){
	yield takeLatest(COLUMNS_UPDATED, (action) => {
    localStorage.setItem(process.env.REACT_APP_COLUMN_NAMES_KEY, action.payload)
  });
}

export function* watchFiltersSet(){
	yield takeLatest(SET_FILTERS, function*() {
    yield put({
      type: FETCH_FILTERED_ROWS_REQUESTED
    })
  });
}

export function* watchFilterAdded(){
	yield takeEvery(ADD_FILTER, function* (action) {
    const currentFilters = yield select(state => state.data.filters);
    const filters = [...currentFilters, action.payload];
    localStorage.setItem(process.env.REACT_APP_FILTERS_KEY, JSON.stringify(filters));
    yield put({
      type: SET_FILTERS,
      payload: JSON.parse(localStorage.getItem(process.env.REACT_APP_FILTERS_KEY))
    })
  });
}

export function* watchFilterRemoved(){
	yield takeEvery(REMOVE_FILTER, function* (action) {
    const filters = yield select(state => state.data.filters);
    filters.splice(action.payload, 1);
    localStorage.setItem(process.env.REACT_APP_FILTERS_KEY, JSON.stringify(filters));
    yield put({
      type: SET_FILTERS,
      payload: JSON.parse(localStorage.getItem(process.env.REACT_APP_FILTERS_KEY))
    })
  });
}

