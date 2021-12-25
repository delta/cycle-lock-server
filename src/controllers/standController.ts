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
      const code = 409;
      const file = 'stand';
      res.render('components/response.ejs', { code: code, file: file });
      return res.status(409);
    }
    await prisma.cycleStand.create({
      data: {
        Location: Location
      }
    });
    // res.render('components/success.ejs');
    const code = 200;
    res.render('components/response.ejs', { code: code });
    return res.status(200);
  } catch (error) {
    const code = 500;
    res.render('components/response.ejs', { code: code });
    return res.status(500);
  }
};
