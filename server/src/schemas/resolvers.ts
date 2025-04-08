import { User, Book } from '../models/index.js';
import { signToken, authenticateToken } from '../services/auth.js';

interface AddUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
    }
}

interface LoginArgs {
    email: string;
    password: string;
}

interface SaveBook {
    bookId: string;
    authors: string[];
    description: string;
    title: string;
    image: string;
    link: string;
}

interface RemoveBookArgs {
    bookId: string;
}

// interface AddBookArgs {
//     bookId: string;
//     authors: string[];
//     description: string;
//     title: string;
//     image: string;
//     link: string;
// }

import { IResolvers } from '@graphql-tools/utils';

const resolvers: IResolvers = {
    Query: {
        user: async (args: { username: string }) => {
            const user = await User.findOne({ username: args.username }).populate('savedBooks');
            return user;
        }
    },

    Mutation: {
        addUser: async ({ input }: AddUserArgs) => {
            try {
                const user = await User.create(input);
                const token = signToken(user.username, user.email, user._id);
                return { token, user };
            } catch (error) {
                throw new Error('Error creating user: ')
            }
        },
        login: async ({ email, password }: LoginArgs): Promise<any> => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('No user found with this email address');
                }
                const isCorrectPassword = await user.isCorrectPassword(password);
                if (!isCorrectPassword) {
                    throw new Error('Incorrect password');
                }
                const token = signToken(user.username, user.email, user._id);
                return { token, user };
            } catch (error) {
                throw new Error('Error logging in: ')
            }
        },
        saveBook: async (args: SaveBook, context: any) => {
            if (!context.user) {
                throw new Error('You need to be logged in to save a book');
            }
            const { bookId, authors, description, title, image, link } = args;
            try {
                const book = await Book.create({ bookId, authors, description, title, image, link });
                return book;
            } catch (error) {
                throw new Error('Error saving book: ')
            }
        },
        removeBook: async ({ bookId }: RemoveBookArgs, context: any) => {
            if (!context.user) {
                throw new Error('You need to be logged in to remove a book');
            }
            try {
                const book = await Book.findByIdAndDelete(bookId);
                return book;
            } catch (error) {
                throw new Error('Error removing book: ');
            }
        },
    },
};

const authMiddleware = async (context: any, next: Function) => {
    const token = context.req.headers.authorization || '';
    if (token) {
        try {
            const user = await authenticateToken(token);
            context.user = user;
        } catch (error) {
            throw new Error('Authentication failed: ');
        }
    }
    return next();
};

export { resolvers, authMiddleware };
