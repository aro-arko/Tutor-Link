import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { tutorController } from './tutor.controller';

const router = express.Router();

router.get('/me', auth(USER_ROLE.tutor), tutorController.getMe);
router.patch('/update', auth(USER_ROLE.tutor), tutorController.updateTutor);
router.get(
  '/active-sessions',
  auth(USER_ROLE.tutor),
  tutorController.activeSessions,
);

router.get(
  '/bookings/:bookingId',
  auth(USER_ROLE.tutor),
  tutorController.getBookingById,
);
router.get(
  '/booking-requests',
  auth(USER_ROLE.tutor),
  tutorController.bookingRequests,
);

router.get('/all-tutors', tutorController.getAllTutors);

router.get('/student/:id', auth(USER_ROLE.tutor), tutorController.getStudent);
router.get('/:id', tutorController.getTutorById);

export const TutorRoutes = router;
