import {
  REMOVE_FROM_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_LOADING,
  REMOVE_FROM_WISHLIST_FAILED,
  CLEAR_REMOVE_FROM_WISHLIST_STATUS,
} from "../constants/actionTypes";

const removeFromWishlistReducer = (
  state = {
    success: "",
    data: "",
    loading: "",
    error: "",
  },
  action
) => {
  switch (action.type) {
    case REMOVE_FROM_WISHLIST_LOADING: {
      return { ...state, loading: true, success: false };
    }
    case REMOVE_FROM_WISHLIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        error: "",
      };
    }
    case REMOVE_FROM_WISHLIST_FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    }
    case CLEAR_REMOVE_FROM_WISHLIST_STATUS: {
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
export default removeFromWishlistReducer;
