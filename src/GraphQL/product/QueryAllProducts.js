import gql from "graphql-tag";

export default gql(`
query {
  listProducts {
    items {
      id
      description
      name
      quantity
      active
      units
      unitPrice
    }
  }
}`);
