import {
  CLEAR_USER_DETAILS_STATUS,
  USER_DETAILS,
  USER_DETAILS_FAILED,
  USER_DETAILS_LOADING,
  USER_DETAILS_SUCCESS,
} from "../constants/actionTypes";

export const getUserDetails = (payload) => ({
  type: USER_DETAILS,
  payload: payload,
});
export const getUserDetailsLoading = (payload) => ({
  type: USER_DETAILS_LOADING,
  payload: payload,
});
export const getUserDetailsSuccess = (payload) => ({
  type: USER_DETAILS_SUCCESS,
  payload: payload,
});
export const getUserDetailsFailed = (error) => ({
  type: USER_DETAILS_FAILED,
  payload: error,
});
export const clearUserDetailsStatus = (payload) => ({
  type: CLEAR_USER_DETAILS_STATUS,
  payload: payload,
});
