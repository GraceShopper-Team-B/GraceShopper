import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { addItem } from "../store/cartItem";
import { Link } from "react-router-dom";

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
    // console.log("order", order);
    const product = this.props.singleProduct;
    // console.log("this.props", this.props.singleProduct.id);

    let admin;
    if (this.props.auth.isAdmin) {
      admin = true;
    } else {
      admin = false;
    }

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
        <div>
          {admin && (
            <Link to={`/products/${product.id}/update`}>
              <button type="button">Update Product</button>
            </Link>
          )}
        </div>
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
