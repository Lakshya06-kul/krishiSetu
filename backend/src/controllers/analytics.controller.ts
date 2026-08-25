import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboard = async (req: any, res: Response): Promise<any> => {
  try {
    const supabaseId = req.user.sub;
    
    const user = await prisma.user.findUnique({
      where: { supabase_id: supabaseId },
      include: {
        ProduceLots: true,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: { message: 'User not found' } });
    }
    
    // Very basic placeholder analytics
    const totalLots = user.ProduceLots.length;
    
    return res.json({ success: true, data: { totalLots } });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { message: error.message } });
  }
};
