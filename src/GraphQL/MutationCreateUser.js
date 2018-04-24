import gql from "graphql-tag";

export default gql(`
mutation($id: ID! $name: String! $accessCode: String! $userId: String!) {
  createUser(input:
    {
      id: $id
      name: $name
      accessCode: $accessCode
      userId: $userId
    }
  ) {
    id
    name
    accessCode
    userId
  }
}`);
