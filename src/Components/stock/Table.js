import React from "react";
import Row from "./Row";

export default class Table extends React.Component {
  render() {
    var rows = [];
    this.props.stocks.forEach((stock) => {
      if (stock.description.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<Row stock={stock} key={stock.id}/>);
    });
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>User</th>
            <th>Type</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
