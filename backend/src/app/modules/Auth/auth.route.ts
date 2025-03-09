import express from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';

const router = express.Router();

// create a student
router.post(
  '/register/student',
  validateRequest(authValidation.registerValidation),
  authController.createStudent,
);
router.post(
  '/register/tutor',
  validateRequest(authValidation.registerValidation),
  authController.createTutor,
);

router.post(
  '/login',
  validateRequest(authValidation.loginValidation),
  authController.loginUser,
);

export const AuthRoutes = router;
