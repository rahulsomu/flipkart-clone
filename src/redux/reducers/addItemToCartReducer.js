import {
  ADD_ITEM_TO_CART_LOADING,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILED,
} from "../constants/actionTypes";

const addItemToCartReducer = (
  state = {
    success: "",
    data: "",
    loading: "",
    error: "",
  },
  action
) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART_LOADING: {
      return { ...state, loading: true, success: "", error: "", data: "" };
    }
    case ADD_ITEM_TO_CART_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        error: "",
      };
    }
    case ADD_ITEM_TO_CART_FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default addItemToCartReducer;
