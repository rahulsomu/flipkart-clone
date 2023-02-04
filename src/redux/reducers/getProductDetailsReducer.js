import {
  GET_PRODUCT_DETAILS_LOADING,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAILED,
} from "../constants/actionTypes";

const getProductDetailsReducer = (
  state = {
    success: "",
    data: "",
    loading: "",
    error: "",
  },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_LOADING: {
      return { ...state, loading: true, success: false };
    }
    case GET_PRODUCT_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        error: "",
      };
    }
    case GET_PRODUCT_DETAILS_FAILED: {
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
export default getProductDetailsReducer;
