import { Router } from 'express';
import userCreate from './userCreate';
import userDelete from './userDelete';
import userUpdate from './userUpdate';
import userFetch from './userFetch';

const router = Router();

router.use('/', userCreate);
router.use('/', userDelete);
router.use('/', userUpdate);
router.use('/', userFetch);


export default router;