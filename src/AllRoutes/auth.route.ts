import { UserController } from './../controllers/UserControllers/UserController';
import express from 'express';
import { PostController } from '../controllers/UserControllers/PostController';

const routes: express.Application = express();

routes.post('/register', UserController.register);
routes.post('/login', UserController.login);
routes.post('/post', PostController.post);
routes.get('/post/all', PostController.listPost);



export { routes as RouteUser };