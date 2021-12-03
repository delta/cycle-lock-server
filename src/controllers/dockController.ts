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
    res.send(
      '<html><head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"><div class="alert alert-success" role="alert" style="text-align:center;">Regsitration of Dock was successful!</div><a href="/register/dock">Return back</a></head></html>'
    );
    return res.status(200);
  } catch (error) {
    return res.status(500).json({ message: 'Stand ID is incorrect' });
  }
};
