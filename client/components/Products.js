import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import { addItem } from "../store/cartItem";
import { fetchCart } from "../store/cart";
import { me } from "../store/auth";

class Products extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    try {
      this.props.me();
      this.props.fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const products = this.props.products;
    const orders = this.props.auth.orders || {};

    const order = orders[0] || [];
    const orderId = order.id;

    const cart = this.props.cart.products || [];

    let admin;
    if (this.props.auth.isAdmin) {
      admin = true;
    } else {
      admin = false;
    }

    return (
      <div id="productsContainer">
        <h1 id="title">Hoppin Tasty Yummies!</h1>
        <div className="container">
          {products.map((product) => {
            return (
              <div key={product.id} className="list">
                <div>
                  <Link to={`/products/${product.id}`} key={product.id}>
                    <h2 className="productName">{product.name} </h2>

                    <img width="300" height="250" src={product.image} />
                  </Link>
                  <h3>$ {product.price}</h3>
                  <div>
                    <button
                      className="button"
                      type="button"
                      onClick={() =>
                        this.props.addItem({
                          productId: product.id,
                        })
                      }
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
                {admin && (
                  <Link to={`/products/${product.id}/update`}>
                    <button className="button" type="button">
                      Update Product
                    </button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    products: state.products,
    cart: state.cart,
    item: state.cartItem,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addItem: (newCartItem) => dispatch(addItem(newCartItem)),
    fetchCart: (userId) => dispatch(fetchCart(userId)),
    me: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Products);
