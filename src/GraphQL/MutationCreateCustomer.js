import gql from "graphql-tag";

export default gql(`
mutation($id: ID! $name: String! $phone: String! $email: String! $active: Boolean) {
  createCustomer(input:
    {
      id: $id
      name: $name
      phone: $phone
      email: $email
      active: $active
    }
  ) {
    id
    name
    phone
    email
    active
  }
}`);
