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
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { StandId } = req.body;

    await prisma.cycleDock.create({
      data: {
        // Bluetooth: uuid,
        StandId: StandId
      }
    });
    res.render('/components/success');
    return res.status(200);
  } catch (error) {
    return res.status(500).json({ message: 'Stand ID is incorrect' });
  }
};
