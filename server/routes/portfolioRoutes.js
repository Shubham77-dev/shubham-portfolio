import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getPortfolioByUsername, updatePortfolio } from '../controllers/portfolioController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = express.Router();

router.get('/:username', asyncHandler(getPortfolioByUsername));
router.put('/', authMiddleware, requireAdmin, asyncHandler(updatePortfolio));

export default router;

