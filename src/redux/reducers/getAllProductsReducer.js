import {
  GET_ALL_PRODUCTS_LOADING,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILED,
} from "../constants/actionTypes";

const getAllProductsReducer = (
  state = {
    success: "",
    data: "",
    loading: "",
    error: "",
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_LOADING: {
      return { ...state, loading: true, success: false };
    }
    case GET_ALL_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        error: "",
      };
    }
    case GET_ALL_PRODUCTS_FAILED: {
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
export default getAllProductsReducer;
