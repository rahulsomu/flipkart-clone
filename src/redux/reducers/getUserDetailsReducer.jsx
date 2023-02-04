import {
  USER_DETAILS_LOADING,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILED,
  CLEAR_USER_DETAILS_STATUS,
} from "../constants/actionTypes";

const getUserDetailsReducer = (
  state = {
    success: "",
    data: "",
    loading: "",
    error: "",
  },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_LOADING: {
      return { ...state, loading: true, success: false };
    }
    case USER_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        error: "",
      };
    }
    case USER_DETAILS_FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    }
    case CLEAR_USER_DETAILS_STATUS: {
      return {
        ...state,
        loading: "",
        success: "",
        error: "",
      };
    }
    default: {
      return state;
    }
  }
};
export default getUserDetailsReducer;
