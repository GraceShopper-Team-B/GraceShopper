import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct, updateProduct } from "../store/singleProduct";

export class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    console.log("props in UpdateProduct", this.props);
    this.state = {
      name: this.props.product.name,
      type: this.props.product.type,
      image: this.props.product.image,
      price: this.props.product.price,
      description: this.props.product.description,
      quantity: this.props.product.quantity,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      this.setState({
        name: this.props.product.name || "",
        type: this.props.product.type || "",
        image: this.props.product.image || "",
        price: this.props.product.price || 0,
        description: this.props.product.description || "",
        quantity: this.props.product.quantity || 0,
      });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const product = this.props.singleProduct;
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
    // console.log("this.state in UpdateProducts", this.state);
    // const { name, type, image, price, description, quantity } = this.state;

    const product = this.props.singleProduct || {};
    console.log("What's product", this.props);
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
        </form>
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
  updateProduct: (newInfo) => dispatch(updateProduct(newInfo)),
});

export default connect(mapState, mapDispatch)(UpdateProduct);
