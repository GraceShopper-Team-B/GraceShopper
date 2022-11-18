import axios from "axios";
import history from "../history";
import { creatingCart } from "./cart";

// ACTION TYPES
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";
const CREATE_USER = "CREATE_USER";

// ACTION CREATORS
const setUser = (user) => ({ type: SET_USER, user });
const updateUser = (updatedUser) => ({ type: UPDATE_USER, updatedUser });
const createUser = (newUser) => ({ type: CREATE_USER, newUser });

// THUNK CREATORS
export const fetchUser = (userId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    const { data: user } = await axios.get(`/api/users/${userId}`, {
      headers: { authorization: token },
    });
    dispatch(setUser(user));
  } catch (error) {
    throw error;
  }
};

export const updatingUser = (userInfo) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    const { data: updatedUser } = await axios.put(
      `/api/users/${userInfo.id}/editProfile`,
      userInfo,
      { headers: { authorization: token } }
    );
    dispatch(updateUser(updatedUser));
  } catch (error) {
    throw error;
  }
};

export const creatingNewUser = (newInfo) => async (dispatch) => {
  try {
    console.log(newInfo);
    const { data } = await axios.post("/auth/signup", newInfo);
    const { newUser, newCart } = data;
    console.log(newUser);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch(createUser(newUser));
  } catch (error) {
    throw error;
  }
};

// REDUCER
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case UPDATE_USER:
      return action.updatedUser;
    case CREATE_USER:
      return action.newUser;
    default:
      return state;
  }
};

export default userReducer;
