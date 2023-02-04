import { combineReducers } from "redux";
import addItemToCartReducer from "./addItemToCartReducer";
import { addCartItemReducer, loggedInReducer } from "./appreducers";
import getAllProductsReducer from "./getAllProductsReducer";
import getProductDetailsReducer from "./getProductDetailsReducer";
import getUserDetailsReducer from "./getUserDetailsReducer";
import registerUserReducer from "./registerUserReducer";

const reducers = combineReducers({
  userDetails: getUserDetailsReducer,
  registerUser: registerUserReducer,
  allProducts: getAllProductsReducer,
  productDetails: getProductDetailsReducer,
  addItemToCart: addItemToCartReducer,
  cart: addCartItemReducer,
  loggedIn: loggedInReducer,
});
export default reducers;
