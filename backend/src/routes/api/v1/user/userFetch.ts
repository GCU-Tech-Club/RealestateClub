import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send("User has been fetched.")
})

export default router;