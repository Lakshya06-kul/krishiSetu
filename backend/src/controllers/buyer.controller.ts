import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMarketplace = async (req: Request, res: Response): Promise<any> => {
  try {
    const lots = await prisma.produceLot.findMany({
      where: { status: 'ACTIVE' },
      include: {
        farmer: { select: { full_name: true, phone: true } },
      },
    });
    
    return res.json({ success: true, data: lots });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const createOffer = async (req: any, res: Response): Promise<any> => {
  try {
    const supabaseId = req.user.sub;
    const { lotId, offeredPrice, quantity } = req.body;
    
    const user = await prisma.user.findUnique({
      where: { supabase_id: supabaseId },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: { message: 'User not found' } });
    }
    
    const offer = await prisma.buyerOffer.create({
      data: {
        buyer_id: user.id,
        lot_id: lotId,
        offered_price: offeredPrice,
        quantity,
        status: 'PENDING',
      },
    });
    
    return res.json({ success: true, data: offer });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { message: error.message } });
  }
};
