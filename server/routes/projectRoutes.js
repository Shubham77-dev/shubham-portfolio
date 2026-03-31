import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createProject, deleteProject, updateProject } from '../controllers/projectController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = express.Router();

router.post('/', authMiddleware, requireAdmin, asyncHandler(createProject));
router.put('/:id', authMiddleware, requireAdmin, asyncHandler(updateProject));
router.delete('/:id', authMiddleware, requireAdmin, asyncHandler(deleteProject));

export default router;

