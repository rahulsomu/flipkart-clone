import { put, call, takeLatest } from "redux-saga/effects";
import { loginLoading, loginSuccess, loginFailed } from "../action/loginAction";
import { loginApi } from "../../api";
import progressSaga from "./progress";
import { isValidResult } from "../../helpers/index";
import { LOGIN } from "../constants/actionTypes";

export function* loginSaga(action) {
  try {
    yield put(loginLoading());
    const result = yield call(loginApi, action.payload);
    if (isValidResult(result)) {
      yield put(loginSuccess(result.data));
      if (action.callback) {
        action.callback(result.data);
      }
    }
  } catch (error) {
    yield put(
      loginFailed({
        error: error,
      })
    );
  }
}

export default function* loginWatcher() {
  yield takeLatest(LOGIN, progressSaga, loginSaga);
}
