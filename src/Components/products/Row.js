import React from "react";
import { Link } from "react-router-dom";

export default class Row extends React.Component {
  render() {
    return (
      <tr>
        <td><Link to={`/product/${this.props.product.id}`}>{this.props.product.name}</Link></td>
        <td>{JSON.stringify(this.props.product.active)}</td>
        <td>
            <Link to={`/stocks/${this.props.product.id}`}>{this.props.product.quantity}</Link>
            &nbsp;
            {this.props.product.units}
            &nbsp;
            &nbsp;
            ( <Link to={`/stock/${this.props.product.id}/new`}>Adjust</Link> )
        </td>
      </tr>
    );
  }
}
