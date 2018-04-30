import React from "react";
import Row from "./Row";

export default class Table extends React.Component {
  render() {
    var rows = [];
    this.props.users.forEach((user) => {
      if (user.name.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<Row user={user} key={user.id}/>);
    });
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
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
