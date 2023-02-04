import {
  ADD_ITEM,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  LOGGED_IN,
  REMOVE_ITEM,
} from "../constants/actionTypes";

export const addItem = (payload) => ({
  type: ADD_ITEM,
  payload: payload,
});
export const removeItem = (payload) => ({
  type: REMOVE_ITEM,
  payload: payload,
});

export const increaseQuantity = (payload) => ({
  type: INCREASE_QUANTITY,
  payload: payload,
});
export const decreaseQuantity = (payload) => ({
  type: DECREASE_QUANTITY,
  payload: payload,
});

export const loggedIn = (payload) => ({
  type: LOGGED_IN,
  payload: payload,
});
