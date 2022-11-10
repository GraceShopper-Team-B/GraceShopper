import React, { Component } from "react";
import { connect } from "react-redux";

import {addToCart} from //gotta make this reducer!!

export class AddToCart extends Component {
  render() {
    return (
      <button onClick={() => this.props.addToCart(this.props.selectedItem)}>
        ADD TO CART
      </button>
    );
  }
}
