import React from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchCart } from "../store/cart";
import { purchasingCart } from "../store/cart";
// import "bootstrap/dist/css/bootstrap.min.css";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart(this.props.match.params.userId);
  }

  handleClick(orderId) {
    console.log("inside handle increment");
    this.props.purchasingCart({ orderId });
  }

  getTotalPrice(price, quantity) {
    return price * quantity;
  }

  render() {
    console.log("this.props----->", this.props);
    const myCart = this.props.cart || [];
    const address = myCart.address || "";
    const products = myCart.products || [];
    const id = myCart.id || "";

    return (
      <div>
        <h2>Checkout ({products.length} items)</h2>
        <h3>Shipping Address</h3>
        <Col>{address}</Col>
        <h3>Review Items</h3>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <Row>
                <Col>{product.name}</Col>
                <img width="100" src={product.image} />
                <Col> quantity: {product.cartItem.quantity}</Col>
                <Col>
                  price $
                  {this.getTotalPrice(product.price, product.cartItem.quantity)}
                </Col>
              </Row>
            </div>
          );
        })}
        <button type="button"> Edit Cart</button>
        <button onClick={this.handleClick.bind(this, id)}>Place Order</button>
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
    purchasingCart: (orderId) => dispatch(purchasingCart(orderId)),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
