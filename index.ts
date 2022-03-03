// Import npm modules
import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express';
import { RouteUser } from './src/AllRoutes/auth.route'
import path from 'path'
import dotenv, { config } from 'dotenv'
config();
require('./database/db');

const port: string | number = process.env.PORT || 3000;

const app: express.Application = express();
app.use(bodyParser.json())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
dotenv.config({ path: path.resolve(__dirname, '.env') });

app.use((error: any, request: Request, response: Response, next: NextFunction) => {
    if (error !== null) {
        return response.status(400).json({ success: false, message: 'Invalid json' });
    }
    return next();
});


// Use all the routes on the express instance
app.use(RouteUser)

// Run serve
app.listen(port , () => console.log("listening on " + process.env.API_URL))
