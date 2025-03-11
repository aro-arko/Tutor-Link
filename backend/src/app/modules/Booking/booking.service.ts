import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import Tutor from '../Tutor/tutor.model';
import Student from '../Student/student.model';

const createBooking = async (user: JwtPayload, bookingData: TBooking) => {
  const userData = await Student.findOne({ email: user.email });

  if (!userData) {
    throw new Error('User not found');
  }

  const tutorData = await Tutor.findById(bookingData.tutorId);

  if (!tutorData) {
    throw new Error('Tutor not found');
  }

  // Check if the requested subject is available in the tutor's subject array
  const isSubjectAvailable = tutorData.subject.includes(bookingData.subject);
  if (!isSubjectAvailable) {
    throw new Error('Tutor does not teach the requested subject');
  }

  // Check if the requested time slot matches the tutor's availability
  const availability = tutorData.availability.find((slot) =>
    slot._id.equals(bookingData.timeSlotId),
  );
  if (!availability) {
    throw new Error('Tutor is not available at the requested time slot');
  }

  // Extract start and end times from the timeSlots field
  const [startTime, endTime] = availability.timeSlots.split('-');
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  // Calculate the duration of each session in hours
  const sessionDuration =
    endHour + endMinute / 60 - (startHour + startMinute / 60);

  // Convert sessionStartDate and sessionEndDate to Date objects
  const sessionStartDate = new Date(bookingData.sessionStartDate);
  const sessionEndDate = new Date(bookingData.sessionEndDate);

  // Calculate the number of occurrences between the start and end dates
  const startDate = new Date(sessionStartDate);
  const endDate = new Date(sessionEndDate);
  let occurrences = 0;
  while (startDate <= endDate) {
    if (
      startDate.toLocaleString('en-US', { weekday: 'long' }) ===
      availability.day
    ) {
      occurrences++;
    }
    startDate.setDate(startDate.getDate() + 1);
  }

  console.log(occurrences);

  const totalDuration = sessionDuration * occurrences;

  if (totalDuration === 0) {
    throw new Error('No available slots within the specified date range');
  }

  const bookingDataWithUserId = {
    ...bookingData,
    studentId: userData._id,
    duration: totalDuration,
    price: tutorData.hourlyRate * totalDuration,
    status: 'pending', // Default status
  };

  const booking = await Booking.create(bookingDataWithUserId);
  return booking;
};

const studentBookingList = async (user: JwtPayload) => {
  const userData = await Student.findOne({ email: user.email });
  const bookings = await Booking.find({ studentId: userData!._id });
  return bookings;
};

const cancelBooking = async (user: JwtPayload, bookingId: string) => {
  const userData = await Student.findOne({ email: user.email });

  if (!userData) {
    throw new Error('User not found');
  }

  const ownBooking = await Booking.findOne({
    studentId: userData._id,
    _id: bookingId,
  });

  if (!ownBooking) {
    throw new Error('Sorry you cannot cancel this booking');
  }

  if (ownBooking.paymentStatus !== 'unpaid') {
    throw new Error(
      'Cannot cancel a booking with paid status please contact support',
    );
  }

  ownBooking.status = 'canceled';
  await ownBooking.save();

  return ownBooking;
};

const tutorBookingList = async (user: JwtPayload) => {
  const userData = await Tutor.findOne({ email: user.email });
  const bookings = await Booking.find({ tutorId: userData!._id });
  return bookings;
};

const updateBookingStatus = async (
  user: JwtPayload,
  bookingId: string,
  status: 'pending' | 'confirmed' | 'completed' | 'canceled',
) => {
  // Update booking status
  const userData = await Tutor.findOne({ email: user.email });

  if (!userData) {
    throw new Error('User not found');
  }

  const ownReceivedBooking = await Booking.findOne({
    tutorId: userData._id,
    _id: bookingId,
  });

  if (!ownReceivedBooking) {
    throw new Error('Booking not found');
  }

  ownReceivedBooking.status = status;
  await ownReceivedBooking.save();

  return ownReceivedBooking;
};

export const bookingService = {
  createBooking,
  tutorBookingList,
  cancelBooking,
  updateBookingStatus,
  studentBookingList,
};
