import {
  ADD_ITEM,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  LOGGED_IN,
  REMOVE_ITEM,
  WISHLIST_ITEMS,
} from "../constants/actionTypes";

export const addCartItemReducer = (
  state = {
    cart: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_ITEM: {
      localStorage.setItem(
        "cart",
        JSON.stringify({ ...state, cart: [...state.cart, action.payload] })
      );
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case REMOVE_ITEM: {
      const product = state.cart.filter(
        (item) =>
          item.variant === action.payload.variant &&
          item._id === action.payload._id
      );
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...state,
          cart: [...state.cart.filter((item) => item !== product[0])],
        })
      );
      return {
        ...state,
        cart: [...state.cart.filter((item) => item !== product[0])],
      };
    }
    case INCREASE_QUANTITY: {
      const product = state.cart.filter(
        (item) =>
          item._id === action.payload._id &&
          item.variant === action.payload.variant
      );

      product[0].quantity += 1;
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...state,
          cart: [...state.cart],
        })
      );
      return {
        ...state,
        cart: [...state.cart],
      };
    }
    case DECREASE_QUANTITY: {
      const product = state.cart.filter(
        (item) =>
          item._id === action.payload._id &&
          item.variant === action.payload.variant
      );

      product[0].quantity -= 1;
      JSON.stringify({
        ...state,
        cart: [...state.cart],
      });
      return {
        ...state,
        cart: [...state.cart],
      };
    }
    default: {
      return state;
    }
  }
};

export const loggedInReducer = (
  state = {
    status: false,
  },
  action
) => {
  switch (action.type) {
    case LOGGED_IN: {
      return { ...state, status: action.payload };
    }

    default: {
      return state;
    }
  }
};

export const wishlistItemsReducer = (
  state = {
    wishlist: [],
  },
  action
) => {
  switch (action.type) {
    case WISHLIST_ITEMS: {
      console.log(typeof action.payload, "typeof");
      return {
        ...state,
        wishlist:
          state.wishlist.filter((item) => item === action.payload).length > 0
            ? typeof action.payload === "string"
              ? state.wishlist.filter((item) => item !== action.payload)
              : [...state.wishlist.filter((item) => item !== action.payload)]
            : typeof action.payload === "string"
            ? [...state.wishlist, action.payload]
            : [...state.wishlist, action.payload],
      };
    }

    default: {
      return state;
    }
  }
};
