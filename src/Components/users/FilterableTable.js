import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./Table";
import SearchBar from "../SearchBar";

export default class FilterableTable extends React.Component {
  constructor(props) {
    super(props);
    // FilterableContactTable is the owner of the state as the filterText is needed in both nodes (searchbar and table) that are below in the hierarchy tree.
    this.state = {
      filterText: ''
    };
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    //Call to setState to update the UI
    this.setState({
      filterText: filterText
    });
    //React knows the state has changed, and calls render() method again to learn what should be on the screen
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        Click <Link to={`/user/new`}>here</Link> to create new User.
        <SearchBar filterText={this.state.filterText} onFilterTextInput={this.handleFilterTextInput}/>
        <Table users={this.props.users} filterText={this.state.filterText}/>
      </div>
    );
  }
}
