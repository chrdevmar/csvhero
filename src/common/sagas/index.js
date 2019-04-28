import { put, call, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { isBefore, isAfter, parse } from 'date-fns';

import db from '../../util/db';

import {
  FETCH_FILTERED_ROWS_REQUESTED,
  FETCH_FILTERED_ROWS_SUCCESS,
  ROW_FILTER_UPDATED,
  IMPORT_COMPLETE,
  COUNT_TOTAL_ROWS,
  TOTAL_ROWS_COUNTED,
  COUNT_FILTERED_ROWS,
  FILTERED_ROWS_COUNTED,
  COLUMNS_UPDATED,
  ADD_FILTER,
  REMOVE_FILTER,
  SET_FILTERS,
  APPLY_BULK_EDIT,
  BULK_EDIT_START,
  BULK_EDIT_COMPLETE,
  ROW_UPDATED,
  SET_ROWS,
} from '../reducers/data';

function generateCollectionFromFilter(filters = []) {
  let collection = db[process.env.REACT_APP_DB_TABLE_NAME]
  if(filters.length) {
    filters.forEach(filter => {
      const queryTerms = String(filter.value).split(',').map(term => term.trim());
      const queryDate = parse(filter.value)
      collection = collection.filter(row => {
        switch(filter.operator){
          case '=':
            return `${row[filter.field]}` === `${filter.value}`;
          case 'not':
            return `${row[filter.field]}` !== `${filter.value}`;
          case 'is empty':
            return row[filter.field] == null;
          case '>':
            return row[filter.field] > filter.value;
          case '<':
            return row[filter.field] < filter.value;
          case 'one of':
            return queryTerms.includes(`${row[filter.field]}`);
          case 'not one of':
            return !queryTerms.includes(`${row[filter.field]}`);
          case 'contains':
            return `${row[filter.field]}`.includes(`${filter.value}`);
          case 'before':
            return isBefore(parse(row[filter.field]), queryDate);
          case 'after':
            return isAfter(parse(row[filter.field]), queryDate);
          default:
            return true;
        }
      })
    })
    return collection
  } else {
    return collection.toCollection()
  }
}

function applyEditToRow({ value, valueType, field, operation }) {
  return (row) => {
    let _value = value;
    if(valueType === 'dynamic') {
      _value = row[value];
    }
    if(!isNaN(_value)){
      _value = Number(_value);
    }
    switch(operation){
      case 'set':
        row[field] = _value;
        break;
      case 'clear':
        row[field] = undefined;
        break;
      case '+':
      case 'concat':
        row[field] += _value;
        break;
      case '-':
        row[field] -= _value;
        break;
      case '*':
        row[field] = row[field] * _value;
        break;
      case '/':
        row[field] = row[field] / _value;
        break;
      default:
        break;
    }
    return row;
  }
}

function* updateRow(action){
  const { fromRow, updated } = action.payload;
  // make sure updated row types are retained
  Object.keys(updated).forEach(key => {
    if(updated[key] && !isNaN(updated[key])) {
      updated[key] = Number(updated[key])
    }
  })
  const rows = yield select(state => state.data.rows);
  const row = rows[fromRow];
  
  rows.splice(fromRow, 1, {...row, ...updated});

  yield put({
    type: SET_ROWS,
    payload: [...rows],
  });

  db[process.env.REACT_APP_DB_TABLE_NAME].update(row.id, updated)
}

function* countFilteredRows() {
  const filters = yield select(state => state.data.filters);

  const filteredRowCount = yield call(() => {
    return generateCollectionFromFilter(filters).count()
  });

  yield put({
    type: FILTERED_ROWS_COUNTED,
    payload: filteredRowCount,
  });
}

function* fetchRows({ offset = 0, limit = 60}){
  const filters = yield select(state => state.data.filters);

  const filteredRows = yield call(() => {
    return generateCollectionFromFilter(filters).offset(offset).limit(limit).toArray()
  });

  yield put({
    type: FETCH_FILTERED_ROWS_SUCCESS,
    payload: filteredRows,
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

function* applyBulkEdit(action){
  const filters = yield select(state => state.data.filters);
  const edit = action.payload;

  yield put({
    type: BULK_EDIT_START,
  });

  yield call(() => {
    return generateCollectionFromFilter(filters).modify(applyEditToRow(edit))
  })

  yield put({
    type: BULK_EDIT_COMPLETE,
  });

  yield put({
    type: FETCH_FILTERED_ROWS_REQUESTED,
  });
}

export function* watchFetchFilteredRowsRequested(){
	yield takeLatest(FETCH_FILTERED_ROWS_REQUESTED, fetchRows);
}

export function* watchRowUpdate(){
	yield takeLatest(ROW_UPDATED, updateRow);
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

export function* watchApplyBulkEdit(){
	yield takeLatest(APPLY_BULK_EDIT, applyBulkEdit);
}

export function* watchCountFilteredRows(){
	yield takeLatest(COUNT_FILTERED_ROWS, countFilteredRows);
}

export function* watchFiltersSet(){
	yield takeLatest(SET_FILTERS, function*() {
    yield put({
      type: FETCH_FILTERED_ROWS_REQUESTED
    })

    yield countFilteredRows()
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

