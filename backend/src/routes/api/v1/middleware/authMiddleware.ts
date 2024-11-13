import { Router, Request, Response, NextFunction } from 'express';
import { admin, firestore } from '../../../..';
import { getParsedCommandLineOfConfigFile } from 'typescript';

//const router = Router();


export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authToken = req.headers.authorization;
        if (!authToken || !authToken.startsWith('Bearer ')) {
            res.status(401).send ({"error": "Unauthorized in middleware"});
            return;
        }
        const idToken = authToken.split('Bearer ')[1];
        console.log("header split");
        console.log(idToken);
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            console.log("token decoded");
        }
        catch (error) {
            console.log("middleware error");
            console.log(error);
        }
        
        //decodedToken = decodedToken.uid;  //If wanting to only send back the uid

        req.body = req.body || {};
        //req.body.token = decodedToken;

        next();
        return;
    } catch (error) {
        res.status(401).send({"error middleware": error});
        return;
    }
}


export default authMiddleware;