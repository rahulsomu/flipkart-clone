import { put, call, takeLatest } from "redux-saga/effects";
import {
  addToWishlistLoading,
  addToWishlistSuccess,
  addToWishlistFailed,
} from "../action/wishlistAction";
import { addToWishlistApi } from "../../api";
import progressSaga from "./progress";
import { isValidResult } from "../../helpers/index";
import { ADD_TO_WISHLIST } from "../constants/actionTypes";

export function* addToWishlistSaga(action) {
  try {
    yield put(addToWishlistLoading());
    const result = yield call(addToWishlistApi, action.payload);
    if (isValidResult(result)) {
      yield put(addToWishlistSuccess(result.data));
      if (action.callback) {
        action.callback(result.data);
      }
    }
  } catch (error) {
    yield put(addToWishlistFailed(error));
  }
}

export default function* addToWishlistWatcher() {
  yield takeLatest(ADD_TO_WISHLIST, progressSaga, addToWishlistSaga);
}
