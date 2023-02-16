import { combineReducers } from "redux";
import addItemToCartReducer from "./addItemToCartReducer";
import addToWishlistReducer from "./addToWishlistReducer";
import {
  addCartItemReducer,
  loggedInReducer,
  wishlistItemsReducer,
} from "./appreducers";
import getAllProductsReducer from "./getAllProductsReducer";
import getProductDetailsReducer from "./getProductDetailsReducer";
import getUserDetailsReducer from "./getUserDetailsReducer";
import loginReducer from "./loginReducer";
import registerUserReducer from "./registerUserReducer";
import removeFromWishlistReducer from "./removeFromWishlistReducer";
import saveAddressReducer from "./saveAddressReducer";

const reducers = combineReducers({
  userDetails: getUserDetailsReducer,
  login: loginReducer,
  registerUser: registerUserReducer,
  allProducts: getAllProductsReducer,
  productDetails: getProductDetailsReducer,
  addItemToCart: addItemToCartReducer,
  cart: addCartItemReducer,
  loggedIn: loggedInReducer,
  addToWishlist: addToWishlistReducer,
  removeFromWishlist: removeFromWishlistReducer,
  wishlist: wishlistItemsReducer,
  saveAddress: saveAddressReducer,
});
export default reducers;
