import { put, call, takeLatest } from "redux-saga/effects";
import {
  addItemToCartLoading,
  addItemToCartSuccess,
  addItemToCartFailed,
} from "../action/addItemToCartAction";
import { addItemToCartApi } from "../../api";
import progressSaga from "./progress";
import { isValidResult } from "../../helpers/index";
import { ADD_ITEM_TO_CART } from "../constants/actionTypes";

export function* addItemToCartSaga(action) {
  try {
    yield put(addItemToCartLoading());
    const result = yield call(addItemToCartApi, action.payload);
    if (isValidResult(result)) {
      yield put(addItemToCartSuccess(result.data));
      if (action.callback) {
        action.callback(result.data);
      }
    }
  } catch (error) {
    yield put(
      addItemToCartFailed({
        error: error,
      })
    );
  }
}

export default function* addItemToCartWatcher() {
  yield takeLatest(ADD_ITEM_TO_CART, progressSaga, addItemToCartSaga);
}
