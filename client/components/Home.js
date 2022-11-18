import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchCart(this.props.match.params.userId);
  }
  render() {
    return (
      <div className="HomeContainer">
        <h3>
          Welcome, {this.props.username ? this.props.username : "Happy Hopper"}!
        </h3>

        <p>
          We are happy you have hopped in. Take a look at our hoppin' and mouth
          waterin' menu. Select some of Chef's tasty treats. Enjoy!
        </p>

        <img
          id="welcome"
          width="400"
          src="https://thumbs.dreamstime.com/b/every-bunny-welcome-text-rabbit-ears-easter-vector-lettering-flyers-posters-banner-card-print-sticker-label-hand-drawn-209692257.jpg"
        />
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
