import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import UserProfile from "./components/UserProfile";
import EditUserProfile from "./components/EditUserProfile";
import CreateProduct from "./components/CreateProduct";
import UpdateProduct from "./components/UpdateProduct";
import SingleProduct from "./components/SingleProduct";
import Checkout from "./components/CheckOut";
import PurchaseConfirmation from "./components/PurchaseConfirmation";
import { me } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/users/:userId" component={UserProfile} />
            <Route
              path="/users/:userId/editProfile"
              component={EditUserProfile}
            />

            <Route exact path="/products/create" component={CreateProduct} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route
              exact
              path="/products/:productId/update"
              component={UpdateProduct}
            />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />

            <Route
              exact
              path="/purchaseConfirmation"
              component={PurchaseConfirmation}
            />

            <Route exact path="/home/:userId" component={Home} />
            <Redirect to={`home/${this.props.auth.id}`} />

          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route
              exact
              path="/purchaseConfirmation"
              component={PurchaseConfirmation}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
