import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

export default class Row extends React.Component {
  render() {
    return (
      <tr>
        <td><Link to={`/order/${this.props.order.customerId}/${this.props.order.id}`}>{this.props.order.services}</Link></td>
        <td>{this.props.order.cost}</td>
        <td>{JSON.stringify(this.props.order.discount)}</td>
      <td>{moment(this.props.order.when).format('LL')}&nbsp;{moment(this.props.order.when).format('LT')}</td>
      </tr>
    );
  }
}
