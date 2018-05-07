import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import FilterableTable from "./FilterableTable";
import QueryAllUsers from "../../GraphQL/user/QueryAllUsers";

class List extends Component {
    render() {
      const { users } = this.props;
        return (
          <FilterableTable users={users} />
        );
    }
}

export default compose(
    graphql(
        QueryAllUsers,
        {
            options: {
                fetchPolicy: 'cache-and-network',
            },
            props: ({ data: { listUsers = { items: [] } } }) => ({
                users: listUsers.items
            })
        }
    )
)(List);
