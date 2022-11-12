import React from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchCart } from "../store/cart";
import { incrementItem, decrementItem, deleteItem } from "../store/cartItem";
// import "bootstrap/dist/css/bootstrap.min.css";

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart(this.props.match.params.userId);
  }

  getTotalPrice(price, quantity) {
    return price * quantity;
  }

  handleIncrement(id) {
    console.log("inside handle increment");
    this.props.incrementItem({ itemId: id });
  }

  handleDecrement(id) {
    console.log("inside handle decrement");
    this.props.decrementItem({ itemId: id });
  }

  handleDelete(id) {
    console.log("inside handle delete");
    this.props.deleteItem({ itemId: id });
  }

  render() {
    console.log("this.props----->", this.props);
    const myCart = this.props.cart || [];
    console.log("myCart", myCart);
    const products = myCart.products || [];
    console.log("products", products);
    return (
      <div>
        <h1> Shopping Cart</h1>

        {products.map((product) => {
          console.log("product", product);
          return (
            <div key={product.id}>
              <Row>
                <Col>{product.name}</Col>
                <Col>
                  <button
                    onClick={this.handleIncrement.bind(
                      this,
                      product.cartItem.id
                    )}
                  >
                    +
                  </button>
                  {product.cartItem.quantity}
                  <button
                    onClick={this.handleDecrement.bind(
                      this,
                      product.cartItem.id
                    )}
                  >
                    -
                  </button>
                </Col>
                <button
                  type="button"
                  onClick={this.handleDelete.bind(this, product.cartItem.id)}
                >
                  remove
                </button>
                <Col>
                  Total
                  {this.getTotalPrice(product.price, product.cartItem.quantity)}
                </Col>
              </Row>
            </div>
          );
        })}
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
    fetchCart: (userId) => dispatch(fetchCart(userId)),
    incrementItem: (newInfo) => dispatch(incrementItem(newInfo)),
    decrementItem: (newInfo) => dispatch(decrementItem(newInfo)),
    deleteItem: (id) => dispatch(deleteItem(id)),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
