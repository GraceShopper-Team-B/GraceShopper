import axios from "axios";
import history from "../history";
// import productsReducer from "./products";

//ACTION TYPES
const SET_CART = "SET_CART"; //This fetches whole cart using userId
const PURCHASE_CART = "PURCHASE_CART";
const UPDATE_CART_ADDRESS = "UPDATE_CART_ADDRESS";
const CREATE_CART = "CREATE-CART";
const SET_CART_CART_ID = "SET_CART_CART_ID"; // This fethces whole cart using cartid

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
  return { type: UPDATE_CART_ADDRESS, cart };
};

const createCart = (cart) => {
  return { type: CREATE_CART, cart };
};
const setCartWithCartId = (cart) => {
  return { type: SET_CART_CART_ID, cart };
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
    const { data: updatedCart } = await axios.put(
      `/api/cart/userId/updateAddress`,
      newInfo
    );
    dispatch(updateCartAddress(updatedCart));
  } catch (error) {
    throw error;
  }
};

export const creatingCart = () => async (dispatch) => {
  try {
    const { data: newCart } = await axios.post("/api/cart/create");
    window.localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch(createCart(newCart));
  } catch (error) {
    throw error;
  }
};

export const fetchingCartWithCartId = () => async (dispatch) => {
  try {
    const fetchCart = JSON.parse(window.localStorage.getItem("cart"));
    const { id } = fetchCart;
    const { data } = await axios.get(`api/cart/${id}`);
    console.log(data);
    dispatch(setCartWithCartId(data));
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
    case CREATE_CART:
      return action.cart;
    case SET_CART_CART_ID:
      return action.cart;
    default:
      return state;
  }
};

export default cartReducer;
