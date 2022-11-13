import React from "react";
import { Link } from "react-router-dom";

export const PurchaseConfirmation = (props) => {
  return (
    <div>
      <h3> Your delicious treats are hopping on their way!</h3>
      <img
        width="300"
        src="https://ecdn.teacherspayteachers.com/thumbitem/Bunnies-Clipart-4955669-1656584210/original-4955669-2.jpg"
      />
      <Link to="/products">
        <button> See More Treats</button>
      </Link>
    </div>
  );
};

export default PurchaseConfirmation;
