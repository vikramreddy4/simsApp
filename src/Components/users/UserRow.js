import React from "react";
import { Link } from "react-router-dom";

export default class UserRow extends React.Component {
  render() {
    return (
      <tr>
        <td><Link to={`/user/${this.props.user.id}`}>{this.props.user.name}</Link></td>
        <td>{this.props.user.accessCode}</td>
        <td>{this.props.user.active}</td>
        <td>{this.props.user.userId}</td>
      </tr>
    );
  }
}
