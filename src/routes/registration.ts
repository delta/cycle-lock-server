import express, { Router } from 'express';
const router: Router = express.Router();
import {
  validateLocation,
  registerStand
} from '../controllers/standController';
import { validateStandId, registerDock } from '../controllers/dockController';
import { validateModel, registerCycle } from '../controllers/cycleController';

router.post('/stand', validateLocation, registerStand);
router.post('/dock', validateStandId, registerDock);
router.post('/cycle', validateModel, registerCycle);

export default router;
