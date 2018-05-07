import gql from "graphql-tag";

export default gql(`
query($customerId: String!) {
  queryOrdersByCustomerIdIndex(customerId: $customerId) {
    items {
      id
      services
      customerId
      partnerId
      discount
      when
      cost
    }
  }
}`);
