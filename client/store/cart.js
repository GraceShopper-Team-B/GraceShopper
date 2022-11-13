import axios from "axios";
import history from "../history";
// import productsReducer from "./products";

//ACTION TYPES
const SET_CART = "SET_CART";
const PURCHASE_CART = "PURCHASE_CART";
const UPDATE_CART_ADDRESS = "UPDATE_CART_ADDRESS";

//ACTION CREATORS
export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};
const purchaseCart = (cart) => {
  return {
    type: PURCHASE_CART,
    cart,
  };
};
const updateCartAddress = (cart) => {
  return { typp: UPDATE_CART_ADDRESS, cart };
};

//THUNK CREATORS
export const fetchCart = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/cart/${userId}`);

    dispatch(setCart(data[0]));
  } catch (error) {
    throw error;
  }
};

export const purchasingCart = (info) => async (dispatch) => {
  try {
    const { data: newCart } = await axios.put(
      "/api/cart/:userId/checkout",
      info
    );
    dispatch(purchaseCart(newCart));
  } catch (error) {
    throw error;
  }
};

export const newCartAddress = (newInfo) => async (dispatch) => {
  try {
    const { userId } = newInfo;
    const { data: updatedCart } = await axios.put(
      `/api/cart/${userId}/updateAddress`,
      newInfo
    );
    dispatch(updateCartAddress(updatedCart));
  } catch (error) {
    throw error;
  }
};

//REDUCER
const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case PURCHASE_CART:
      return action.cart;
    case UPDATE_CART_ADDRESS:
      return action.cart;
    default:
      return state;
  }
};

export default cartReducer;
