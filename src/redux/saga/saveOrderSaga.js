import { put, call, takeLatest } from "redux-saga/effects";
import {
  saveOrderLoading,
  saveOrderSuccess,
  saveOrderFailed,
} from "../action/saveOrderAction";
import { saveOrderApi } from "../../api";
import progressSaga from "./progress";
import { isValidResult } from "../../helpers/index";
import { SAVE_ORDER } from "../constants/actionTypes";

export function* saveOrderSaga(action) {
  try {
    yield put(saveOrderLoading());
    const result = yield call(saveOrderApi, action.payload);
    if (isValidResult(result)) {
      yield put(saveOrderSuccess(result.data));
      if (action.callback) {
        action.callback(result.data);
      }
    }
  } catch (error) {
    yield put(saveOrderFailed(error));
  }
}

export default function* saveOrderWatcher() {
  yield takeLatest(SAVE_ORDER, progressSaga, saveOrderSaga);
}
