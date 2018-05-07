import gql from "graphql-tag";

export default gql(`
query($id: ID!) {
  getCustomer(id: $id) {
    id
    name
    active
    phone
    email
  }
}`);
