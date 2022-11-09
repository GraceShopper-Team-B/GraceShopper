import React, { useState } from "react";
import { connect } from "react-redux";
import { updatingUser } from "../store/user";

export class UpdateUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      password: this.props.user.password,
      phoneNumber: this.props.user.phoneNumber,
      error: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.props.user;
    this.props.updateUser({
      id: user.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { handleChange } = this;
    const { handleSubmit } = this;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <h3>Update User</h3>
        <label> New First Name:</label>
        <input
          type="text"
          name="firstName"
          required
          value={this.state.firstName}
          onChange={handleChange}
        />
        <label> New Last Name</label>
        <input
          type="text"
          name="lastName"
          required
          value={this.state.lastName}
          onChange={handleChange}
        />
        <label> New Email</label>
        <input
          type="text"
          name="email"
          required
          value={this.state.email}
          onChange={handleChange}
        />
        <label> New Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          required
          value={this.state.phoneNumber}
          onChange={handleChange}
        />
        <label> New Password</label>
        <input
          type="password"
          name="password"
          required
          value={this.state.password}
          onChange={handleChange}
        />
        <button className="updateButton" type="submit">
          Update Profile
        </button>
        {this.state.error != "" && <p>{this.state.error}</p>}
      </form>
    );
  }
}
const mapState = (state) => ({
  user: state.auth,
});

const mapDispatch = (dispatch) => ({
  updateUser: (userInfo) => dispatch(updatingUser(userInfo)),
});

export default connect(mapState, mapDispatch)(UpdateUserProfile);
