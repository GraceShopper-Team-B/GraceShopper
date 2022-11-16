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

    // this.handleAddToCart = this.handleAddToCart.bind(this);
  }
  async componentDidMount() {
    try {
      this.props.me();
      this.props.fetchProducts();

      // const id = await this.props.au.id;
      // console.log("id", );
      // await this.props.fetchCart(id);
    } catch (error) {
      console.log(error);
    }

    // const id = auth.id;
    // const { auth } = this.props;
    // console.log(auth);
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props !== prevProps) {
  //   }
  // }

  // handleAddToCart(item, id) {
  //   const cartItems = this.props.cart.products || [];
  //   if (cartItems.includes(id)) {
  //     this.props.incrementItem({ itemId: id });
  //   } else {
  //     this.props.addItem(item);
  //   }
  // }

  render() {
    const products = this.props.products;
    const orders = this.props.auth.orders || {};

    const order = orders[0] || [];
    const orderId = order.id;

    const cart = this.props.cart.products || [];
    // console.log("cart", cart);

    // console.log("products", products);
    return (
      <div>
        <h1>Hoppin Tasty Yummies!</h1>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <div>
                <Link to={`/products/${product.id}`} key={product.id}>
                  <h2>{product.name} </h2>

                  <img width="300" src={product.image} />
                </Link>
                <h3>$ {product.price}</h3>
                <div>
                  <button
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
            </div>
          );
        })}
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
    // incrementItem: (id) => dispatch(incrementItem(id)),
    me: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Products);
