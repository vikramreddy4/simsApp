import gql from "graphql-tag";

export default gql(`
mutation($id: ID! $name: String $accessCode: String $userId: String $active: Boolean) {
  updateUser(input:
    {
      id: $id
      name: $name
      accessCode: $accessCode
      userId: $userId
      active: $active
    }
  ) {
    id
    name
    accessCode
    userId
    active
  }
}`);
