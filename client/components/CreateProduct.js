import React from "react";
import { creatingProduct } from "../store/singleProduct";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { Image } from "react-bootstrap";

class CreateProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      type: "",
      image: "",
      price: 0,
      description: "",
      quantity: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createProduct({
      name: this.state.name,
      type: this.state.type,
      image: this.state.image,
      price: this.state.price,
      description: this.state.description,
      quantity: this.state.quantity,
    });
  }
  render() {
    const { name, type, image, price, description, quantity } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <form id="createProduct-form" onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input name="name" onChange={handleChange} value={name} />

        <label>Type of Treat:</label>
        <input name="type" onChange={handleChange} value={type} />
        <label>Image Link:</label>
        <input name="image" onChange={handleChange} value={image} />
        <label>Price:</label>
        <input name="price" onChange={handleChange} value={price} />
        <label>Description:</label>
        <input name="description" onChange={handleChange} value={description} />
        <label>Quantity:</label>
        <input name="quantity" onChange={handleChange} value={quantity} />

        <button type="submit">Submit</button>
        {/* <Link to="/">Cancel</Link> */}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createProduct: (newProduct) => dispatch(creatingProduct(newProduct)),
});

export default connect(null, mapDispatchToProps)(CreateProduct);
