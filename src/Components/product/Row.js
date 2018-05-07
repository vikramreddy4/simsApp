import React from "react";
import { Link } from "react-router-dom";

export default class Row extends React.Component {
  render() {
    return (
      <tr>
        <td><Link to={`/product/${this.props.product.id}`}>{this.props.product.name}</Link></td>
        <td>{this.props.product.description}</td>
        <td>{JSON.stringify(this.props.product.active)}</td>
        <td>
            {this.props.product.quantity}
            &nbsp;
            {this.props.product.units}
        </td>
        <td>{this.props.product.unitPrice}</td>
        <td>
            <Link to={`/stocks/${this.props.product.id}`}>View</Link>
            &nbsp;|&nbsp;
            <Link to={`/stock/${this.props.product.id}/new`}>New</Link>
        </td>
      </tr>
    );
  }
}
