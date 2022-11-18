import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct, updatingProduct } from "../store/singleProduct";
import { deletingProduct } from "../store/products";

export class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.singleProduct.name,
      type: this.props.singleProduct.type,
      image: this.props.singleProduct.image,
      price: this.props.singleProduct.price,
      description: this.props.singleProduct.description,
      quantity: this.props.singleProduct.quantity,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId);
  }

  handleSubmit(event) {
    event.preventDefault();
    const product = this.props.singleProduct || {};
    this.props.updateProduct({
      id: product.id,
      name: this.state.name,
      type: this.state.type,
      image: this.state.image,
      price: this.state.price,
      description: this.state.description,
      quantity: this.state.quantity,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const product = this.props.singleProduct || {};

    return (
      <div>
        <h2>Update Product Information</h2>
        <form id="update-product" onSubmit={this.handleSubmit}>
          <label> Product Name:</label>
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label> Product Type:</label>
          <input
            name="type"
            value={this.state.type}
            onChange={this.handleChange}
          />
          <label> Product Image Link:</label>
          <input
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
          />
          <label> Product Price:</label>
          <input
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <label> Product Description:</label>
          <input
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <label> Product Quantity:</label>
          <input
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <div></div>
          <button className="updateButton" type="submit">
            Update Product
          </button>
        </form>

        <button
          className="remove"
          type="submit"
          onClick={() => {
            this.props.deleteProduct(product.id);
          }}
        >
          Delete Product
        </button>
      </div>
    );
  }
}
const mapState = (state) => ({
  singleProduct: state.singleProduct,
  // auth: state.auth,
});

const mapDispatch = (dispatch) => ({
  loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  updateProduct: (newInfo) => dispatch(updatingProduct(newInfo)),
  deleteProduct: (product) => dispatch(deletingProduct(product)),
});

export default connect(mapState, mapDispatch)(UpdateProduct);
