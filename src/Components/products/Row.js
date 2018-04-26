import React from "react";
import { Link } from "react-router-dom";

export default class Row extends React.Component {
  render() {
    return (
      <tr>
        <td><Link to={`/product/${this.props.product.id}`}>{this.props.product.name}</Link></td>
        <td>{JSON.stringify(this.props.product.active)}</td>
        <td>{this.props.product.quantity}</td>
        <td>{this.props.product.units}</td>
      </tr>
    );
  }
}
