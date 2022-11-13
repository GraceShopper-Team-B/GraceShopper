import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import productsReducer from "./products";
import userReducer from "./user";
import singleProductReducer from "./singleProduct";
import cartReducer from "./cart";
import itemReducer from "./cartItem";

const reducer = combineReducers({
  auth,
  products: productsReducer,
  user: userReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer,
  cartItem: itemReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
