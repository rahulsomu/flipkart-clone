import axios from "axios";

const currentURL = window.location.origin;

let BASEURL =
  currentURL == "https://my-flipkart.netlify.app"
    ? "https://flipkart-backend-4sym.onrender.com"
    : "http://localhost:8000";

export const loginApi = async (payload) => {
  try {
    const response = await axios.post(`${BASEURL}/user/login`, payload);
    return response;
  } catch (error) {
    return {
      error: error.response.status,
    };
  }
};

export const getUserDetailsApi = async (payload) => {
  try {
    const response = await axios.post(`${BASEURL}/user/details`, payload);
    return response;
  } catch (error) {
    return {
      error: error.response.status,
    };
  }
};

export const registerUserApi = async (payload) => {
  try {
    const response = await axios.post(`${BASEURL}/user/register`, payload);
    return response;
  } catch (error) {
    return {
      error: error.response.status,
    };
  }
};

export const getAllProductsApi = async (payload) => {
  try {
    const response = await axios.get(
      `${BASEURL}/product/allproducts/?sort=${payload}`,
      payload
    );

    return response;
  } catch (error) {
    return {
      error: error.response.status,
    };
  }
};
export const getProductDetailsApi = async (payload) => {
  try {
    const response = await axios.get(`${BASEURL}/product/${payload}`, payload);
    return response;
  } catch (error) {
    return {
      error: error.response.status,
    };
  }
};
export const addItemToCartApi = async (payload) => {
  try {
    const response = await axios.post(
      `${BASEURL}/product/addItemTocart`,
      payload
    );
    return response;
  } catch (error) {
    return {
      error: error.response.status,
    };
  }
};

export const addToWishlistApi = async (payload) => {
  try {
    const response = await axios.post(`${BASEURL}/user/addToWishlist`, payload);
    return response;
  } catch (error) {
    return {
      error: error.response.status,
    };
  }
};

export const removeFromWishlistApi = async (payload) => {
  try {
    const response = await axios.post(
      `${BASEURL}/user/removeFromWishlist`,
      payload
    );
    return response;
  } catch (error) {
    return {
      error: error.response.status,
    };
  }
};

export const saveAddressApi = async (payload) => {
  try {
    const response = await axios.post(`${BASEURL}/user/saveaddress`, payload);
    return response;
  } catch (error) {
    return {
      error: error.response.status,
    };
  }
};

export const saveOrderApi = async (payload) => {
  try {
    const response = await axios.post(`${BASEURL}/user/saveOrder`, payload);
    return response;
  } catch (error) {
    return {
      error: error.response.status,
    };
  }
};
