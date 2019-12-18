import * as express from 'express';
import { ApolloServer, ApolloError, AuthenticationError } from 'apollo-server-express';
import depthLimit from "graphql-depth-limit"

import userModules from "../modules/user/user.graphql";
import auth from '../utils/auth';

export default (app: express.Application): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
    try {
        const server = new ApolloServer({
            modules: [
                userModules
            ],
            validationRules: [depthLimit(7)],
            playground: true,
            introspection: true,
            context: async ({
                req
            }) => {
                try {
                    const user = await auth.authenticated(req)
                    if(!user) throw new AuthenticationError('Access denied, Token is invalid')
                    return { user }
                } catch (error) {
                    throw new AuthenticationError(error.message)
                }
            }
        })
        server.applyMiddleware({
            app,
            path: '/graphql'
        })
        resolve(app)
    } catch (error) {
        reject(error)
    }
})