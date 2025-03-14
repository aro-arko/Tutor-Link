import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import Tutor from '../Tutor/tutor.model';
import Student from '../Student/student.model';
import mongoose from 'mongoose';
import { bookingUtils } from './booking.utils';

const createBooking = async (
  user: JwtPayload,
  bookingData: TBooking,
  client_ip: string,
) => {
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

  // console.log(occurrences);

  const totalDuration = sessionDuration * occurrences;

  if (totalDuration === 0) {
    throw new Error('No available slots within the specified date range');
  }

  const bookingDataWithUserId = {
    ...bookingData,
    studentId: userData._id,
    duration: totalDuration,
    price: tutorData.hourlyRate * totalDuration,
    approvalStatus: 'pending',
  };

  let booking = await Booking.create(bookingDataWithUserId);
  // return booking;

  // console.log(booking.price, booking._id);

  const shurjopayPayload = {
    amount: booking.price,
    order_id: booking._id,
    currency: 'BDT',
    customer_name: userData?.name,
    customer_address: 'N/A',
    customer_email: userData?.email,
    customer_phone: 'N/A',
    customer_city: 'N/A',
    client_ip,
  };

  const payment = await bookingUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    booking = await booking.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
      paymentUrl: payment.checkout_url,
    });
  }

  return payment.checkout_url;
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

  if (ownBooking.status !== 'Unpaid') {
    throw new Error(
      'Cannot cancel a booking with paid status please contact support',
    );
  }

  ownBooking.approvalStatus = 'canceled';
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
  approvalStatus: 'pending' | 'confirmed' | 'completed' | 'canceled',
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const userData = await Tutor.findOne({ email: user.email });

    if (!userData) {
      throw new Error('User not found');
    }

    const ownReceivedBooking = await Booking.findOne({
      tutorId: userData._id,
      _id: bookingId,
    }).session(session);

    if (!ownReceivedBooking) {
      throw new Error('Booking not found');
    }

    ownReceivedBooking.approvalStatus = approvalStatus;
    await ownReceivedBooking.save({ session });

    // Add student ID to bookedStudents in Tutor collection if status is confirmed
    if (approvalStatus === 'confirmed') {
      await Tutor.findByIdAndUpdate(
        userData._id,
        { $addToSet: { bookedStudents: ownReceivedBooking.studentId } },
        { session },
      );
    }

    await session.commitTransaction();
    session.endSession();

    return ownReceivedBooking;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await bookingUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    const updatedBooking = await Booking.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status === 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status === 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status === 'Cancel'
                ? 'Cancelled'
                : '',
      },
      { new: true },
    );

    if (!updatedBooking) {
      throw new Error('Booking not found or update failed');
    }

    return updatedBooking;
  }

  throw new Error('Payment verification failed');
};

const tutorEarnings = async (user: JwtPayload) => {
  const userData = await Tutor.findOne({ email: user.email });
  const bookings = await Booking.find({
    tutorId: userData!._id,
    status: 'Paid',
    approvalStatus: 'confirmed',
  });
  const earnings = bookings.reduce((acc, booking) => acc + booking.price, 0);
  return earnings;
};

export const bookingService = {
  createBooking,
  tutorBookingList,
  cancelBooking,
  updateBookingStatus,
  studentBookingList,
  verifyPayment,
  tutorEarnings,
};
