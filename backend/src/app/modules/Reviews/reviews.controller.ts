import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewService } from './reviews.service';
import httpStatus from 'http-status';

const reviewTutor = catchAsync(async (req, res) => {
  const user = req.user;
  const tutorId = req.params.tutorId;
  const result = await reviewService.reviewTutor(user, tutorId, req.body);

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
  const result = await reviewService.updateReview(user, reviewId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

const totalReviews = catchAsync(async (req, res) => {
  const result = await reviewService.totalReviews();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Total reviews retrieved successfully',
    data: result,
  });
});

export const reviewController = {
  reviewTutor,
  updateReview,
  totalReviews,
};
