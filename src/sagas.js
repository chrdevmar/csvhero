import { all } from 'redux-saga/effects';

import * as commonSagas from './common/sagas';

export default function* rootSaga() {
	yield all ([
		...Object.values(commonSagas).map(saga => saga()),
	]);
}