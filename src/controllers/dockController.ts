import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import prisma from '../config/prismaClient';

export const validateStandId = [
  check('StandId')
    .exists()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Stand ID is required')
];

export const registerDock = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  const errors = validationResult(req);
  const { StandId } = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const exists = await prisma.cycleStand.findFirst({
    where: {
      Id: StandId
    },
    select: {
      Id: true
    }
  });
  if (!exists?.Id || !exists.Id) {
    const code = 409;
    const file = 'dock';
    res.render('components/response.ejs', { code: code, file: file });
    return res.status(409);
  }

  try {
    await prisma.cycleDock.create({
      data: {
        StandId: StandId
      }
    });
    const code = 200;
    res.render('components/response.ejs', { code: code });
    return res.status(200);
  } catch (error) {
    const code = 409;
    res.render('components/response.ejs', { code: code });
    return res.status(409);
  }
};
