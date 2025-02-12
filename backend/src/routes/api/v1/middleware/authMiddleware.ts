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

        req.body = req.body || {};
        
        if (process.env.PRODUCTION_MODE === 'true') {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            if ('uid' in decodedToken && 'name' in decodedToken && 'bio' in decodedToken && 'major' in decodedToken) {
                req.body = decodedToken;
            } else {
                res.status(401).send({"error": "Invalid user data types"});
                return;
            }
        }
        else {
            req.body.uid = idToken;
        }
        next();

    } catch (error) {
        res.status(401).send({"auth error": error});
        return;
    }
}

export default authMiddleware;
