import { all, call } from "@redux-saga/core/effects";
import addItemToCartWatcher from "./addItemToCartSaga";
import getAllProductsWatcher from "./getAllProductsSaga";
import getProductDetailsWatcher from "./getProductDetailsSaga";
import userDetailsWatcher from "./getUserDetailsSaga";
import registerUserWatcher from "./registerUserSaga";

export default function* rootSaga() {
  const SAGAS = [
    userDetailsWatcher,
    registerUserWatcher,
    getAllProductsWatcher,
    getProductDetailsWatcher,
    addItemToCartWatcher,
  ];
  yield all(
    SAGAS.map((saga) => {
      try {
        return call(saga);
      } catch (error) {
        return false;
      }
    })
  );
}
