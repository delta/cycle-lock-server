import express, { Router, Request, Response } from 'express';
const router: Router = express.Router();
import {
  validateLocation,
  registerStand
} from '../controllers/standController';
import { validateStandId, registerDock } from '../controllers/dockController';
import {
  validateModel,
  registerCycle
} from '../controllers/Data/cycleController';

router.post('/stand', validateLocation, registerStand);
router.get('/stand', async (req: Request, res: Response) => {
  res.render('registerStand');
});

router.post('/dock', validateStandId, registerDock);
router.get('/dock', async (req: Request, res: Response) => {
  res.render('registerDock');
});

router.post('/cycle', validateModel, registerCycle);
router.get('/cycle', async (req: Request, res: Response) => {
  res.render('registerCycle');
});

export default router;
