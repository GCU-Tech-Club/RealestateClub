import { Router } from 'express';
import userCreate from './userCreate';
import userDelete from './userDelete';
import userUpdate from './userUpdate';
import userRead from './userFetch';

const router = Router();

router.use('/user', userCreate);
router.use('/user', userDelete);
router.use('/user', userUpdate);
router.use('/user', userRead);


export default router;