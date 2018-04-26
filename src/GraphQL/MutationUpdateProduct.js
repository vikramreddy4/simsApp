import gql from "graphql-tag";

export default gql(`
mutation($id: ID! $name: String $description: String $quantity: Float $units: String $active: Boolean) {
  updateProduct(input:
    {
      id: $id
      name: $name
      description: $description
      active: $active
      quantity: $quantity
  		units: $units
    }
  ) {
    id
    name
    description
    units
    active
    quantity
  }
}`);
