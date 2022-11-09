import axios from "axios";
import history from "../history";

// ACTION TYPES
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";

// ACTION CREATORS
export const setSingleProduct = (singleProduct) => {
  return {
    type: SET_SINGLE_PRODUCT,
    singleProduct,
  };
};

// THUNK CREATORS
export const fetchSingleProduct = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setSingleProduct(data));
  } catch (error) {
    throw error;
  }
};

// REDUCER
const singleProductReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.singleProduct;
    default:
      return state;
  }
};

export default singleProductReducer;
