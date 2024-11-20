import { Router } from 'express';

const router = Router();

router.put('/', (req, res) => {
    res.send('This is the user update route')
});

export default router;