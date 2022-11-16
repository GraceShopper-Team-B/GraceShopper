import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { creatingCart, fetchingCartWithCartId } from "../store/cart";
import { Link } from "react-router-dom";

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    this.props.authenticate(username, password, formName);
  }
  handleClick() {
    this.props.createCart();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} name={this.props.name}>
          <div>
            <label htmlFor="username">
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
            <button type="submit">{this.props.displayName}</button>
          </div>
          {this.props.error && this.props.error.response && (
            <div> {this.props.error.response.data} </div>
          )}
        </form>
        <Link to="/products">
          <button type="button" onClick={this.handleClick}>
            Continue as Guest
          </button>
        </Link>
      </div>
    );
  }
}

// const AuthForm = (props) => {
//   const { name, displayName, handleSubmit, handleClick, error } = props;

//   return (
//     <div>
//       <form onSubmit={handleSubmit} name={name}>
//         <div>
//           <label htmlFor="username">
//             <small>Username</small>
//           </label>
//           <input name="username" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password">
//             <small>Password</small>
//           </label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">{displayName}</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//       </form>
//       <Link to="/products">
//         <button type="button" onClick={handleClick}>
//           Continue as Guest
//         </button>
//       </Link>
//     </div>
//   );
// };

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
    id: state.auth.id,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    authenticate: (username, password, formName) =>
      dispatch(authenticate(username, password, formName)),
    createCart: () => dispatch(creatingCart()),
    fetchCart: () => dispatch(fetchingCartWithCartId),
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
