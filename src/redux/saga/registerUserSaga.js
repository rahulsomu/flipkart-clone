import { put, call, takeLatest } from "redux-saga/effects";
import {
  registerUserLoading,
  registerUserSuccess,
  registerUserFailed,
} from "../action/registerUserAction";
import { registerUserApi } from "../../api";
import progressSaga from "./progress";
import { isValidResult } from "../../helpers/index";
import { REGISTER_USER } from "../constants/actionTypes";

export function* registerUserSaga(action) {
  try {
    yield put(registerUserLoading());
    const result = yield call(registerUserApi, action.payload);
    if (isValidResult(result)) {
      yield put(registerUserSuccess(result.data));
      if (action.callback) {
        action.callback(result.data);
      }
    }
  } catch (error) {
    yield put(
      registerUserFailed({
        error: error,
      })
    );
  }
}

export default function* registerUserWatcher() {
  yield takeLatest(REGISTER_USER, progressSaga, registerUserSaga);
}
