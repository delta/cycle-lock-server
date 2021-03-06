import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import prisma from '../config/prismaClient';

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
