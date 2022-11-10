import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <h3>Welcome, {username ? username : "Happy Hopper"}!</h3>

      <p>
        We are happy you have hopped in. Take a look at our hoppin' and mouth
        waterin' menu. Select some of Chef's tasty treats. Enjoy!
      </p>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
