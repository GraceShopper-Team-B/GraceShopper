import axios from "axios";
import history from "../history";

//ACTION TYPE
const INCREMENT_ITEM = "INCREMENT_ITEM";
const DECREMENT_ITEM = "DECREMENT_ITEM";

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

//THUNK CREATORS
export const incrementItem = (newInfo) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/cart/userId/increment`, newInfo);
    dispatch(_incrementItem(data));
  } catch (error) {
    throw error;
  }
};

export const decrementItem = (newInfo) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/cart/userId/decrement`, newInfo);
    dispatch(_decrementItem(data));
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
    default:
      return state;
  }
};

export default itemReducer;
