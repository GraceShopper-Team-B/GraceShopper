import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { creatingCart, fetchingCartWithCartId } from "../store/cart";
import { creatingNewUser } from "../store/user";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const firstName = evt.target.firstName.value;
    const lastName = evt.target.lastName.value;
    const email = evt.target.email.value;
    const phoneNumber = evt.target.value;
    const address = evt.target.address.value;
    this.props.createUser({
      username,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
    });
  }
  //   handleClick() {
  //     const Signup = "Signup";
  //     this.props.authenticate(
  //       this.props.newUser.username,
  //       this.props.newUser.password,
  //       Signup
  //     );
  //   }

  render() {
    console.log(this.props);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <div>
              <label>
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label>
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            <div>
              <label>
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
            <div>
              <label>
                <small>Phone Number</small>
              </label>
              <input name="phoneNumber" type="text" />
            </div>
            <div>
              <label>
                <small>Address</small>
              </label>
              <input name="address" type="text" />
            </div>
            <button className="button" type="submit">
              Sign Up
            </button>
          </div>
          {this.props.error && this.props.error.response && (
            <div> {this.props.error.response.data} </div>
          )}
        </form>
        {/* <Link to="/products">
          <button
            id="guest"
            className="button"
            type="button"
            onClick={this.handleClick}
          >
            Begin Shopping
          </button>
        </Link> */}
      </div>
    );
  }
}

const mapSignup = (state) => {
  return {
    newUser: state.newUser,
  };
};

const mapDispatch = (dispatch) => {
  return {
    // authenticate: (username, password, Signup) =>
    //   dispatch(authenticate(username, password, Signup)),
    createUser: (newUser) => dispatch(creatingNewUser(newUser)),
  };
};

export default connect(mapSignup, mapDispatch)(SignUp);
