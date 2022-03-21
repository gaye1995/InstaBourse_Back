import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../../Model/userModel';
import Datahelpers, { comparePassword, hashPassword } from '../../helpers/Data';
import * as jwt from '../../middlewares/checkJwt';
import bcrypt from 'bcrypt';


export class UserController {

    static register = async (req: Request, res: Response) => {
        try {
            const { name, email, password, confirm } = req.body;
            if (!name || !email || !password ) throw {code: 400};
            if(password != confirm ) throw {code: 407}
            if (!Datahelpers.checkEmail(email)) throw {code: 401};
            // if (Datahelpers.checkPassword(password)) throw { code: 403}
            const userExist: any = await User.findOne({email : email});
            if (userExist) throw {code: 402}
            if (!Datahelpers.checkPassword(password)) throw {code: 404};
            // hashage du mot de passe
            const user: any = await User.create(req.body);
            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'The user has been successfully created', user: { id: user.id, name: user.name, email: user.email } });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'Données manquants ' });
            else if (err.code === 401) res.status(409).send({ error: true, message: 'Votre Email n\'est pas correct' });
            else if (err.code === 402) res.status(409).send({ error: true, message: 'Cette adresse Email exist déjas' });
            else if (err.code === 403) res.status(409).send({ error: true, message: 'Le mot de passe doit comporter au moins 8 caractéres dont au moins un majuscule, un chiffre et un caractére spécial' });
            else if (err.code === 407) res.status(409).send({ error: true, message: 'Mot de passe incorrect' });
        }

    } 
    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw { code: 400 };
            let user: any = await User.findOne({email : email});
            
            console.log(user);
            // email doesn't existe 
            if (!user) throw { code: 402 }
            if(!await comparePassword(password, user.password)){
                throw { code: 404}
            } 
            // user = await jwt.getAuthToken(user);
            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'The user has been successfully connected', user: user });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'Une des données obligatoire est manquant' });
            else if (err.code === 402) res.status(400).send({ error: true, message: 'Votre compte n\'exist pas' });
            else if (err.code === 404) res.status(409).send({ error: true, message: 'Mot de passe erroné' });
            else console.log('erreur');
        }
    }


}