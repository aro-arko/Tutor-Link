import { JwtPayload } from 'jsonwebtoken';
import User from '../User/user.model';
import Student from './student.model';
import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import Tutor from '../Tutor/tutor.model';
// import { Booking } from '../Booking/booking.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Subject } from '../Subject/subject.model';
import { TQuery } from '../../types/query.type';

const getMe = async (user: JwtPayload) => {
  const userData = await User.findOne({ email: user.email });
  const studentInfo = await Student.findOne({ user: userData!._id });
  return studentInfo;
};

const updateMe = async (user: JwtPayload, body: Partial<TStudent>) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const student = await Student.findOneAndUpdate(
      { email: user.email },
      { ...body },
      { new: true, session },
    );

    if (body.name) {
      await User.findOneAndUpdate(
        { email: user.email },
        { name: body.name },
        { session },
      );
    }

    await session.commitTransaction();
    session.endSession();

    return student;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// const reviewTutor = async (
//   user: JwtPayload,
//   tutorId: string,
//   body: { rating: number; review: string },
// ) => {
//   const student = await Student.findOne({ email: user.email });

//   if (!student) {
//     throw new Error('Student not found');
//   }

//   const completedBooking = await Booking.findOne({
//     studentId: student._id,
//     tutorId: tutorId,
//     approvalStatus: { $in: ['confirmed', 'completed'] },
//   });

//   if (!completedBooking) {
//     throw new Error(
//       'You can only review tutors with whom you have confirmed a booking',
//     );
//   }

//   const tutor = await Tutor.findById(tutorId);

//   if (!tutor) {
//     throw new Error('Tutor not found');
//   }

//   // Check if the student has already given a review
//   const existingReview = tutor.reviews.find(
//     (review) => review.studentId.toString() === student._id.toString(),
//   );

//   if (existingReview) {
//     throw new Error('You have already reviewed this tutor');
//   }

//   // Clean up the reviews array to ensure it only contains valid objects
//   tutor.reviews = tutor.reviews.filter(
//     (review) => typeof review === 'object' && review.rating,
//   );

//   // Update the tutor's reviews and rating
//   tutor.reviews.push({
//     _id: new ObjectId(),
//     studentId: student._id,
//     review: body.review,
//     rating: body.rating,
//   });

//   // Calculate the new average rating
//   const totalRatings = tutor.reviews.reduce(
//     (sum, review) =>
//       sum + (typeof review.rating === 'number' ? review.rating : 0),
//     0,
//   );

//   tutor.rating = totalRatings / tutor.reviews.length;

//   await tutor.save();

//   return tutor;
// };

// const updateReview = async (
//   user: JwtPayload,
//   reviewId: string,
//   body: { rating: number; review: string },
// ) => {
//   const student = await Student.findOne({ email: user.email });

//   if (!student) {
//     throw new Error('Student not found');
//   }

//   const tutor = await Tutor.findOne({ 'reviews._id': reviewId });

//   if (!tutor) {
//     throw new Error('Review not found');
//   }

//   const review = tutor.reviews.find(
//     (review) => review._id.toString() === reviewId,
//   );

//   if (!review) {
//     throw new Error('Review not found');
//   }

//   if (review.studentId.toString() !== student._id.toString()) {
//     throw new Error('You can only update your own reviews');
//   }

//   // Ensure studentId is correctly cast to ObjectId
//   review.studentId = new ObjectId(review.studentId);

//   // Update the review with valid data
//   review.rating = body.rating;
//   review.review = body.review;

//   // Recalculate the average rating
//   const totalRatings = tutor.reviews.reduce(
//     (sum, review) =>
//       sum + (typeof review.rating === 'number' ? review.rating : 0),
//     0,
//   );

//   tutor.rating = totalRatings / tutor.reviews.length;

//   await tutor.save();

//   return tutor;
// };

const searchTutors = async (query: Partial<TQuery>) => {
  const { name, subject } = query;

  let searchQuery = {};

  if (name && subject) {
    const subjectDetails = await Subject.findOne({
      name: subject,
    });

    if (subjectDetails) {
      searchQuery = {
        name: name,
        subject: { $in: [subjectDetails._id] },
      };
    } else {
      return [];
    }
  } else if (name) {
    searchQuery = {
      name: name,
    };
  } else if (subject) {
    const subjectDetails = await Subject.findOne({
      name: subject,
    });

    if (subjectDetails) {
      searchQuery = {
        subject: { $in: [subjectDetails._id] },
      };
    } else {
      return [];
    }
  } else {
    searchQuery = {};
  }

  const queryBuilder = new QueryBuilder(Tutor.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  // Merge the searchQuery with the QueryBuilder's query
  queryBuilder.modelQuery = queryBuilder.modelQuery.find(searchQuery);

  const tutors = await queryBuilder.modelQuery;
  return tutors;
};

const getStudentByEmail = async (user: JwtPayload, email: string) => {
  if (user.email !== email) {
    throw new Error('You are not authorized to access this resource');
  }
  const studentData = await Student.findOne({ email: email });
  return studentData;
};

export const studentService = {
  getMe,
  updateMe,
  // reviewTutor,
  // updateReview,
  searchTutors,
  getStudentByEmail,
};
