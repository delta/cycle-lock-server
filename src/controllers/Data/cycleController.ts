import prisma from '../../config/prismaClient';
import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export const validateModel = [
  check('Model')
    .exists()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Model is required')
];

export const registerCycle = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { Model } = req.body;
  try {
    await prisma.cycle.create({
      data: {
        Model: Model
      }
    });
    const msg = 'Cycle registered successfully';
    res.render('components/response.ejs', { msg: msg });
    return res.status(200);
  } catch (error) {
    const msg = 'Internal server error';
    res.render('components/response.ejs', { msg: msg });
    return res.status(500);
  }
};

export const fetchCycle = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  try {
    const CycleData = await prisma.cycle.findMany({
      select: {
        Id: true,
        Model: true,
        UsageHistory: true
      }
    });
    return res.status(200).render('fetchCycle', {
      cycle: CycleData
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const fetchStand = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  try {
    const StandData = await prisma.cycleStand.findMany({
      select: {
        Id: true,
        Location: true,
        CycleDock: true
      }
    });
    return res.status(200).render('fetchStand', {
      stand: StandData
    });
  } catch (error) {
    return res.status(500).json({ message: 'Interal server error' });
  }
};

export const fetchDock = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  try {
    const DockData = await prisma.cycleDock.findMany({
      select: {
        Bluetooth: true,
        ReferenceId: true,
        StandId: true,
        EntryCycle: true,
        ExitCycle: true
      }
    });
    return res.status(200).render('fetchDock', { dock: DockData });
  } catch (error) {
    return res.status(500).json({ message: 'Interal server error' });
  }
};
