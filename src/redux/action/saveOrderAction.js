import {
  SAVE_ORDER,
  SAVE_ORDER_FAILED,
  SAVE_ORDER_LOADING,
  SAVE_ORDER_SUCCESS,
} from "../constants/actionTypes";

export const saveOrder = (payload) => ({
  type: SAVE_ORDER,
  payload: payload,
});
export const saveOrderLoading = (payload) => ({
  type: SAVE_ORDER_LOADING,
  payload: payload,
});
export const saveOrderSuccess = (payload) => ({
  type: SAVE_ORDER_SUCCESS,
  payload: payload,
});
export const saveOrderFailed = (error) => ({
  type: SAVE_ORDER_FAILED,
  payload: error,
});
