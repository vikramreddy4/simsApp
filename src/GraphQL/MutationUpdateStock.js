import gql from "graphql-tag";

export default gql(`
mutation($id: ID! $quantity: Float! $description: String $type: String! $reason: String! $when: String $productId: String!) {
  updateStock(input:
    {
      id: $id
      productId: $productId
      description: $description
      quantity: $quantity
      type: $type
  		reason: $reason
      when: $when
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
