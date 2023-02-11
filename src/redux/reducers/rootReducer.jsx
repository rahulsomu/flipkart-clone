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
import registerUserReducer from "./registerUserReducer";
import removeFromWishlistReducer from "./removeFromWishlistReducer";

const reducers = combineReducers({
  userDetails: getUserDetailsReducer,
  registerUser: registerUserReducer,
  allProducts: getAllProductsReducer,
  productDetails: getProductDetailsReducer,
  addItemToCart: addItemToCartReducer,
  cart: addCartItemReducer,
  loggedIn: loggedInReducer,
  addToWishlist: addToWishlistReducer,
  removeFromWishlist: removeFromWishlistReducer,
  wishlist: wishlistItemsReducer,
});
export default reducers;
