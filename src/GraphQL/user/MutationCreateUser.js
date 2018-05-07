import gql from "graphql-tag";

export default gql(`
mutation($id: ID! $name: String! $phone: String! $salary: String $email: String! $accessCode: String $userId: String $active: Boolean!) {
  createUser(input:
    {
      id: $id
      name: $name
      phone: $phone
      salary: $salary
      email: $email
      accessCode: $accessCode
      userId: $userId
      active: $active
    }
  ) {
    id
    name
    phone
    salary
    email
    accessCode
    userId
    active
  }
}`);
