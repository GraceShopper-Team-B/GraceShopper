import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "./Cart";

export const PurchaseConfirmation = ({ isLoggedIn, auth }) => {
  return (
    <div>
      <h3> Your delicious treats are hopping on their way!</h3>
      <img
        width="300"
        src="https://ecdn.teacherspayteachers.com/thumbitem/Bunnies-Clipart-4955669-1656584210/original-4955669-2.jpg"
      />
      {isLoggedIn ? (
        <Link to={`/home/${auth.id}`}>
          <button> Go Home </button>
        </Link>
      ) : (
        <Link to="/login">
          {" "}
          <button> Back to Login </button>
        </Link>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

export default connect(mapState)(PurchaseConfirmation);
