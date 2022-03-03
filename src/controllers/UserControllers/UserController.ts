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

// static login = async (req: Request, res: Response) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) throw { code: 400 };
//         let user: any = await User.findOne({email : email});
//         // email doesn't existe 
//         if (!user) throw { code: 402 }

//         // verifier les tentatives de connexion
//         // const lastLogin = (Date.now() - User.lastLogin) / 1000;

//         // Si l'utilisateur à respecter les deux minutes d'attente on remet sont nombres d'essai à 0
//         // if (User.attempt >= 5 && lastLogin > 300) await ComptableModel.updateOne({ _id: mongoose.Types.ObjectId(User._id)} ,{  $set: { lastLogin: Date.now(), attempt: User.attempt + 1 } });

//         // On vérifie le nombre de connnexion et le temps depuis la dernière connexion
//         // if (User.attempt >= 5 && lastLogin < 300) throw new Error('Too many attempts on this email (5 max) - Please wait (5min)');

//         if(!await comparePassword(password, User.password)){
//             throw { code: 404}
//         } 

//         User = await jwt.getAuthToken(User);
//         const dataUser: any = UserJSON(User);
//         await updateLastLogin(User, true);
//         // Envoi de la réponse
//         res.status(200).send({ error: false, message: 'The user has been successfully connected', user: User });
//     } catch (err) {
//         if (err.code === 400) res.status(400).send({ error: true, message: 'One or more mandatory data is missing' });
//         else if (err.code === 402) res.status(400).send({ error: true, message: 'An account using this email address does not exist' });
//         else if (err.code === 404) res.status(409).send({ error: true, message: 'One of your data is incorrect' });
//         else Datahelpers.errorHandler(res, err);
//     }
//     }
}