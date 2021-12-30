import prisma from '../../config/prismaClient';
import { Request, Response } from 'express';

export const userInfo = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  const user = req.body;
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        RollNo: user.RollNo
      },
      select: {
        Name: true,
        UsageHistory: {
          select: {
            StartTime: true,
            StartDock: true,
            EndTime: true,
            EndDock: true
          }
        }
      }
    });
    return res.status(200).json(userInfo);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
