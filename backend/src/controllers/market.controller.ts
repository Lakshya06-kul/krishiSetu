import { Request, Response } from 'express';
import { findNearestMarkets } from '../utils/gis';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getNearbyMarkets = async (req: Request, res: Response): Promise<any> => {
  try {
    const { lat, lng, radius } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ success: false, error: { message: 'Missing lat or lng' } });
    }

    const radiusKm = radius ? parseFloat(radius as string) : 50;
    
    const markets = await findNearestMarkets(parseFloat(lat as string), parseFloat(lng as string), radiusKm);
    
    return res.json({ success: true, data: markets });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { message: error.message } });
  }
};

export const getMarketPrices = async (req: Request, res: Response): Promise<any> => {
  try {
    const { marketId } = req.query;
    
    const whereClause = marketId ? { market_id: marketId as string } : {};
    
    const prices = await prisma.marketPrice.findMany({
      where: whereClause,
      orderBy: { recorded_date: 'desc' },
      take: 50,
    });
    
    return res.json({ success: true, data: prices });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { message: error.message } });
  }
};
