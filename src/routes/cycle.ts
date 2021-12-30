import express, { Router } from 'express';
import {
  fetchStand,
  fetchDock,
  fetchCycle
} from '../controllers/Data/cycleController';

const router: Router = express.Router();

router.get('/cycle', fetchCycle);

router.get('/stand', fetchStand);

router.get('/dock', fetchDock);

export default router;
