import axios from "axios";
import history from "../history";

// ACTION TYPES
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";

const CREATE_PROCUCT = "CREATE_PRODUCT";

const UPDATE_PRODUCT = "UPDATE_PRODUCT";


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

export const updateProduct = (updatedProduct) => {
  return {
    type: UPDATE_PRODUCT,
    updatedProduct,

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

export const updatingProduct = (updateInfo) => async (dispatch) => {
  try {
    // const { id } = updateInfo;
    console.log(updateInfo);
    const { data: updateProduct } = await axios.put(
      `/api/products/${updateInfo.id}/update`,
      updateInfo
    );
    dispatch(updateProduct(updateProduct));

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

    case UPDATE_PRODUCT:
      console.log("action.updateProduct", action);
      return action.updatedProduct;

    default:
      return state;
  }
};

export default singleProductReducer;
