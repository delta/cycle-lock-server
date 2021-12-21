import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import prisma from '../config/prismaClient';
import { generateRefrenceId } from '../utils/utils';

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
  let ReferenceId = generateRefrenceId();
  const { StandId } = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const exists = await prisma.cycleDock.findFirst({
    where: {
      ReferenceId: ReferenceId
    },
    select: {
      ReferenceId: true
    }
  });
  if (exists?.ReferenceId && exists.ReferenceId) {
    ReferenceId = generateRefrenceId();
  }

  try {
    await prisma.cycleDock.create({
      data: {
        // Bluetooth: uuid,
        ReferenceId: ReferenceId,
        StandId: StandId
      }
    });
    res.render('components/success.ejs');
    return res.status(200);
  } catch (error) {
    res.render('components/dockError.ejs');
    return res.status(409);
  }
};
