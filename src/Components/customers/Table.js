import React from "react";
import Row from "./Row";

export default class Table extends React.Component {
  render() {
    var rows = [];
    this.props.customers.forEach((customer) => {
      if (customer.name.indexOf(this.props.filterText) === -1
          && customer.phone.indexOf(this.props.filterText) === -1
          && customer.email.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<Row customer={customer} key={customer.id}/>);
    });
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
