import { gql } from '@apollo/client';

// Query to get the current user's information
export const GET_ME = gql`
  query getMe {
    me {
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

// Query to get a user by username
export const GET_USER_BY_USERNAME = gql`
  query getUserByUsername($username: String!) {
    user(username: $username) {
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;