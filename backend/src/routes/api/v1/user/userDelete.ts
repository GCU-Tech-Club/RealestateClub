import { Router } from 'express';

const router = Router();

router.delete('/', (req, res) => {
    res.send('User delete route');
});



export default router;

