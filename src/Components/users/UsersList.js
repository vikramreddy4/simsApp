import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import FilterableUserTable from "./FilterableUserTable";
import QueryAllUsers from "../../GraphQL/QueryAllUsers";

class UsersList extends Component {
    render() {
      const { users } = this.props;
        return (
          <FilterableUserTable users={users} />
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
)(UsersList);
