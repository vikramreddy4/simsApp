import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <div className="ui container">
        <Link to={`/`}>Home</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to={`/users`}>Employees</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to={`/products`}>Products</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to={`/customers`}>Customers</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
      </div>
      /*
      <Link to={`/events`}>Events</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to={`/stock`}>Inventory</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to={`/newEvent`}>New Event</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to={`/contacts`}>Contacts</Link>
      */
    );
  }
}
