import { Request, Response, NextFunction } from 'express';
import { admin } from '../../../..';


export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authToken = req.headers.authorization;
        if (!authToken || !authToken.startsWith('Bearer ')) {
            res.status(401).send ({"error": "Unauthorized in middleware"});
            return;
        }
        const idToken = authToken.split('Bearer ')[1];
    
        if (process.env.PRODUCTION_MODE === 'true') {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            req.body = decodedToken;
        }
        else {
            req.body = {
                uid: idToken
            };
        }
        next();

    } catch (error) {
        res.status(401).send({"auth error": error});
        return;
    }
}


export default authMiddleware;