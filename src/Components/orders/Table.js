import React from "react";
import Row from "./Row";

export default class Table extends React.Component {
  render() {
    var rows = [];
    this.props.orders.forEach((order) => {
      if (order.services.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<Row order={order} key={order.id}/>);
    });
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Services</th>
            <th>Cost</th>
            <th>Discount offered</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
