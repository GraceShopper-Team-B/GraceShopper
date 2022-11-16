// import { store } from "../store";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchingCartWithCartId } from "../store/cart";
import { incrementItem, decrementItem, deleteItem } from "../store/cartItem";
// import "bootstrap/dist/css/bootstrap.min.css";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Shopping Cart",
    };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.props.fetchCart();
    }
  }

  getTotalPrice(price, quantity) {
    return price * quantity;
  }

  handleIncrement(id) {
    this.props.incrementItem({ itemId: id });
  }

  handleDecrement(id) {
    this.props.decrementItem({ itemId: id });
  }

  handleDelete(id) {
    this.props.deleteItem(id);
  }

  render() {
    const userId = this.props.match.params.userId;
    const myCart = this.props.cart || [];
    const products = myCart.products || [];

    return (
      <div>
        <h1> {this.state.status} </h1>
        <hr />
        <div className="cart">
          {products.map((product) => {
            return (
              <div key={product.id}>
                <h3>{product.name}</h3>
                <div className="cartList">
                  <img width="100" src={product.image} />
                  <div>
                    <button
                      className="cartButton"
                      onClick={this.handleIncrement.bind(
                        this,
                        product.cartItem.id
                      )}
                    >
                      +
                    </button>
                    {product.cartItem.quantity}
                    <button
                      className="cartButton"
                      onClick={this.handleDecrement.bind(
                        this,
                        product.cartItem.id
                      )}
                    >
                      -
                    </button>
                  </div>
                  <div>
                    <button
                      className="cartButton"
                      type="button"
                      onClick={this.handleDelete.bind(
                        this,
                        product.cartItem.id
                      )}
                    >
                      remove
                    </button>
                  </div>
                </div>
                Total: $
                {this.getTotalPrice(product.price, product.cartItem.quantity)}
                <hr />
              </div>
            );
          })}
          <Link to="/checkout">
            <button type="button">Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    item: state.cartItem,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchingCartWithCartId()),
    incrementItem: (newInfo) => dispatch(incrementItem(newInfo)),
    decrementItem: (newInfo) => dispatch(decrementItem(newInfo)),
    deleteItem: (id) => dispatch(deleteItem(id)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
