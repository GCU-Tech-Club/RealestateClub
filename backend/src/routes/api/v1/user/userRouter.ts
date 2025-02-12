import { Router } from 'express';
import userCreate from './userCreate';
import userDelete from './userDelete';
import userUpdate from './userUpdate';
import userFetch from './userFetch';
import userAttend from './userAttend';
import userAssociate from './userAssociate';
import userUnregister from './userUnregister';

const router = Router();

router.use('/', userCreate);
router.use('/', userDelete);
router.use('/', userUpdate);
router.use('/', userFetch);
router.use('/attend', userAttend);
router.use('/register', userAssociate)
router.use('/register', userUnregister);


export default router;