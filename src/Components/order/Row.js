import React from "react";
import { Link } from "react-router-dom";

export default class Row extends React.Component {
  render() {
    return (
      <tr>
        <td><Link to={`/order/${this.props.order.customerId}/${this.props.order.id}`}>{this.props.order.services}</Link></td>
        <td>{this.props.order.cost}</td>
        <td>{JSON.stringify(this.props.order.discount)}</td>
        <td>{this.props.order.when}</td>
      </tr>
    );
  }
}
