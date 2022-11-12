import axios from "axios";
import history from "../history";
// import productsReducer from "./products";

//ACTION TYPES
const SET_CART = "SET_CART";
const PURCHASE_CART = "PURCHASE_CART";

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

// export const _incrementItem = (item) => {
//   return {
//     type: INCREMENT_ITEM,
//     item,
//   };
// };

//THUNK CREATORS
export const fetchCart = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/cart/${userId}`);

    dispatch(setCart(data[0]));
  } catch (error) {
    throw error;
  }
};

export const purchasingCart = (orderId) => async (dispatch) => {
  try {
    const { data: newCart } = await axios.put(
      "/api/cart/:userId/checkout",
      orderId
    );
    dispatch(purchaseCart(newCart));
  } catch (error) {
    throw error;
  }
};

//REDUCER
const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    // case INCREMENT_ITEM:
    //   return action.item;
    default:
      return state;
  }
};

export default cartReducer;
