import gql from "graphql-tag";

export default gql(`
query {
  listCustomers {
    items {
      id
      name
      active
      phone
      email
    }
  }
}`);
