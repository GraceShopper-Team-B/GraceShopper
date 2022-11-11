import axios from "axios";
import history from "../history";

//ACTION TYPE
const INCREMENT_ITEM = "INCREMENT_ITEM";
const DECREMENT_ITEM = "DECREMENT_ITEM";
const DELETE_ITEM = "DELETE_ITEM";

//ACTION CREATORS
export const _incrementItem = (item) => {
  return {
    type: INCREMENT_ITEM,
    item,
  };
};

export const _decrementItem = (item) => {
  return {
    type: DECREMENT_ITEM,
    item,
  };
};

export const _deleteItem = (item) => {
  return {
    type: DELETE_ITEM,
    item,
  };
};

//THUNK CREATORS
export const incrementItem = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/cart/userId/increment`, id);
    dispatch(_incrementItem(data));
  } catch (error) {
    throw error;
  }
};

export const decrementItem = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/cart/userId/decrement`, id);
    dispatch(_decrementItem(data));
  } catch (error) {
    throw error;
  }
};

// export const deleteItem = (id) => async (dispatch) => {
//   try {
//     const { data } = await axios.put(`/api/cart/userId/delete`, id);
//     dispatch(_deleteItem(data));
//     history.push;
//   } catch (error) {
//     throw error;
//   }
// };
export const deleteItem = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/cart/userId/delete`, id);
    console.log("data in deleteItem", data);
    dispatch(_deleteItem(data));
  } catch (error) {
    throw error;
  }
};

//REDUCER

const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case INCREMENT_ITEM:
      return action.item;
    case DECREMENT_ITEM:
      return action.item;
    case DELETE_ITEM:
      return action.item;
    default:
      return state;
  }
};

export default itemReducer;
