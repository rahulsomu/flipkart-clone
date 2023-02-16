import {
  SAVE_ADDRESS,
  SAVE_ADDRESS_FAILED,
  SAVE_ADDRESS_LOADING,
  SAVE_ADDRESS_SUCCESS,
} from "../constants/actionTypes";

export const saveAddress = (payload) => ({
  type: SAVE_ADDRESS,
  payload: payload,
});
export const saveAddressLoading = (payload) => ({
  type: SAVE_ADDRESS_LOADING,
  payload: payload,
});
export const saveAddressSuccess = (payload) => ({
  type: SAVE_ADDRESS_SUCCESS,
  payload: payload,
});
export const saveAddressFailed = (error) => ({
  type: SAVE_ADDRESS_FAILED,
  payload: error,
});
