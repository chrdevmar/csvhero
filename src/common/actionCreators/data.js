import { 
  FILE_CHOSEN,
  ROW_PARSED,
  IMPORT_COMPLETE
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