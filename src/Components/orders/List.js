import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import FilterableTable from "./FilterableTable";
import QueryStocks from "../../GraphQL/QueryStocks";

class List extends Component {
    render() {
      const { stocks } = this.props;
        return (
          <FilterableTable stocks={stocks} />
        );
    }
}

export default compose(
    graphql(
        QueryStocks,
        {
          options: ({ match: { params: { productId } } }) => ({
              variables: { productId },
              fetchPolicy: 'cache-and-network',
          }),
          props: ({ data: { queryStocksByProductIdIndex = { items: [] } } }) => ({
              stocks: queryStocksByProductIdIndex.items
          })
        }
    )
)(List);
