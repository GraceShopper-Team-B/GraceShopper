import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/user";
import { Link } from "react-router-dom";

export class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadUser(this.props.match.params.userId);
  }

  render() {
    const user = this.props.user;
    const userId = user.id || 0;
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const email = user.email;
    const phoneNumber = user.phoneNumber || "";
    const orderHistory = user.order || [];
    const favorites = user.favorites || [];

    let admin;
    if (user.isAdmin) {
      admin = true;
    } else {
      admin = false;
    }

    return (
      <div className="container">
        <main>
          {user.length == 0 && (
            <h3 className=" error">User does not exist in the system!</h3>
          )}
          <h2>
            {firstName} {lastName}
          </h2>
          <h4>Email: {email}</h4>
          <h4>Phone Number :{phoneNumber}</h4>
          <h4>Favorites</h4>
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite.id}>{favorite}</li>
            ))}
          </ul>
          <h4>Order History:</h4>
          <ul>
            {orderHistory.map((order) => (
              <li key={order.id}>{order}</li>
            ))}
          </ul>
          <div>
            <Link to={`/users/${userId}/editProfile`}>
              <button type="button">Edit User Profile</button>
            </Link>
          </div>
          <div>
            {admin && (
              <Link to={`/products/create`}>
                <button type="button">New Product</button>
              </Link>
            )}
          </div>
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
