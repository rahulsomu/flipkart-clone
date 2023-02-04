import {
  REGISTER_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
} from "../constants/actionTypes";

export const registerUser = (payload) => ({
  type: REGISTER_USER,
  payload: payload,
});
export const registerUserLoading = (payload) => ({
  type: REGISTER_USER_LOADING,
  payload: payload,
});
export const registerUserSuccess = (payload) => ({
  type: REGISTER_USER_SUCCESS,
  payload: payload,
});
export const registerUserFailed = (error) => ({
  type: REGISTER_USER_FAILED,
  payload: error,
});
// export const clearRegistationInfo = (error) => ({
//   type: CLEAR_REGISTATION_STATUS,
//   payload: error,
// });
