import gql from "graphql-tag";

export default gql(`
mutation(
  $id: ID! $customerId: String! $partnerId: String $cost: Int! $when: String! $discount: Int! $services: String!
) {
  createOrder(input:
    {
      id: $id
      customerId: $customerId
      partnerId: $partnerId
      cost: $cost
      when: $when
      discount: $discount
      services: $services
    }
  ) {
    id
    customerId
    partnerId
    cost
    when
    discount
    services
  }
}`);
