import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './booking.validation';
import { bookingController } from './booking.controller';

const router = express.Router();

// student
// create booking
router.post(
  '/',
  auth(USER_ROLE.student),
  validateRequest(bookingValidation.bookingCreateValidationSchema),
  bookingController.createBooking,
);
// student bookings
router.get('/', auth(USER_ROLE.student), bookingController.studentBookingList);

router.put(
  '/cancel/:bookingId',
  auth(USER_ROLE.student),
  bookingController.cancelBooking,
);

// tutor
// tutor's booking list
router.get(
  '/bookings',
  auth(USER_ROLE.tutor),
  bookingController.tutorBookingList,
);

// tutor approve or decline booking
router.put(
  '/:bookingId',
  auth(USER_ROLE.tutor),
  bookingController.updateBookingStatus,
);

export const BookingRoutes = router;
