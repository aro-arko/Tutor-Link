import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingService } from './booking.service';
import httpStatus from 'http-status';

const createBooking = catchAsync(async (req, res) => {
  const user = req.user;
  const bookingData = req.body;
  const result = await bookingService.createBooking(user, bookingData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const tutorBookingList = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await bookingService.tutorBookingList(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor booking list fetched successfully',
    data: result,
  });
});

const updateBookingStatus = catchAsync(async (req, res) => {
  const user = req.user;
  const bookingId = req.params.bookingId;
  const status = req.body.status;
  const result = await bookingService.updateBookingStatus(
    user,
    bookingId,
    status,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking status updated successfully',
    data: result,
  });
});

const studentBookingList = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await bookingService.studentBookingList(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student booking list fetched successfully',
    data: result,
  });
});

export const bookingController = {
  createBooking,
  tutorBookingList,
  updateBookingStatus,
  studentBookingList,
};
