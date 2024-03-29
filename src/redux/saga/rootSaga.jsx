import { all, call } from "@redux-saga/core/effects";
import addItemToCartWatcher from "./addItemToCartSaga";
import addToWishlistWatcher from "./addToWishlistSaga";
import getAllProductsWatcher from "./getAllProductsSaga";
import getProductDetailsWatcher from "./getProductDetailsSaga";
import userDetailsWatcher from "./getUserDetailsSaga";
import loginWatcher from "./loginSaga";
import registerUserWatcher from "./registerUserSaga";
import removeFromWishlistWatcher from "./removeFromWishlistSaga";
import saveAddressWatcher, { saveAddressSaga } from "./saveAddressSaga";
import saveOrderWatcher from "./saveOrderSaga";

export default function* rootSaga() {
  const SAGAS = [
    userDetailsWatcher,
    loginWatcher,
    registerUserWatcher,
    getAllProductsWatcher,
    getProductDetailsWatcher,
    addItemToCartWatcher,
    addToWishlistWatcher,
    removeFromWishlistWatcher,
    saveAddressWatcher,
    saveOrderWatcher,
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
