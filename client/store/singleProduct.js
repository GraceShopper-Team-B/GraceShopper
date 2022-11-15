import axios from "axios";
import history from "../history";

// ACTION TYPES
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";
const CREATE_PROCUCT = "CREATE_PRODUCT";

// ACTION CREATORS
export const setSingleProduct = (singleProduct) => {
  return {
    type: SET_SINGLE_PRODUCT,
    singleProduct,
  };
};

export const createProduct = (newProduct) => {
  return {
    type: CREATE_PROCUCT,
    newProduct,
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

export const creatingProduct = (newProduct) => async (dispatch) => {
  try {
    const { data: created } = await axios.post("/api/products", newProduct);
    console.log("NEW PRODUCT", newProduct);
    dispatch(createProduct(created));
  } catch (error) {
    throw error;
  }
};

// REDUCER
const singleProductReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.singleProduct;
    case CREATE_PROCUCT:
      return [...state, action.createProduct];
    default:
      return state;
  }
};

export default singleProductReducer;
