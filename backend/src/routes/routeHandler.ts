
import express from 'express';
import v1ApiRouter from './api/v1/apiRouter';
import mainRouter from './mainRouter';

const router = express.Router();

router.use('/api/v1', v1ApiRouter); 
router.use('/', mainRouter); 

export default router;