import { 
  FILE_CHOSEN,
  IMPORT_COMPLETE,
  FETCH_FILTERED_ROWS_REQUESTED,
  COUNT_TOTAL_ROWS,
  COLUMNS_UPDATED,
  ADD_FILTER,
  REMOVE_FILTER,
  ROW_UPDATED
} from '../reducers/data';

export function fileChosen(data) {
  return {
    type: FILE_CHOSEN,
    payload: data
  }
}

export function importComplete(data) {
  return {
    type: IMPORT_COMPLETE,
    payload: data
  }
}

export function fetchFilteredRows(filter) {
  return {
    type: FETCH_FILTERED_ROWS_REQUESTED,
    payload: filter
  }
}

export function countTotalRows() {
  return {
    type: COUNT_TOTAL_ROWS,
  }
}

export function columnsUpdated(columns) {
  return {
    type: COLUMNS_UPDATED,
    payload: columns
  }
}

export function addFilter(filter) {
  return {
    type: ADD_FILTER,
    payload: filter
  }
}

export function removeFilter(index) {
  return {
    type: REMOVE_FILTER,
    payload: index
  }
}

export function updateRow(newRowValue) {
  return {
    type: ROW_UPDATED,
    payload: newRowValue
  }
}