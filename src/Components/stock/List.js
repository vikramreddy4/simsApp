import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import FilterableTable from "./FilterableTable";
import QueryStocks from "../../GraphQL/stock/QueryStocks";
import QueryGetProduct from "../../GraphQL/product/QueryGetProduct";

class List extends Component {
    render() {
      const { stocks, product } = this.props;
        return (
          <FilterableTable stocks={stocks} product={product}/>
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
    ),
    graphql(
        QueryGetProduct,
        {
            options: ({ match: { params: { productId } } }) => ({
                variables: { id: productId },
                fetchPolicy: 'cache-and-network',
            }),
            props: ({ data: { getProduct: product, loading} }) => ({
                product,
                loading,
            }),
        }
    )
)(List);
