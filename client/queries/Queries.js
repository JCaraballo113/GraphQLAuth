import gql from 'graphql-tag';

export const queryCurrentUser =  gql`
query {
  user {
    id
    email
  }
}
`;