import axios from "axios";
import history from "../history";

// ACTION TYPES
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";

// ACTION CREATORS
export const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  };
};

// THUNK CREATORS
export const fetchSingleProduct = () => async (dispatch) => {
  try {
    const { data: product } = await axios.get("/api/products");
    dispatch(setProducts(product));
  } catch (error) {
    throw error;
  }
};

// REDUCER
const singleProductReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};

export default singleProductReducer;
