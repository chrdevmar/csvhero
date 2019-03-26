import { 
  FILE_CHOSEN,
  ROW_PARSED,
  IMPORT_COMPLETE,
  UPDATE_FILTERED_ROWS_REQUESTED
} from '../reducers/data';

export function fileChosen(data) {
  return {
    type: FILE_CHOSEN,
    payload: data
  }
}

export function rowParsed(data) {
  return {
    type: ROW_PARSED,
    payload: data
  }
}

export function importComplete(data) {
  return {
    type: IMPORT_COMPLETE,
    payload: data
  }
}

export function updateFilteredRows(filter) {
  return {
    type: UPDATE_FILTERED_ROWS_REQUESTED,
    payload: filter
  }
}