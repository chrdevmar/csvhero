export const FILE_CHOSEN = 'FILE_CHOSEN';
export const IMPORT_COMPLETE = 'IMPORT_COMPLETE';
export const FETCH_FILTERED_ROWS_SUCCESS = 'FETCH_FILTERED_ROWS_SUCCESS';
export const FETCH_FILTERED_ROWS_REQUESTED = 'FETCH_FILTERED_ROWS_REQUESTED';
export const ROW_FILTER_UPDATED = 'ROW_FILTER_UPDATED';
export const TOTAL_ROWS_COUNTED = 'TOTAL_ROWS_COUNTED';
export const COUNT_TOTAL_ROWS = 'COUNT_TOTAL_ROWS';
export const FILTER_ADDED = 'FILTER_ADDED';
export const FILTER_REMOVED = 'FILTER_REMOVED';
export const COLUMNS_UPDATED = 'COLUMNS_UPDATED';

let columnsStr = localStorage.getItem(process.env.REACT_APP_COLUMN_NAMES_KEY);

const initialState = {
  rows: [],
  file: {
    name: localStorage.getItem(process.env.REACT_APP_FILE_NAME_KEY) || 'No File Imported'
  },
  importing: false,
  filters: [],
  totalRows: 0,
  columns: columnsStr ? columnsStr.split(',') : []
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
  case FILTER_ADDED: 
    return {
      ...state,
      filters: [...state.filters, action.payload] 
    }
  case FILTER_REMOVED:
    const filters = state.filter;
    filters.splice(action.payload, 1);
    return {
      ...state,
      filters
    }
  case COLUMNS_UPDATED:
    return {
      ...state,
      columns: action.payload
    }
	default:
		return state;
	}
};
