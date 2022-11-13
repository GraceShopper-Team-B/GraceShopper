import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import { fetchCart } from "../store/cart";

class Products extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchProducts();
    // this.props.fetchCart(this.props.auth.id);
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
                <Link to={`/products/${product.id}`} key={product.id}>
                  <h2>{product.name} </h2>
                  <img width="250" src={product.image} />
                </Link>
                <h3>$ {product.price}</h3>
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
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCart: (userId) => dispatch(fetchCart(userId)),
  };
};

export default connect(mapState, mapDispatch)(Products);
