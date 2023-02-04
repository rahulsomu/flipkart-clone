import { put, call, takeLatest } from "redux-saga/effects";
import {
  getAllProductsLoading,
  getAllProductsSuccess,
  getAllProductsFailed,
} from "../action/getAllProductsAction";
import { getAllProductsApi } from "../../api";
import progressSaga from "./progress";
import { isValidResult } from "../../helpers/index";
import { GET_ALL_PRODUCTS } from "../constants/actionTypes";

export function* getAllProductsSaga(action) {
  try {
    yield put(getAllProductsLoading());
    const result = yield call(getAllProductsApi, action.payload);
    if (isValidResult(result)) {
      yield put(getAllProductsSuccess(result.data));
      if (action.callback) {
        action.callback(result.data);
      }
    }
  } catch (error) {
    yield put(getAllProductsFailed(error));
  }
}

export default function* getAllProductsWatcher() {
  yield takeLatest(GET_ALL_PRODUCTS, progressSaga, getAllProductsSaga);
}
