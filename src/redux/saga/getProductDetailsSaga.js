import { put, call, takeLatest } from "redux-saga/effects";
import {
  getProductDetailsLoading,
  getProductDetailsSuccess,
  getProductDetailsFailed,
} from "../action/getProductDetailsAction";
import { getProductDetailsApi } from "../../api";
import progressSaga from "./progress";
import { isValidResult } from "../../helpers/index";
import { GET_PRODUCT_DETAILS } from "../constants/actionTypes";

export function* getProductDetailsSaga(action) {
  try {
    yield put(getProductDetailsLoading());
    const result = yield call(getProductDetailsApi, action.payload);
    if (isValidResult(result)) {
      yield put(getProductDetailsSuccess(result.data));
      if (action.callback) {
        action.callback(result.data);
      }
    }
  } catch (error) {
    yield put(getProductDetailsFailed(error));
  }
}

export default function* getProductDetailsWatcher() {
  yield takeLatest(GET_PRODUCT_DETAILS, progressSaga, getProductDetailsSaga);
}
