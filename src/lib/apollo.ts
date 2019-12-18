import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from "graphql-depth-limit"

import userModules from "../modules/user/user.graphql";

export default (app: express.Application): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
    try {
        const server = new ApolloServer({
            modules: [
                userModules
            ],
            validationRules: [depthLimit(7)],
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