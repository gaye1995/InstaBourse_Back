import { UserController } from './../controllers/UserControllers/UserController';
import express from 'express';

const routes: express.Application = express();

routes.post('/register', UserController.register);
routes.post('/login', UserController.login);


export { routes as RouteUser };