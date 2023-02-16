import { put, call, takeLatest } from "redux-saga/effects";
import {
  saveAddressLoading,
  saveAddressSuccess,
  saveAddressFailed,
} from "../action/saveAddressAction";
import { saveAddressApi } from "../../api";
import progressSaga from "./progress";
import { isValidResult } from "../../helpers/index";
import { SAVE_ADDRESS } from "../constants/actionTypes";

export function* saveAddressSaga(action) {
  try {
    yield put(saveAddressLoading());
    const result = yield call(saveAddressApi, action.payload);
    if (isValidResult(result)) {
      yield put(saveAddressSuccess(result.data));
      if (action.callback) {
        action.callback(result.data);
      }
    }
  } catch (error) {
    yield put(saveAddressFailed(error));
  }
}

export default function* saveAddressWatcher() {
  yield takeLatest(SAVE_ADDRESS, progressSaga, saveAddressSaga);
}
