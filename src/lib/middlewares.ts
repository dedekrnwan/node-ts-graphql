import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from "compression";

import { expressLogger } from '../utils/logger';
// import redisMiddleware from '../middlewares/redis.middleware';

export const before = (app: express.Application): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
	try {
		const middlewares: Function[] = [
			helmet(),
			cors(),
			compression(),
			expressLogger,
		];
		middlewares.forEach(async (middleware: any) => {
			await app.use(middleware);
		});
		resolve(app);
	} catch (error) {
		reject(error);
	}
});

// export const after = (app: express.Application): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
// 	try {
// 		const middlewares: Function[] = [
// 			redisMiddleware.caching,
// 		];
// 		middlewares.forEach(async (middleware: any) => {
// 			await app.use(middleware);
// 		});
// 		resolve(app);
// 	} catch (error) {
// 		reject(error);
// 	}
// });
