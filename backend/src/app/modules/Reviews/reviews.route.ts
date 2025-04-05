import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { reviewController } from './reviews.controller';

const router = express.Router();

// giving review to a tutor
router.post(
  '/review/:tutorId',
  auth(USER_ROLE.student),
  reviewController.reviewTutor,
);

// update review
router.patch(
  '/review/:reviewId',
  auth(USER_ROLE.student),
  reviewController.updateReview,
);

// get total reviews
router.get('/total-review', reviewController.totalReviews);

export const ReviewsRoutes = router;
