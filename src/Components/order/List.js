import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import FilterableTable from "./FilterableTable";
import QueryOrders from "../../GraphQL/order/QueryOrders";
import QueryGetCustomer from "../../GraphQL/customer/QueryGetCustomer";

class List extends Component {
    render() {
      const { orders, customer } = this.props;
        return (
          <FilterableTable orders={orders} customer={customer}/>
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
    ),
    graphql(
        QueryGetCustomer,
        {
            options: ({ match: { params: { customerId } } }) => ({
                variables: { id:customerId },
                fetchPolicy: 'cache-and-network',
            }),
            props: ({ data: { getCustomer: customer, loading} }) => ({
                customer,
                loading,
            }),
        }
    )
)(List);
