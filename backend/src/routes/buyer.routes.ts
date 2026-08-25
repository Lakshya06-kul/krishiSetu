import { Router } from 'express';
import { getMarketplace, createOffer } from '../controllers/buyer.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.get('/marketplace', requireAuth, getMarketplace);
router.post('/offers', requireAuth, createOffer);
// PATCH /offers/:id can be added later

export default router;
