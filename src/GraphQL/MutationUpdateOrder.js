import gql from "graphql-tag";

export default gql(`
mutation($id: ID! $services: String $customerId: String $partnerId: String $discount: Int $cost: Int $when: String) {
  updateOrder(input:
    {
      id: $id
      services: $services
      customerId: $customerId
      partnerId: $partnerId
      discount: $discount
      when: $when
      cost: $cost
    }
  ) {
    id
    services
    customerId
    partnerId
    discount
    when
    cost
  }
}`);
