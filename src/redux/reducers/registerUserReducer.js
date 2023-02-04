import {
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
} from "../constants/actionTypes";

const registerUserReducer = (
  state = {
    success: "",
    data: "",
    loading: "",
    error: "",
  },
  action
) => {
  switch (action.type) {
    case REGISTER_USER_LOADING: {
      return { ...state, loading: true, success: "", error: "", data: "" };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        error: "",
      };
    }
    case REGISTER_USER_FAILED: {
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
export default registerUserReducer;
