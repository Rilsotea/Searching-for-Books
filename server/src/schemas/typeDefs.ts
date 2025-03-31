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
    }`;

export default typeDefs;
