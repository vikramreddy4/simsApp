import React from "react";
import { Link } from "react-router-dom";

export default class Row extends React.Component {
  render() {
    return (
      <tr>
        <td><Link to={`/user/${this.props.user.id}`}>{this.props.user.name}</Link></td>
        <td>{this.props.user.phone}</td>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.accessCode}</td>
        <td>{JSON.stringify(this.props.user.active)}</td>
        <td>{this.props.user.userId}</td>
      </tr>
    );
  }
}
