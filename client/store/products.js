import axios from "axios";
import history from "../history";

// ACTION TYPES
const SET_PRODUCTS = "SET_PRODUCTS";

// ACTION CREATORS
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

// THUNK CREATORS
export const fetchProducts = () => async (dispatch) => {
  try {
    const { data: products } = await axios.get("/api/products");
    dispatch(setProducts(products));
  } catch (error) {
    throw error;
  }
};

// REDUCER
const productsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

export default productsReducer;
