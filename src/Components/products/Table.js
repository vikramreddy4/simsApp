import React from "react";
import Row from "./Row";
export default class Table extends React.Component {
  render() {
    var rows = [];
    this.props.products.forEach((product) => {
      if (product.name.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<Row product={product} />);
    });
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Active</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
