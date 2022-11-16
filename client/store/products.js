import axios from "axios";
import history from "../history";

// ACTION TYPES
const SET_PRODUCTS = "SET_PRODUCTS";
const CREATE_PRODUCT = "CREATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

// ACTION CREATORS
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const createProduct = (newProduct) => {
  return {
    type: CREATE_PRODUCT,
    newProduct,
  };
};

export const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
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

export const creatingProduct = (newProduct) => async (dispatch) => {
  try {
    const { data: created } = await axios.post("/api/products", newProduct);
    console.log("NEW PRODUCT", newProduct);
    dispatch(createProduct(created));
  } catch (error) {
    throw error;
  }
};

export const deletingProduct = (id) => {
  return async (dispatch) => {
    const { data: product } = await axios.delete(`/api/products/${id}`);
    console.log("What's product?", product);
    dispatch(deleteProduct(product));
  };
};

// REDUCER
const productsReducer = (state = [], action) => {
  console.log("state in productsReducer", state);
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case CREATE_PRODUCT:
      return [...state, action.newProduct];
    case DELETE_PRODUCT:
      // return action.deleteProduct;
      console.log("state", state);
      return [
        ...state,
        state.filter((product) => product.id !== action.product.id),
      ];
    default:
      return state;
  }
};

export default productsReducer;
