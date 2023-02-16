import {
  SAVE_ADDRESS_LOADING,
  SAVE_ADDRESS_SUCCESS,
  SAVE_ADDRESS_FAILED,
} from "../constants/actionTypes";

const saveAddressReducer = (
  state = {
    success: "",
    data: "",
    loading: "",
    error: "",
  },
  action
) => {
  switch (action.type) {
    case SAVE_ADDRESS_LOADING: {
      return { ...state, loading: true, success: false };
    }
    case SAVE_ADDRESS_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        error: "",
      };
    }
    case SAVE_ADDRESS_FAILED: {
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
export default saveAddressReducer;
