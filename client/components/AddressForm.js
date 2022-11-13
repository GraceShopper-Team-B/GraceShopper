import React from "react";
import { connect } from "react-redux";
import { newCartAddress } from "../store/cart";

export class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.newCartAddress({
      userId: this.props.auth.id,
      address: this.state.address,
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
    const { cart, isLoggedIn } = this.props;

    return (
      <form className="form" onSubmit={handleSubmit}>
        {isLoggedIn ? (
          <div>
            <label>
              <input type="checkbox" name="address" />
              Use Address on File
            </label>
            <p>{cart.address}</p>
            <label> Use Different Address:</label>
            <input
              type="text"
              name="address"
              required
              value={this.state.address}
              onChange={handleChange}
            />
            <button className="addAddress" type="submit">
              Submit
            </button>
            {this.state.error != "" && <p>{this.state.error}</p>}
          </div>
        ) : (
          <div>
            <label> Add Address: </label>
            <input
              type="text"
              name="address"
              required
              value={this.state.address}
              onChange={handleChange}
            />
            <button className="addAddress" type="submit">
              Submit
            </button>
            {this.state.error != "" && <p>{this.state.error}</p>}
          </div>
        )}
      </form>
    );
  }
}

const mapState = (state) => ({
  auth: state.auth,
  cart: state.cart,
  isLoggedIn: !!state.auth.id,
});

const mapDispatch = (dispatch) => ({
  updateAddress: (newInfo) => dispatch(newCartAddress(newInfo)),
});

export default connect(mapState, mapDispatch)(AddressForm);
