import React from "react";
import { Link } from "react-router-dom";

export default class Row extends React.Component {
  render() {
    return (
      <tr>
        <td><Link to={`/customer/${this.props.customer.id}`}>{this.props.customer.name}</Link></td>
        <td>{this.props.customer.phone}</td>
        <td>{this.props.customer.email}</td>
        <td>
            <Link to={`/orders/${this.props.customer.id}`}>View</Link>
            &nbsp;|
            &nbsp;
            &nbsp;
            <Link to={`/order/${this.props.customer.id}/new`}>New</Link>
        </td>
      </tr>
    );
  }
}
