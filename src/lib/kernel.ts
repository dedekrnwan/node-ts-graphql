import express from 'express';
import * as Middlewares from './middlewares';
import apollo from "./apollo";

const middlewares = (apps: express.Application): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
	try {
		apps = await Middlewares.before(apps);
		apps = await apollo(apps)
		resolve(apps);
	} catch (error) {
		reject(error);
	}
});

export default async (app: express.Application): Promise<express.Application> => new Promise<express.Application>(async (resolve, reject) => {
	try {
		app = await middlewares(app);
		resolve(app);
	} catch (error) {
		reject(error);
		process.exit(1);
	}
});
