import React from "react";
import Table from "./Table";
import SearchBar from "../SearchBar";
import Header from '../Header';

export default class FilterableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <h2>Orders for Customer : {this.props.customer && this.props.customer.name}</h2>
        <SearchBar filterText={this.state.filterText} onFilterTextInput={this.handleFilterTextInput}/>
        <Table orders={this.props.orders} filterText={this.state.filterText}/>
      </div>
    );
  }
}
