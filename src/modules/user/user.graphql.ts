import { gql, ApolloError } from 'apollo-server-express';
import UserService from "./user.service";
import { IUser } from "./user.service";

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
        user(_:void, { id }:any ) {
            return {
                id: id, 
                name: 'testing',
                email: 'teting@aed.com'
            }
        },
        users() {
            return [
                {
                    id: Math.round(Math.random() * 1000000), 
                    name: 'testing',
                    email: 'teting@aed.com'
                },
                {
                    id: Math.round(Math.random() * 1000000), 
                    name: 'testing2',
                    email: 'teting2@aed.com'
                },
            ]
        }
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