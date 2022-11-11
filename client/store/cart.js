import axios from "axios";
import history from "../history";
import productsReducer from "./products";

//ACTION TYPES
const SET_CART = "SET_CART";

//ACTION CREATORS
export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

//THUNK CREATORS
export const fetchCart = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/cart/${userId}`);
    dispatch(setCart(data));
  } catch (error) {
    throw error;
  }
};

//REDUCER
const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
};

export default cartReducer;
