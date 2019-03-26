export const FILE_CHOSEN = 'FILE_CHOSEN';
export const ROW_PARSED = 'ROW_PARSED';
export const IMPORT_COMPLETE = 'IMPORT_COMPLETE';
export const UPDATE_FILTERED_ROWS_SUCCESS = 'UPDATE_FILTERED_ROWS_SUCCESS';
export const UPDATE_FILTERED_ROWS_REQUESTED = 'UPDATE_FILTERED_ROWS_REQUESTED';
export const ROW_FILTER_UPDATED = 'ROW_FILTER_UPDATED';


const initialState = {
  rows: [],
  file: {
    name: 'No File Imported'
  },
  importing: false,
  filter: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
  case FILE_CHOSEN:
    return {
      ...state,
      importing: true,
      rows: [],
      file: action.payload
    }
  case ROW_PARSED: 
    return {
      ...state,
      rows: [...state.rows, action.payload]
    }
  case IMPORT_COMPLETE: 
    return {
      ...state,
      importing: false
    }
  case UPDATE_FILTERED_ROWS_SUCCESS: 
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
