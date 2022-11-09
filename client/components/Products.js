// import { render } from "enzyme";
import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";

class Products extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const products = this.props.products;
    return (
      <div>
        <h1>Hoppin Tasty Yummies!</h1>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <div>
                <h3>{product.name} </h3>
                <h3>{product.price}</h3>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(Products);
