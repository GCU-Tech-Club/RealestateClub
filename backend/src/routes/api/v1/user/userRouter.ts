import { Router } from 'express';
import userCreate from './userCreate';
import userDelete from './userDelete';
import userUpdate from './userUpdate';
import userFetch from './userFetch';
import userAttend from './userAttend';
import userAssociate from './userAssociate';

const router = Router();

router.use('/', userCreate);
router.use('/', userDelete);
router.use('/', userUpdate);
router.use('/', userFetch);
router.use('/attend', userAttend);
router.use('/', userAssociate)

export default router;