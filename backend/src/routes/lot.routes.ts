import { Router } from 'express';
import { createLot, getLots } from '../controllers/lot.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getLots);
router.post('/', requireAuth, createLot);
// PATCH and DELETE can be added later

export default router;
