import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { studentController } from './student.controller';

const router = express.Router();

// search for tutors by query
router.get('/search', studentController.searchTutors);

router.get('/me', auth(USER_ROLE.student), studentController.getMe);
router.patch('/update', auth(USER_ROLE.student), studentController.updateMe);

router.get(
  '/:email',
  auth(USER_ROLE.student),
  studentController.getStudentByEmail,
);

router.get(
  '/booking/:bookingId',
  auth(USER_ROLE.student),
  studentController.getBookingById,
);

export const StudentRoutes = router;
