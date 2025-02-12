import { Router } from 'express';
import userCreate from './userCreate';
import userDelete from './userDelete';
import userUpdate from './userUpdate';
import userFetch from './userFetch';
import userUnregister from './userUnregister';

const router = Router();

router.use('/', userCreate);
router.use('/', userDelete);
router.use('/', userUpdate);
router.use('/', userFetch);
router.use('/', userUnregister);


export default router;