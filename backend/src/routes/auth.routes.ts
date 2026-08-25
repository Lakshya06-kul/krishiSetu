import { Router } from 'express';
import { verifyOTP, getMe } from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.post('/verify', verifyOTP);
router.get('/me', requireAuth, getMe);

export default router;
