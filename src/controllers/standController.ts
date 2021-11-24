import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import prisma from '../config/prismaClient';
import { generateStandId } from '../utils/utils';

export const validateLocation = [
  check('Location')
    .exists()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Location is required')
];

export const registerStand = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // const { Location } = req.body;
  try {
    const { Location } = req.body;
    const Id = generateStandId();
    await prisma.cycleStand.create({
      data: {
        Location: Location,
        Id: Id
      }
    });
    return res
      .status(200)
      .json({ message: 'Registration of the stand is successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
