import gql from "graphql-tag";

export default gql(`
query($id: ID!) {
  getUser(id: $id) {
    id
    name
    accessCode
    userId
  }
}`);
