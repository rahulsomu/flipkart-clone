import {
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_LOADING,
  ADD_TO_WISHLIST_FAILED,
  CLEAR_ADD_TO_WISHLIST_STATUS,
} from "../constants/actionTypes";

const addToWishlistReducer = (
  state = {
    success: "",
    data: "",
    loading: "",
    error: "",
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_WISHLIST_LOADING: {
      return { ...state, loading: true, success: false };
    }
    case ADD_TO_WISHLIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        error: "",
      };
    }
    case ADD_TO_WISHLIST_FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    }
    case CLEAR_ADD_TO_WISHLIST_STATUS: {
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
export default addToWishlistReducer;
