import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CLEAR_LOGIN_STATUS,
} from "../constants/actionTypes";

const loginReducer = (
  state = {
    success: "",
    data: "",
    loading: "",
    error: "",
  },
  action
) => {
  switch (action.type) {
    case LOGIN_LOADING: {
      return { ...state, loading: true, success: "", error: "", data: "" };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        error: "",
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    }
    case CLEAR_LOGIN_STATUS: {
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
export default loginReducer;
