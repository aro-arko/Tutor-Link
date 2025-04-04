import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { tutorService } from './tutor.service';
import httpStatus from 'http-status';

const getMe = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await tutorService.getMe(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor fetched successfully',
    data: result,
  });
});

const updateTutor = catchAsync(async (req, res) => {
  const user = req.user;
  // console.log(user);
  const result = await tutorService.updateTutor(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor updated successfully',
    data: result,
  });
});

const activeSessions = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await tutorService.activeSessions(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Active sessions fetched successfully',
    data: result,
  });
});
const bookingRequests = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await tutorService.bookingRequests(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking requests fetched successfully',
    data: result,
  });
});

const getStudent = catchAsync(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const result = await tutorService.getStudent(user, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched successfully',
    data: result,
  });
});

const getAllTutors = catchAsync(async (req, res) => {
  const result = await tutorService.getAllTutors();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All tutors fetched successfully',
    data: result,
  });
});

const getTutorById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await tutorService.getTutorById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor fetched successfully',
    data: result,
  });
});

const getBookingById = catchAsync(async (req, res) => {
  const user = req.user;
  // console.log(user);
  const { bookingId } = req.params;
  const result = await tutorService.getBookingById(user, bookingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking fetched successfully',
    data: result,
  });
});

export const tutorController = {
  getMe,
  updateTutor,
  activeSessions,
  bookingRequests,
  getStudent,
  getAllTutors,
  getTutorById,
  getBookingById,
};
