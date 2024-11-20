import { Router } from 'express';
import User from '../../../../models/User';
import { firestore } from '../../../..';

const router = Router();

router.post('/', async (req, res) => {

    const userData: User = req.body;
    const userRef = firestore.collection('Users').doc(userData.uid);

    if (userData.uid === undefined) {
        res.status(400).json({
            message: 'User ID is required',

        });
        return;
    }

    if (userData.name === undefined) {
        res.status(400).json({
            message: 'Name is required',
        });
        return;
    }

    if (userData.bio === undefined) {
        res.status(400).json({
            message: 'Bio is required',
        });
        return;
    }

    if (userData.image === undefined) {
        res.status(400).json({
            message: 'Image is required',
        });
        return;
    }

    if (userData.major === undefined) {
        res.status(400).json({
            message: 'Major is required',
        });
        return;
    }

    await userRef.set(userData, { merge: true });
    res.status(201).json({
        message: 'User created successfully',
    });
});

export default router;