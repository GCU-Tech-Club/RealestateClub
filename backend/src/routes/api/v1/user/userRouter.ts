import { Router } from 'express';
import userCreate from './userCreate';
import userDelete from './userDelete';
import userUpdate from './userUpdate';
import userRead from './userFetch';
import getAllUsers from './getAllUsers';

const router = Router();

router.use('/', userCreate);
router.use('/', userDelete);
router.use('/', userUpdate);
router.use('/', userRead);
router.use('/all', getAllUsers);


export default router;