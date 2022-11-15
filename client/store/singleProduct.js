import axios from "axios";
import history from "../history";

// ACTION TYPES
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

// ACTION CREATORS
export const setSingleProduct = (singleProduct) => {
  return {
    type: SET_SINGLE_PRODUCT,
    singleProduct,
  };
};

export const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product,
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

export const updatingProduct = (updateInfo) => async (dispatch) => {
  try {
    const { id } = updateInfo;
    console.log(updateInfo);
    const { data } = await axios.put(`/api/products/${id}/update`, updateInfo);
    dispatch(updateProduct(data));
  } catch (error) {
    throw error;
  }
};

// REDUCER
const singleProductReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.singleProduct;
    case UPDATE_PRODUCT:
      return action.updateProduct;
    default:
      return state;
  }
};

export default singleProductReducer;
