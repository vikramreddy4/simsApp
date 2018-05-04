import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import FilterableTable from "./FilterableTable";
import QueryAllCustomers from "../../GraphQL/QueryAllCustomers";

class List extends Component {
    render() {
      const { customers } = this.props;
        return (
          <FilterableTable customers={customers} />
        );
    }
}

export default compose(
    graphql(
        QueryAllCustomers,
        {
            options: {
                fetchPolicy: 'cache-and-network',
            },
            props: ({ data: { listCustomers = { items: [] } } }) => ({
                customers: listCustomers.items
            })
        }
    )
)(List);
