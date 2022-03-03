import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../../Model/userModel';
import Datahelpers from '../../helpers/Data';



export class UserController {

    static register = async (req: Request, res: Response) => {
        try {
            const { name, email, password, confirm } = req.body;
            if (!name || !email || !password ) throw {code: 400};
            if(password != confirm ) throw {code: 407}
            if (!Datahelpers.checkEmail(email)) throw {code: 401};

            const user: any = await User.create(req.body);
            if (user) throw {code: 402}

            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'The user has been successfully created', user: { id: user.id, name: user.name, email: user.email } });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'Données manquants ' });
            else if (err.code === 401) res.status(409).send({ error: true, message: 'Votre Email n\'est pas correct' });
            else if (err.code === 402) res.status(404).send({ error: true, message: 'Cette adresse Email exist déjas' });
            else if (err.code === 407) res.status(409).send({ error: true, message: 'Mot de passe incorrect' });
        }

    } 

}