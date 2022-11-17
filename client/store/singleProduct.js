import axios from "axios";

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

export const updatingProduct = (updateInfo) => async (dispatch) => {
  try {
    // const { id } = updateInfo;
    const token = window.localStorage.getItem("token");
    const { data } = await axios.put(
      `/api/products/${updateInfo.id}/update`,
      updateInfo,
      { headers: { authorization: token } }
    );
    console.log("DATA", data);
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
      return action.updatedProduct;
    default:
      return state;
  }
};

export default singleProductReducer;
