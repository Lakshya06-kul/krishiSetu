import { Router } from 'express';
import { chatWithAI } from '../controllers/ai.controller';

const router = Router();

// Route: POST /api/ai/chat
router.post('/chat', chatWithAI);

export default router;
