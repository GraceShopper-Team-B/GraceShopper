import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/user";
import EditUserProfile from "./EditUserProfile";

export class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadUser(this.props.match.params.userId);
    console.log(this.props);
  }

  render() {
    const user = this.props.user;
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const email = user.email;
    const phoneNumber = user.phoneNumber || "";
    const orderHistory = user.order || [];
    const favorites = user.favorites || [];

    return (
      <div className="container">
        <main>
          {user.length == 0 && (
            <h3 className=" error">User does not exist in the system!</h3>
          )}
          <h2>
            {firstName} {lastName}
          </h2>
          <h3>Email: {email}</h3>
          <h3>Phone Number :{phoneNumber}</h3>
          <h3>Favorites</h3>
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite.id}>{favorite}</li>
            ))}
          </ul>
          <h3>Order History:</h3>
          <ul>
            {orderHistory.map((order) => (
              <li key={order.id}>{order}</li>
            ))}
          </ul>
          <EditUserProfile />
        </main>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => ({
  loadUser: (userId) => dispatch(fetchUser(userId)),
});

export default connect(mapState, mapDispatch)(UserProfile);
