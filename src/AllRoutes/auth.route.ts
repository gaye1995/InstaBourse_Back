import { UserController } from './../controllers/UserControllers/UserController';
import express from 'express';

const routes: express.Application = express();

routes.post('/register', UserController.register);

export { routes as RouteUser };