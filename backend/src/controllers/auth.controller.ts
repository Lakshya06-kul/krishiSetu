import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const verifyOTP = async (req: Request, res: Response): Promise<any> => {
  const { phone, otp, fullName, language, role } = req.body;

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms',
    });

    if (error || !data.user) {
      return res.status(400).json({ success: false, error: { message: 'Invalid OTP' } });
    }

    const supabaseId = data.user.id;

    let user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      let mappedRole: Role = 'Farmer';
      if (role === 'Buyer') mappedRole = 'Buyer';
      if (role === 'FPO') mappedRole = 'FPO';

      user = await prisma.user.create({
        data: {
          supabase_id: supabaseId,
          phone,
          full_name: fullName || 'New User',
          language: language || 'hi',
          role: mappedRole,
        },
      });
    }

    return res.json({
      success: true,
      data: { user, session: data.session },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { message: err.message } });
  }
};

export const getMe = async (req: any, res: Response): Promise<any> => {
  try {
    const supabaseId = req.user.sub;
    
    const user = await prisma.user.findUnique({
      where: { supabase_id: supabaseId },
    });

    if (!user) {
       return res.status(404).json({ success: false, error: { message: 'User not found' } });
    }

    return res.json({ success: true, data: user });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { message: err.message } });
  }
};
