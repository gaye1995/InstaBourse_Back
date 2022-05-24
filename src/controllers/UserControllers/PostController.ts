import { Request, Response } from 'express';
import * as jwt from '../../middlewares/checkJwt';
import { Post } from '../../Model/PostModel';
import { User } from '../../Model/UserModel';


export class PostController {

    static post = async (req: Request, res: Response) => {
      
        try {
            const authorization: any = req.headers.authorization;
            const token = await jwt.getToken(authorization);
            const dataparams = await jwt.getJwtPayload(token);
            const user: any = await User.findOne({ email: dataparams.email });
            console.log(user)

            const { titre, contenu, commentaire  } = req.body;
            req.body.userId = user._id
            if (!contenu || !titre ) throw {code: 400};
            const postExist:any = await Post.findOne({titre: titre});
            if(postExist) throw {code: 401}
            const post: any = await Post.create(req.body);
            // Envoi de la réponse
            res.status(200).send({ error: false, message: 'votre post a été envoyer avec sucess', post: { titre: post.titre, contenu: post.contenu, commentaire: post.commentaire } });
        } catch (err) {
            if (err.code === 400) res.status(400).send({ error: true, message: 'Données manquants ' });
            if (err.code === 401) res.status(400).send({ error: true, message: 'Ce post a été déjas publié' });

            else { console.log('erreur'); }
        }
    } 

}