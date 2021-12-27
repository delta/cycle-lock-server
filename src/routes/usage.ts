import express, { Router } from 'express';
import { usageHistory } from '../controllers/Data/dataController';

const router: Router = express.Router();

router.get('/history', usageHistory);

export default router;
