import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import User from '../User/user.model';

const createBooking = async (user: JwtPayload, bookingData: TBooking) => {
  const userData = await User.findOne({ email: user.email });

  if (!userData) {
    throw new Error('User not found');
  }

  const bookingDataWithUserId = {
    ...bookingData,
    studentId: userData._id.toString(),
  };

  const booking = await Booking.create(bookingDataWithUserId);
  return booking;
};

export const bookingService = {
  createBooking,
};
