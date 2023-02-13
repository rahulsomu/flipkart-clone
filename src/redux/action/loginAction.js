import {
  CLEAR_LOGIN_STATUS,
  LOGIN,
  LOGIN_FAILED,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from "../constants/actionTypes";

export const login = (payload) => ({
  type: LOGIN,
  payload: payload,
});
export const loginLoading = (payload) => ({
  type: LOGIN_LOADING,
  payload: payload,
});
export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload: payload,
});
export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  payload: error,
});
export const clearLoginStatus = (payload) => ({
  type: CLEAR_LOGIN_STATUS,
  payload: payload,
});
