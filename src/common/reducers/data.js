export const DATA_IMPORTED = 'DATA_IMPORTED';

const initialState = {
	rows: []
};

export default (state = initialState, action) => {
	switch (action.type) {
  case DATA_IMPORTED:
    return {
      ...state,
      rows: action.payload
    }
	default:
		return state;
	}
};
