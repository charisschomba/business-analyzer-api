import { Router } from 'express';
import {crateUser, loginUser} from '../middlewares/auth';

const router = Router();

router.post('/signup', crateUser);
router.post('/signin', loginUser)

export default router;

