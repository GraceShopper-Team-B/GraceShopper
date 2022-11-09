import React, { useState } from "react";
import { connect } from "react-redux";
import { updatingUser } from "../store/user";

export class UpdateUserProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
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
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      password: this.props.user.password,
      phoneNumber: this.props.user.phoneNumber,
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "firstName") {
      if (event.target.value.length === 0) {
        this.setState({ error: "First name must be filled." });
      } else {
        this.setState({ error: "" });
      }
    }

    if (event.target.name === "lastName") {
      if (event.target.value.length === 0) {
        this.setState({ error: "Last name must be filled." });
      } else {
        this.setState({ error: "" });
      }
    }

    if (event.target.name === "email") {
      if (event.target.value.length === 0) {
        this.setState({ error: "Email must be filled." });
      } else {
        this.setState({ error: "" });
      }
    }
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

// const UpdateUserProfile = props => {
//   const {name, handleSubmit, handleChange, type, value, error} = props;
//   const [Input, setInput]= useState({
//     name: name,
//     value: value,
//   });

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="">
//             <small>Enter New Information</small>
//           </label>
//           <input name= {name} value = {value} type= {type} onChange = {handleChange} />
//         </div>
//         <div>
//           <button type="submit">Edit</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//       </form>
//     </div>
//   )
// }

// const mapFirstName = state => {
//   return {
//     name: 'firstName',
//     value: '',
//     type: "text",
//     error: state.auth.error
//   }
// }

// const mapLastName = state => {
//   return {
//     name: 'lastName',
//     value: '',
//     type: "text",
//     error: state.auth.error
//   }
// }
// const mapEmail = state => {
//   return {
//     name: 'email',
//     value: '',
//     type: "text",
//     error: state.auth.error
//   }
// }

// const mapPhoneNumber = state => {
//   return {
//     name: 'phoneNumber',
//     value: '',
//     type: "text",
//     error: state.auth.error
//   }
// }
// const mapPassword = state => {
//   return {
//     name: 'password',
//     value: '',
//     type: "password",
//     error: state.auth.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const userInfo = {
//         id: state.auth.id,

//       }
//       dispatch(updatingUser(username, password, formName))
//     },
//     handleChange(){

//     }
//   }
// }
