import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { addItem } from "../store/cartItem";

class SingleProduct extends React.Component {
  componentDidMount() {
    try {
      this.props.loadSingleProduct(this.props.match.params.id);
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    const orders = this.props.auth.orders || {};
    const order = orders[0] || [];
    const orderId = order.id;
    console.log("order", order);
    const product = this.props.singleProduct;
    // console.log("What's product", product);
    return (
      <div>
        <h1>{product.name}</h1>
        <img width="300" src={product.image} />
        <p>{product.description}</p>
        <h3>${product.price}</h3>

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
    );
  }
}
const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addItem: (newCartItem) => dispatch(addItem(newCartItem)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
