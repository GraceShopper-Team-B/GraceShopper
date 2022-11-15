import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct, updateProduct } from "../store/singleProduct";

export class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    console.log("props in UpdateProduct", this.props);
    this.state = {
      name: "",
      type: "",
      image: "",
      price: 0,
      description: "",
      quantity: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  // componentDidMount() {
  //   this.props.loadSingleProduct(this.props.match.params.id);
  // }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateProduct({ ...this.state });
    this.setState({
      name: "",
      type: "",
      image: "",
      price: 0,
      description: "",
      quantity: 0,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    // console.log("this.state in UpdateProducts", this.state);
    const { name, type, image, price, description, quantity } = this.state;
    return (
      <div>
        <h2>Update Product Information</h2>
        <form id="update-product" onSubmit={this.handleSubmit}>
          <label> Product Name:</label>
          <input name="name" onChange={this.handleChange} value={name} />
          <label> Product Type:</label>
          <input name="type" onChange={this.handleChange} value={type} />
          <label> Product Image Link:</label>
          <input name="image" onChange={this.handleChange} value={image} />
          <label> Product Price:</label>
          <input name="price" onChange={this.handleChange} value={price} />
          <label> Product Description:</label>
          <input
            name="description"
            onChange={this.handleChange}
            value={description}
          />
          <label> Product Quantity:</label>
          <input
            name="quantity"
            onChange={this.handleChange}
            value={quantity}
          />
        </form>
      </div>
    );
  }
}
const mapState = (state) => ({
  singleProduct: state.singleProduct,
  auth: state.auth,
});

const mapDispatch = (dispatch) => ({
  loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  updateProduct: (newInfo) => dispatch(updateProduct(newInfo)),
});

export default connect(mapState, mapDispatch)(UpdateProduct);
