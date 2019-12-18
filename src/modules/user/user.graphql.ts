import { gql, ApolloError } from 'apollo-server-express';
import UserService from "./user.service";
import { IUser } from "./user.service";
import User from './user.model';

const typeDefs = gql`

    scalar Date

    type Query {
        user(id: ID!): User
        users: [User]
    }

    type Mutation {
        createUser(args: IUser): User 
    }

    input IUser {
        name: String!
        username: String!
        email: String!
        password: String!
        birthdate: Date!
        phone: String!
        telephone: String
        facebookId: Int
        googleId: Int
        githubId: Int
        linkedinId: Int
        twitterId: Int
    }

    type User {
        id: ID
        name: String!
        username: String!
        email: String!
        password: String!
        birthdate: Date!
        phone: String!
        telephone: String
        facebookId: Int
        googleId: Int
        githubId: Int
        linkedinId: Int
        twitterId: Int
    }
`

const resolvers = {
    Query: {
        user: async (_:void, { id } : { id: number }, context ) => {
            try {
                const user = await User.findOne({
                    where: {
                        id
                    }
                })
                return user || new ApolloError(`User with id ${id} not found`)
            } catch (error) {
                throw new ApolloError(error)
            }
        },
        users: async (_:void) => {
            try {
                const users = await User.findAll()
                return users || new ApolloError(`No user data in database`)
            } catch (error) {
                throw new ApolloError(error)
            }
        },
    },
    Mutation: {
        createUser: async (_:void, { args } : { args : IUser}) => {
            try {
                const userService = new UserService
                const user = await userService.create(args)
                return user
            } catch (e) {
                throw new ApolloError(e)
            }
        }
    }
}

export default {
    typeDefs,
    resolvers, 
}