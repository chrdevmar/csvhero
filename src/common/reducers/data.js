export const FILE_CHOSEN = 'FILE_CHOSEN';
export const ROW_PARSED = 'ROW_PARSED';
export const IMPORT_COMPLETE = 'IMPORT_COMPLETE';

const initialState = {
  rows: [],
  file: {
    name: 'No File Imported'
  },
  importing: false,
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
	default:
		return state;
	}
};
