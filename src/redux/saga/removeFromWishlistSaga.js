import { put, call, takeLatest } from "redux-saga/effects";
import {
  removeFromWishlistLoading,
  removeFromWishlistSuccess,
  removeFromWishlistFailed,
} from "../action/wishlistAction";
import { removeFromWishlistApi } from "../../api";
import progressSaga from "./progress";
import { isValidResult } from "../../helpers/index";
import { REMOVE_FROM_WISHLIST } from "../constants/actionTypes";

export function* removeFromWishlistSaga(action) {
  try {
    yield put(removeFromWishlistLoading());
    const result = yield call(removeFromWishlistApi, action.payload);
    if (isValidResult(result)) {
      yield put(removeFromWishlistSuccess(result.data));
      if (action.callback) {
        action.callback(result.data);
      }
    }
  } catch (error) {
    yield put(removeFromWishlistFailed(error));
  }
}

export default function* removeFromWishlistWatcher() {
  yield takeLatest(REMOVE_FROM_WISHLIST, progressSaga, removeFromWishlistSaga);
}
