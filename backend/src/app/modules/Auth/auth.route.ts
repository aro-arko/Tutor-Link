import express from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

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

router.patch(
  '/change-password',
  auth(USER_ROLE.student, USER_ROLE.tutor, USER_ROLE.admin),
  validateRequest(authValidation.changePasswordValidation),
  authController.changePassword,
);

export const AuthRoutes = router;
