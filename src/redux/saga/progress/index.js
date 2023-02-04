import { put } from "redux-saga/effects";
import { FETCH_COMPLETED, FETCH_STARTED } from "../../constants/actionTypes";
export default function* progressSaga(callback, action) {
  yield put({ type: FETCH_STARTED });
  yield* callback(action);
  yield put({ type: FETCH_COMPLETED });
}
