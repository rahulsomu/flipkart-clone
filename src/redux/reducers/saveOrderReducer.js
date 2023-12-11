import {
  SAVE_ORDER_LOADING,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_FAILED,
} from "../constants/actionTypes";

const saveOrderReducer = (
  state = {
    success: "",
    data: "",
    loading: "",
    error: "",
  },
  action
) => {
  switch (action.type) {
    case SAVE_ORDER_LOADING: {
      return { ...state, loading: true, success: false };
    }
    case SAVE_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        error: "",
      };
    }
    case SAVE_ORDER_FAILED: {
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
export default saveOrderReducer;
