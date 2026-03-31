// server/routes/userRoutes.js  — NEW FILE
//
// All routes here require a valid JWT AND admin role.
//
// Route map:
//   GET    /users          → list all users
//   GET    /users/:id      → get one user
//   POST   /users          → create user (admin sets role)
//   PUT    /users/:id      → update user fields / password
//   DELETE /users/:id      → delete user + portfolio

import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireAdmin }   from '../middleware/requireAdmin.js';
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

// Apply auth + admin check to every route in this file.
router.use(authMiddleware, requireAdmin);

router.get(   '/',    asyncHandler(listUsers)   );
router.get(   '/:id', asyncHandler(getUser)     );
router.post(  '/',    asyncHandler(createUser)  );
router.put(   '/:id', asyncHandler(updateUser)  );
router.delete('/:id', asyncHandler(deleteUser)  );

export default router;