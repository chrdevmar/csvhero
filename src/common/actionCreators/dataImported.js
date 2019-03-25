import { DATA_IMPORTED } from '../reducers/data';

export function dataImported(data) {
  return {
    type: DATA_IMPORTED,
    payload: data
  }
}