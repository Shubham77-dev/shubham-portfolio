import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));

export default router;

