import express from 'express';
import { getCsvData, saveResult } from '../controllers/terrorController.js';

const router = express.Router();

router.get('/data', getCsvData);
router.post('/result', saveResult);

export default router;
