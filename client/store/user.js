import axios from "axios";
import history from "../history";

// ACTION TYPES
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";

// ACTION CREATORS
const setUser = (user) => ({ type: SET_USER, user });

const updateUser = (updatedUser) => ({ type: UPDATE_USER, updatedUser });

// THUNK CREATORS
export const fetchUser = (userId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    console.log("Iam token", token);
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
    const { data: updatedUser } = await axios.put(
      `/api/users/${userInfo.id}`,
      userInfo
    );
    dispatch(updateUser(updatedUser));
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
    default:
      return state;
  }
};

export default userReducer;
