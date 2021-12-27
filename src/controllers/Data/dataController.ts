import prisma from '../../config/prismaClient';
import { Request, Response } from 'express';

export const usageHistory = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  try {
    const History = await prisma.usageHistory.findMany({
      select: {
        CycleId: true,
        UserRollNo: true,
        StartDock: true,
        StartTime: true,
        EndDock: true,
        EndTime: true
      }
    });
    return res.status(200).render('fetchUsage', { usage: History });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
