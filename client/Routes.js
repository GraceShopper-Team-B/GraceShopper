import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import UserProfile from "./components/UserProfile";
import EditUserProfile from "./components/EditUserProfile";
import UpdateProduct from "./components/UpdateProduct";

import SingleProduct from "./components/SingleProduct";
import CheckOut from "./components/CheckOut";
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
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route
              exact
              path="/products/:productId/update"
              component={UpdateProduct}
            />
            <Route exact path="/cart/:userId" component={Cart} />

            <Route exact path="/cart/:userId/checkout" component={CheckOut} />
            <Route
              exact
              path="/purchaseConfirmation"
              component={PurchaseConfirmation}
            />

            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route exact path="/cart/:userId" component={Cart} />
            <Route exact path="/cart/:userId/checkout" component={CheckOut} />
            <Route
              exact
              path="/purchaseConfirmation"
              component={PurchaseConfirmation}
            />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            <Route path="/home" component={Home} />
            <Redirect to="/home" />

            <Route exact path="/cart/:userId" component={Cart} />
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
