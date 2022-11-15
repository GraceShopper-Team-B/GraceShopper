import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchCart } from "../store/cart";
import { purchasingCart } from "../store/cart";
import AddressForm from "./AddressForm";
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
  //   componentDidUpdate(prevProps) {
  //     if (this.props.cart !== prevProps.cart) {
  //       this.props.fetchCart(this.props.match.parms.userId);
  //     }
  //   }
  handleClick(orderId) {
    const userId = this.props.match.params.userId;
    this.props.purchasingCart({ orderId, userId });
  }

  getTotalPrice(price, quantity) {
    const newTotal = price * quantity;
    return newTotal;
  }

  render() {
    const userId = this.props.match.params.userId;
    const myCart = this.props.cart || [];
    const address = myCart.address || "";
    const products = myCart.products || [];
    const id = myCart.id || "";

    const totalOfCart = () => {
      let totalofAll = 0;
      products.map((item) => {
        totalofAll += item.price * item.cartItem.quantity;
        return totalofAll;
      });
      return totalofAll;
    };

    return (
      <div>
        <h2>Checkout ({products.length} items)</h2>
        <h3>Shipping Address</h3>
        <AddressForm />
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
        <h3>Total Price: $ {totalOfCart()}</h3>
        <Link to={`/cart/${userId}`}>
          <button type="button"> Edit Cart</button>
        </Link>
        <Link to="/purchaseConfirmation">
          <button onClick={this.handleClick.bind(this, id)}>Place Order</button>
        </Link>
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
