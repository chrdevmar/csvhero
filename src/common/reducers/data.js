export const FILE_CHOSEN = 'FILE_CHOSEN';
export const IMPORT_COMPLETE = 'IMPORT_COMPLETE';
export const FETCH_FILTERED_ROWS_SUCCESS = 'FETCH_FILTERED_ROWS_SUCCESS';
export const FETCH_FILTERED_ROWS_REQUESTED = 'FETCH_FILTERED_ROWS_REQUESTED';
export const ROW_FILTER_UPDATED = 'ROW_FILTER_UPDATED';
export const TOTAL_ROWS_COUNTED = 'TOTAL_ROWS_COUNTED';
export const COUNT_TOTAL_ROWS = 'COUNT_TOTAL_ROWS';

const initialState = {
  rows: [],
  file: {
    name: localStorage.getItem(process.env.REACT_APP_FILE_NAME_KEY) || 'No File Imported'
  },
  importing: false,
  filter: {},
  totalRows: 0
};

export default (state = initialState, action) => {
	switch (action.type) {
  case FILE_CHOSEN:
    return {
      ...state,
      importing: true,
      rows: [],
      file: action.payload,
      totalRows: 0
    }
  case TOTAL_ROWS_COUNTED: 
    return {
      ...state,
      totalRows: action.payload
    }
  case IMPORT_COMPLETE: 
    return {
      ...state,
      importing: false,
      totalRows: action.payload
    }
  case FETCH_FILTERED_ROWS_SUCCESS: 
    return {
      ...state,
      rows: action.payload
    }
  case ROW_FILTER_UPDATED: 
    return {
      ...state,
      filter: action.payload
    }
	default:
		return state;
	}
};
