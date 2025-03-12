import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { studentService } from './student.service';
import httpStatus from 'http-status';

const getMe = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await studentService.getMe(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data retrieved successfully',
    data: result,
  });
});

const updateMe = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await studentService.updateMe(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data updated successfully',
    data: result,
  });
});

const reviewTutor = catchAsync(async (req, res) => {
  const user = req.user;
  const tutorId = req.params.tutorId;
  const result = await studentService.reviewTutor(user, tutorId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review added successfully',
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const user = req.user;
  const reviewId = req.params.reviewId;
  const result = await studentService.updateReview(user, reviewId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

const searchTutors = catchAsync(async (req, res) => {
  const result = await studentService.searchTutors(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutors retrieved successfully',
    data: result,
  });
});

export const studentController = {
  getMe,
  updateMe,
  reviewTutor,
  updateReview,
  searchTutors,
};
