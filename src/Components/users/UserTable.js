import React from "react";
import UserRow from "./UserRow";
export default class UserTable extends React.Component {
  render() {
    var rows = [];
    this.props.users.forEach((user) => {
      if (user.name.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<UserRow user={user} />);
    });
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Access code</th>
            <th>Active</th>
            <th>UserId</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
