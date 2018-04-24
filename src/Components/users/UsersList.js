import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import FilterableUserTable from "./FilterableUserTable";
import QueryAllUsers from "../../GraphQL/QueryAllUsers";
/*
var USERS = [
  {name: 'Tom Jackson1', accessCode: '555-44-333', active:"Y", userId: 'tom1@gmail.com'},
  {name: 'Tom Jackson2', accessCode: '555-4-333', active:"Y", userId: 'tom2@gmail.com'},
  {name: 'Tom Jackson3', accessCode: '555-333', active:"N", userId: 'tom21@gmail.com'},
  {name: 'Tom Jackson4', accessCode: '555-33', active:"Y", userId: 'tom3@gmail.com'},
  {name: 'Tom Jackson5', accessCode: '555-', active:"N", userId: 'tom4@gmail.com'},
];
*/

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
