import { Router } from 'express';
import {crateUser, loginUser} from '../middlewares/auth';
import requireAuth from '../middlewares/requireLoggin';

const router = Router();

router.post('/signup', crateUser);
router.post('/signin', loginUser)
router.get('/post', requireAuth, (req, res) => {
    res.json({user: 'dkskskks'})
})

export default router;

