import gql from "graphql-tag";

export default gql(`
query($id: ID!) {
  getOrder(id: $id) {
    id
    customerId
    services
    cost
    discount
    partnerId
    when
  }
}`);
