import { User, Book } from '../models/User';
import { signtoken, Authentication } from '../services/auth';

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

interface SaveBookArgs {
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

interface AddBookArgs {
    bookId: string;
    authors: string[];
    description: string;
    title: string;
    image: string;
    link: string;
}

const resolvers = {
    Query: {
        user: async (parent: any, args: { username: string }) => {
            const user = await User.findOne({ username: args.username }).populate('savedBooks');
            return user;
        }
    },
}

const Mutation = {
    addUser: async (parent: any, { input }: AddUserArgs) => {
        const user = await User.create(input);
        const token = signtoken({ username: user.username, email: user.email });
        return { token, user };
    },
    login: async (parent: any, { email, password }: LoginArgs) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('No user found with this email address');
        }
        const isCorrectPassword = await user.isCorrectPassword(password);
        if (!isCorrectPassword) {
            throw new Error('Incorrect password');
        }
        const token = signtoken({ username: user.username, email: user.email });
        return { token, user };
    },
    saveBook: async (parent: any, { bookId, authors, description, title, image, link }: SaveBookArgs) => {
        const book = await Book.create({ bookId, authors, description, title, image, link });
        return book;
    },
    removeBook: async (parent: any, { bookId }: RemoveBookArgs) => {
        const book = await Book.findByIdAndDelete(bookId);
        return book;
    },
};
const authMiddleware = async (parent: any, args: any, context: any) => {
    const token = context.req.headers.authorization || '';
    if (token) {
        const user = await Authentication(token);
        context.user = user;
    }
    return next();
}
