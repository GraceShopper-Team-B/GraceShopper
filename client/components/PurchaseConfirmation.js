import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "./Cart";

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

// class PurchaseConfirmation extends React.Component {
//   // componentDidMount() {
//   //   this.props.fetchCart(this.props.auth.id);
//   // }
//   render() {
//     return;
//     <div>
//       <h3> Your delicious treats are hopping on their way!</h3>
//       <img
//         width="300"
//         src="https://ecdn.teacherspayteachers.com/thumbitem/Bunnies-Clipart-4955669-1656584210/original-4955669-2.jpg"
//       />
//       <Link to="/products">
//         <button> See More Treats</button>
//       </Link>
//     </div>;
//   }
// }

// const mapState = (state) => {
//   return {
//     auth: state.auth,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     fetchCart: (userId) => dispatch(fetchCart(userId)),
//   };
// };

export default connect(null)(PurchaseConfirmation);
