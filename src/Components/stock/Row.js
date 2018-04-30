import React from "react";
import { Link } from "react-router-dom";

export default class Row extends React.Component {
  render() {
    return (
      <tr>
        <td><Link to={`/stock/${this.props.stock.productId}/${this.props.stock.id}`}>{this.props.stock.description}</Link></td>
        <td>{this.props.stock.quantity}</td>
        <td>{JSON.stringify(this.props.stock.usedId)}</td>
        <td>{this.props.stock.type}</td>
        <td>{this.props.stock.when}</td>
      </tr>
    );
  }
}
