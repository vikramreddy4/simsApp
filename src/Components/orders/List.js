import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import FilterableTable from "./FilterableTable";
import QueryOrders from "../../GraphQL/QueryOrders";

class List extends Component {
    render() {
      const { orders } = this.props;
        return (
          <FilterableTable orders={orders} />
        );
    }
}

export default compose(
    graphql(
        QueryOrders,
        {
          options: ({ match: { params: { customerId } } }) => ({
              variables: { customerId },
              fetchPolicy: 'cache-and-network',
          }),
          props: ({ data: { queryOrdersByCustomerIdIndex = { items: [] } } }) => ({
              orders: queryOrdersByCustomerIdIndex.items
          })
        }
    )
)(List);
