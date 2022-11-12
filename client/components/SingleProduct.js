import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";

class SingleProduct extends React.Component {
  componentDidMount() {
    try {
      this.props.loadSingleProduct(this.props.match.params.id);
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    const product = this.props.singleProduct;
    console.log("What's product", product);
    return (
      <div>
        <h1>{product.name}</h1>
        <img width="300" src={product.image} />
        <p>{product.description}</p>
        <h3>${product.price}</h3>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
