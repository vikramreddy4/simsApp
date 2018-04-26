import gql from "graphql-tag";

export default gql(`
query($id: ID!) {
  getProduct(id: $id) {
    id
    name
    description
    quantity
    units
    active
  }
}`);
