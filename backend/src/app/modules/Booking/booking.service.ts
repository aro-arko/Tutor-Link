import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import User from '../User/user.model';
import Tutor from '../Tutor/tutor.model';

const createBooking = async (user: JwtPayload, bookingData: TBooking) => {
  const userData = await User.findOne({ email: user.email });

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

  const bookingDataWithUserId = {
    ...bookingData,
    studentId: userData._id,
    duration: totalDuration,
    price: tutorData.hourlyRate * totalDuration,
    status: 'pending',
  };

  const booking = await Booking.create(bookingDataWithUserId);
  return booking;
};

export const bookingService = {
  createBooking,
};
