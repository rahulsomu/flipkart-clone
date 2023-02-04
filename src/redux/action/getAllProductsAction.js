import {
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_FAILED,
  GET_ALL_PRODUCTS_LOADING,
  GET_ALL_PRODUCTS_SUCCESS,
} from "../constants/actionTypes";

export const getAllProducts = (payload) => ({
  type: GET_ALL_PRODUCTS,
  payload: payload,
});
export const getAllProductsLoading = (payload) => ({
  type: GET_ALL_PRODUCTS_LOADING,
  payload: payload,
});
export const getAllProductsSuccess = (payload) => ({
  type: GET_ALL_PRODUCTS_SUCCESS,
  payload: payload,
});
export const getAllProductsFailed = (error) => ({
  type: GET_ALL_PRODUCTS_FAILED,
  payload: error,
});
