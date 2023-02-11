import {
  ADD_TO_WISHLIST,
  ADD_TO_WISHLIST_FAILED,
  ADD_TO_WISHLIST_LOADING,
  ADD_TO_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST,
  REMOVE_FROM_WISHLIST_LOADING,
  REMOVE_FROM_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_FAILED,
  CLEAR_ADD_TO_WISHLIST_STATUS,
  CLEAR_REMOVE_FROM_WISHLIST_STATUS,
} from "../constants/actionTypes";

export const addToWishlist = (payload) => ({
  type: ADD_TO_WISHLIST,
  payload: payload,
});
export const addToWishlistLoading = (payload) => ({
  type: ADD_TO_WISHLIST_LOADING,
  payload: payload,
});
export const addToWishlistSuccess = (payload) => ({
  type: ADD_TO_WISHLIST_SUCCESS,
  payload: payload,
});
export const addToWishlistFailed = (error) => ({
  type: ADD_TO_WISHLIST_FAILED,
  payload: error,
});
export const clearAddToWishlistStatus = (error) => ({
  type: CLEAR_ADD_TO_WISHLIST_STATUS,
  payload: error,
});

export const removeFromWishlist = (payload) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: payload,
});
export const removeFromWishlistLoading = (payload) => ({
  type: REMOVE_FROM_WISHLIST_LOADING,
  payload: payload,
});
export const removeFromWishlistSuccess = (payload) => ({
  type: REMOVE_FROM_WISHLIST_SUCCESS,
  payload: payload,
});
export const removeFromWishlistFailed = (error) => ({
  type: REMOVE_FROM_WISHLIST_FAILED,
  payload: error,
});
export const clearRemoveFromWishlistStatus = (error) => ({
  type: CLEAR_REMOVE_FROM_WISHLIST_STATUS,
  payload: error,
});
