import { Router } from 'express';
import { getNearbyMarkets, getMarketPrices } from '../controllers/market.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.get('/nearby', requireAuth, getNearbyMarkets);
router.get('/prices', requireAuth, getMarketPrices);
// Forecast routes can be added later

export default router;
