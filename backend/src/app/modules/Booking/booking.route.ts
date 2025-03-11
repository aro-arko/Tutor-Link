import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
// import validateRequest from '../../middlewares/validateRequest';
// import { bookingValidation } from './booking.validation';
import { bookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.student),
  // validateRequest(bookingValidation.bookingCreateValidationSchema),
  bookingController.createBooking,
);

export const BookingRoutes = router;
