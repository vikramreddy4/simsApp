import gql from "graphql-tag";

export default gql(`
mutation(
  $id: ID! $description: String! $productId: String! $type: String! $when: String $quantity: Float! $reason: String
) {
  createStock(input:
    {
      id: $id
      description: $description
      productId: $productId
      type: $type
      when: $when
      quantity: $quantity
  		reason: $reason
    }
  ) {
    id
    productId
    description
    quantity
    type
    reason
    when
  }
}`);
