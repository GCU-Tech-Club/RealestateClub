import { Router } from 'express';
// import User from '../models/User';
const router = Router();

router.post('/', async (req, res) => {
    // const user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     gradYear: req.body.gradYear,
    // });

    // try{
    //     const newUser = await user.save();
    //     res.status(201).json(newUser);
    // }catch {
    //     res.status(400)
    // }
});

export default router;