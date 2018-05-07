import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

export default class Row extends React.Component {
  render() {
    return (
      <tr>
        <td><Link to={`/stock/${this.props.stock.productId}/${this.props.stock.id}`}>{this.props.stock.description}</Link></td>
        <td>{this.props.stock.quantity}</td>
        <td>{JSON.stringify(this.props.stock.usedId)}</td>
        <td>{this.props.stock.type}</td>
        <td>{moment(this.props.stock.when).format('LL')}&nbsp;{moment(this.props.stock.when).format('LT')}</td>
      </tr>
    );
  }
}
