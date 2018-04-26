import gql from "graphql-tag";

export default gql(`
query {
  listProducts {
    items {
      id
      name
      quantity
      active
      units
    }
  }
}`);
