import gql from "graphql-tag";

export default gql(`
mutation($id: ID! $name: String $accessCode: String $userId: String $active: Boolean $phone: String $email: String $salary: String) {
  updateUser(input:
    {
      id: $id
      name: $name
      accessCode: $accessCode
      userId: $userId
      active: $active
      phone: $phone
      email: $email
      salary: $salary
    }
  ) {
    id
    name
    accessCode
    userId
    active
    phone
    email
    salary
  }
}`);
