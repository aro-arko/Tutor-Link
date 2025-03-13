import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingService } from './booking.service';
import httpStatus from 'http-status';

const createBooking = catchAsync(async (req, res) => {
  const user = req.user;
  const bookingData = req.body;
  const result = await bookingService.createBooking(user, bookingData, req.ip!);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booking created successfully',
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

const cancelBooking = catchAsync(async (req, res) => {
  const user = req.user;
  const bookingId = req.params.bookingId;
  const result = await bookingService.cancelBooking(user, bookingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking canceled successfully',
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
  const approvalStatus = req.body.approvalStatus;
  const result = await bookingService.updateBookingStatus(
    user,
    bookingId,
    approvalStatus,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking status updated successfully',
    data: result,
  });
});
const verifyPayment = catchAsync(async (req, res) => {
  const order = await bookingService.verifyPayment(
    req.query.order_id as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order verified successfully',
    data: order,
  });
});

export const bookingController = {
  createBooking,
  studentBookingList,
  cancelBooking,
  tutorBookingList,
  updateBookingStatus,
  verifyPayment,
};
