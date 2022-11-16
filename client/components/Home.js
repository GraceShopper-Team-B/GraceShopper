import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchCart(this.props.match.params.userId);
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <h3>
          Welcome, {this.props.username ? this.props.username : "Happy Hopper"}!
        </h3>

        <p>
          We are happy you have hopped in. Take a look at our hoppin' and mouth
          waterin' menu. Select some of Chef's tasty treats. Enjoy!
        </p>
      </div>
    );
  }
}

// export const Home = (props) => {
//   const { username } = props;

//   return (
//     <div>
//       <h3>Welcome, {username ? username : "Happy Hopper"}!</h3>

//       <p>
//         We are happy you have hopped in. Take a look at our hoppin' and mouth
//         waterin' menu. Select some of Chef's tasty treats. Enjoy!
//       </p>
//     </div>
//   );
// };

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (userId) => dispatch(fetchCart(userId)),
  };
};

export default connect(mapState, mapDispatch)(Home);
