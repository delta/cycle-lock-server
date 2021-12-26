import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import prisma from '../config/prismaClient';

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

  try {
    const { Location } = req.body;
    const exists = await prisma.cycleStand.findFirst({
      where: {
        Location: Location
      },
      select: {
        Id: true
      }
    });
    if (exists?.Id && exists.Id) {
      const msg = 'A stand already exists in this location';
      res.render('components/response.ejs', { msg: msg });
      return res.status(409);
    }
    await prisma.cycleStand.create({
      data: {
        Location: Location
      }
    });
    const msg = 'Stand registered successfully';
    res.render('components/response.ejs', { msg: msg });
    return res.status(200);
  } catch (error) {
    const msg = 'Internal server error';
    res.render('components/response.ejs', { msg: msg });
    return res.status(500);
  }
};
