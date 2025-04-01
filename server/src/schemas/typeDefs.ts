const typeDefs = `
  type Ussr {
    id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    user(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    saveBook(bookId: ID!, authors: [String], description: String, title: String, image: String, link: String): Book
    removeBook(bookId: ID!): Book
  }
`;

export default typeDefs;
