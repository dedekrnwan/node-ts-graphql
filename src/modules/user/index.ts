import { gql } from 'apollo-server-express';

interface IUser {
    id: number,
    name: string,
    email: string
}

const typeDefs = gql`
    extend type Query {
        user(id: ID!): User
        users: [User]
    }

    type User {
        id: ID!,
        name: String!,
        email: String!
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
    }
}

export default {
    typeDefs,
    resolvers, 
    // IUser
}