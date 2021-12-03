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
    const exists = await prisma.cycleStand.findFirst({
      where: {
        Location: Location
      },
      select: {
        Id: true
      }
    });
    if (exists?.Id && exists.Id) {
      res.send(
        '<html><head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"><div class="alert alert-danger" role="alert">A stand in this location already exists</div><a href="/register/dock">Return back</a></head></html>'
      );
      return res.status(409);
    }

    const Id = generateStandId();
    await prisma.cycleStand.create({
      data: {
        Location: Location,
        Id: Id
      }
    });
    res.send(
      '<html><head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"><div class="alert alert-success" role="alert" style="text-align:center;">Regsitration of Stand was successful!</div><a href="/register/stand">Return back</a></head></html>'
    );
    return res.status(200);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
