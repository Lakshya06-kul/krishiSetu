import { Router } from 'express';
import { getDashboard } from '../controllers/analytics.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.get('/dashboard', requireAuth, getDashboard);
// Revenue routes can be added later

export default router;
