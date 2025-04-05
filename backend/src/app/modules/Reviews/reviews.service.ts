import { JwtPayload } from 'jsonwebtoken';
import { Booking } from '../Booking/booking.model';
import Student from '../Student/student.model';
import Tutor from '../Tutor/tutor.model';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const reviewTutor = async (
  user: JwtPayload,
  tutorId: string,
  body: { rating: number; review: string },
) => {
  const student = await Student.findOne({ email: user.email });

  if (!student) {
    throw new Error('Student not found');
  }

  const completedBooking = await Booking.findOne({
    studentId: student._id,
    tutorId: tutorId,
    approvalStatus: { $in: ['confirmed', 'completed'] },
  });

  if (!completedBooking) {
    throw new Error(
      'You can only review tutors with whom you have confirmed a booking',
    );
  }

  const tutor = await Tutor.findById(tutorId);

  if (!tutor) {
    throw new Error('Tutor not found');
  }

  // Check if the student has already given a review
  const existingReview = tutor.reviews.find(
    (review) => review.studentId.toString() === student._id.toString(),
  );

  if (existingReview) {
    throw new Error('You have already reviewed this tutor');
  }

  // Clean up the reviews array to ensure it only contains valid objects
  tutor.reviews = tutor.reviews.filter(
    (review) => typeof review === 'object' && review.rating,
  );

  // Update the tutor's reviews and rating
  tutor.reviews.push({
    _id: new ObjectId(),
    studentId: student._id,
    review: body.review,
    rating: body.rating,
  });

  // Calculate the new average rating
  const totalRatings = tutor.reviews.reduce(
    (sum, review) =>
      sum + (typeof review.rating === 'number' ? review.rating : 0),
    0,
  );

  tutor.rating = totalRatings / tutor.reviews.length;

  await tutor.save();

  return tutor;
};

const updateReview = async (
  user: JwtPayload,
  reviewId: string,
  body: { rating: number; review: string },
) => {
  const student = await Student.findOne({ email: user.email });

  if (!student) {
    throw new Error('Student not found');
  }

  const tutor = await Tutor.findOne({ 'reviews._id': reviewId });

  if (!tutor) {
    throw new Error('Review not found');
  }

  const review = tutor.reviews.find(
    (review) => review._id.toString() === reviewId,
  );

  if (!review) {
    throw new Error('Review not found');
  }

  if (review.studentId.toString() !== student._id.toString()) {
    throw new Error('You can only update your own reviews');
  }

  // Ensure studentId is correctly cast to ObjectId
  review.studentId = new ObjectId(review.studentId);

  // Update the review with valid data
  review.rating = body.rating;
  review.review = body.review;

  // Recalculate the average rating
  const totalRatings = tutor.reviews.reduce(
    (sum, review) =>
      sum + (typeof review.rating === 'number' ? review.rating : 0),
    0,
  );

  tutor.rating = totalRatings / tutor.reviews.length;

  await tutor.save();

  return tutor;
};

export const totalReviews = async () => {
  const total = await Tutor.aggregate([
    {
      $unwind: '$reviews',
    },
    {
      $group: {
        _id: null,
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  return total[0]?.totalReviews || 0;
};

export const reviewService = {
  reviewTutor,
  updateReview,
  totalReviews,
};
