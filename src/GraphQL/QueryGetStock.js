import gql from "graphql-tag";

export default gql(`
query($id: ID!) {
  getStock(id: $id) {
    id
    productId
    description
    type
    reason
    quantity
    when
  }
}`);
