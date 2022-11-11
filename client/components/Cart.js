// import { store } from "../store";
import React from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchCart } from "../store/cart";
// import "bootstrap/dist/css/bootstrap.min.css";

// let mockCartItems = [
//   {
//     id: 1,
//     name: "Ilana's Banana Muffins",
//     type: "muffin",
//     price: 5,
//     quantity: 4,
//   },
//   {
//     id: 2,
//     name: "Esther's Apple Pie",
//     type: "pie",
//     price: 30,
//     quantity: 1,
//   },
//   {
//     id: 3,
//     name: "Naomi's Peanut Butter Cookies",
//     type: "cookie",
//     price: 3,
//     quantity: 2,
//   },
// ];

class Cart extends React.Component {
  constructor() {
    super();

    // this.getTotalPrice = this.getTotalPrice.bind(this);
    // this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart(this.props.match.params.userId);
  }

  getTotalPrice(price, quantity) {
    return price * quantity;
  }

  removeItem(goAway) {
    return mockCartItems.filter((item) => item !== goAway);
  }

  incrementItem(amount) {
    return amount++;
  }

  decrementItem(amount) {
    return amount--;
  }

  render() {
    console.log("this.props----->", this.props);
    const myCart = this.props.cart[0] || [];
    console.log("myCart", myCart);
    const products = myCart.products || [];
    console.log("products", products);

    return (
      <div>
        <h1> Shopping Cart</h1>

        {products.map((item) => {
          return (
            <div key={item.id}>
              <Row>
                <Col>{item.name}</Col>
                <Col>
                  <button onClick={() => this.incrementItem(item.quantity)}>
                    +
                  </button>
                  {item.quantity}
                  <button onClick={() => this.decrementItem(item.quantity)}>
                    -
                  </button>
                </Col>
                <button type="button" onClick={() => this.removeItem(item)}>
                  remove
                </button>
                <Col>Total{this.getTotalPrice(item.price, item.quantity)}</Col>
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (userId) => dispatch(fetchCart(userId)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
