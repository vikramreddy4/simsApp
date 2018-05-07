import gql from "graphql-tag";

export default gql(`
mutation($id: ID! $name: String $active: Boolean $phone: String $email: String) {
  updateCustomer(input:
    {
      id: $id
      name: $name
      active: $active
      phone: $phone
      email: $email
    }
  ) {
    id
    name
    active
    phone
    email
  }
}`);
