import {
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_DETAILS_FAILED,
  GET_PRODUCT_DETAILS_LOADING,
  GET_PRODUCT_DETAILS_SUCCESS,
} from "../constants/actionTypes";

export const getProductDetails = (payload) => ({
  type: GET_PRODUCT_DETAILS,
  payload: payload,
});
export const getProductDetailsLoading = (payload) => ({
  type: GET_PRODUCT_DETAILS_LOADING,
  payload: payload,
});
export const getProductDetailsSuccess = (payload) => ({
  type: GET_PRODUCT_DETAILS_SUCCESS,
  payload: payload,
});
export const getProductDetailsFailed = (error) => ({
  type: GET_PRODUCT_DETAILS_FAILED,
  payload: error,
});
