import { gql } from '@apollo/client';

// Mutation to add a new user
export const ADD_USER = gql`
  mutation addUser($input: AddUserInput!) {
    addUser(input: $input) {
      token
      user {
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
  }
`;

// Mutation to log in a user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
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
  }
`;

// Mutation to save a book for the logged-in user
export const SAVE_BOOK = gql`
  mutation saveBook($bookId: String!, $authors: [String!]!, $description: String!, $title: String!, $image: String!, $link: String!) {
    saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image, link: $link) {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;

// Mutation to remove a book for the logged-in user
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      bookId
    }
  }
`;
