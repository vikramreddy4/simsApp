import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import FilterableTable from "./FilterableTable";
import QueryAllProducts from "../../GraphQL/product/QueryAllProducts";

class List extends Component {
    render() {
      const { products } = this.props;
        return (
          <FilterableTable products={products} />
        );
    }
}

export default compose(
    graphql(
        QueryAllProducts,
        {
            options: {
                fetchPolicy: 'cache-and-network',
            },
            props: ({ data: { listProducts = { items: [] } } }) => ({
                products: listProducts.items
            })
        }
    )
)(List);
