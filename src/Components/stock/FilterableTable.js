import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
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
    const { product } = this.props;
    return (
      <div>
        <Header/>
        <h3>Stock details log for Product : {this.props.product && this.props.product.name}</h3>
        <h5>Current quantity is {this.props.product && this.props.product.quantity}&nbsp;{this.props.product && this.props.product.units}</h5>
        <SearchBar filterText={this.state.filterText} onFilterTextInput={this.handleFilterTextInput}/>
        <Table stocks={this.props.stocks} filterText={this.state.filterText}/>
      </div>
    );
  }
}
