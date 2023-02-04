import { put, call, takeLatest } from "redux-saga/effects";
import {
  getUserDetailsLoading,
  getUserDetailsSuccess,
  getUserDetailsFailed,
} from "../action/getUserDetailsAction";
import { getUserDetailsApi } from "../../api";
import progressSaga from "./progress";
import { isValidResult } from "../../helpers/index";
import { USER_DETAILS } from "../constants/actionTypes";

export function* getUserDetailsSaga(action) {
  try {
    yield put(getUserDetailsLoading());
    const result = yield call(getUserDetailsApi, action.payload);
    if (isValidResult(result)) {
      yield put(getUserDetailsSuccess(result.data));
      if (action.callback) {
        action.callback(result.data);
      }
    }
  } catch (error) {
    yield put(getUserDetailsFailed(error));
  }
}

export default function* userDetailsWatcher() {
  yield takeLatest(USER_DETAILS, progressSaga, getUserDetailsSaga);
}
