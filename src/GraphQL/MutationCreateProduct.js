import gql from "graphql-tag";

export default gql(`
mutation($id: ID! $name: String! $description: String! $units: String! $active: Boolean! $unitPrice: Float!) {
  createProduct(input:
    {
      id: $id
      name: $name
      description: $description
      units: $units
      active: $active
      unitPrice: $unitPrice
    }
  ) {
    id
    name
    description
    units
    active
    unitPrice
  }
}`);
