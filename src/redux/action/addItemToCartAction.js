import {
  ADD_ITEM_TO_CART,
  ADD_ITEM_TO_CART_FAILED,
  ADD_ITEM_TO_CART_LOADING,
  ADD_ITEM_TO_CART_SUCCESS,
} from "../constants/actionTypes";

export const addItemToCart = (payload) => ({
  type: ADD_ITEM_TO_CART,
  payload: payload,
});
export const addItemToCartLoading = (payload) => ({
  type: ADD_ITEM_TO_CART_LOADING,
  payload: payload,
});
export const addItemToCartSuccess = (payload) => ({
  type: ADD_ITEM_TO_CART_SUCCESS,
  payload: payload,
});
export const addItemToCartFailed = (error) => ({
  type: ADD_ITEM_TO_CART_FAILED,
  payload: error,
});

export const resetCart = (payload) => ({
  type: "RESET_CART",
  payload: payload,
});
