import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
// import { AddToCart } from "./AddToCart";

import { addItem } from "../store/cartItem";

// class AddToCart extends React.Component {
//   render() {
//     // console.log("------>", this.props.auth);
//     // const orders = this.props.auth.orders || {};

//     // const order = orders[0] || [];
//     // const orderId = order.id;
//     // console.log("orderId", orderId);

//     return (
//       <div>
//         <button
//           type="button"
//           onClick={() =>
//             this.props.addItem({ productId: product.id, orderId: orderId })
//           }
//         >
//           Add To Cart
//         </button>
//       </div>
//     );
//   }
// }

class Products extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const products = this.props.products;
    console.log(this.props);
    // const { orders } = this.props;
    // const [id] = orders;
    console.log("------>", this.props.auth);
    const orders = this.props.auth.orders || {};

    const order = orders[0] || [];
    const orderId = order.id;

    console.log("orderId", orderId);
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

                <button
                  type="button"
                  onClick={() =>
                    this.props.addItem({
                      productId: product.id,
                      orderId: orderId,
                    })
                  }
                >
                  Add To Cart
                </button>
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
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addItem: (newCartItem) => dispatch(addItem(newCartItem)),
  };
};

export default connect(mapState, mapDispatch)(Products);
