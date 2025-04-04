import { JwtPayload } from 'jsonwebtoken';
import Tutor from './tutor.model';
import { TTutor } from './tutor.interface';
import User from '../User/user.model';
import mongoose from 'mongoose';
import { Subject } from '../Subject/subject.model';
import { Booking } from '../Booking/booking.model';
import Student from '../Student/student.model';

const getMe = async (user: JwtPayload) => {
  const tutor = await Tutor.findOne({ email: user.email }).populate('subject');
  return tutor;
};

const updateTutor = async (user: JwtPayload, body: Partial<TTutor>) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Validate subject field if it exists in the body
    if (body.subject) {
      const subjects = await Subject.find({ _id: { $in: body.subject } });
      if (subjects.length !== body.subject.length) {
        throw new Error('One or more subjects are invalid');
      }
    }

    const tutor = await Tutor.findOneAndUpdate(
      { email: user.email },
      { ...body },
      { new: true, session },
    ).populate('subject');

    if (body.name) {
      await User.findOneAndUpdate(
        { email: user.email },
        { name: body.name },
        { session },
      );
    }

    await session.commitTransaction();
    session.endSession();

    return tutor;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const activeSessions = async (user: JwtPayload) => {
  const tutorData = await Tutor.findOne({ email: user.email });

  if (!tutorData) {
    throw new Error('Tutor not found');
  }

  const bookings = await Booking.find({
    tutorId: tutorData._id,
    approvalStatus: 'confirmed',
  });

  return bookings;
};
const bookingRequests = async (user: JwtPayload) => {
  const tutorData = await Tutor.findOne({ email: user.email });

  if (!tutorData) {
    throw new Error('Tutor not found');
  }

  const bookings = await Booking.find({
    tutorId: tutorData._id,
    approvalStatus: 'pending',
  });

  return bookings;
};

const getStudent = async (user: JwtPayload, id: string) => {
  const tutor = await Tutor.findOne({ email: user.email });
  if (!tutor || !tutor.bookedStudents) {
    throw new Error('Tutor or booked students not found');
  }
  const student = await Student.findById(id);
  return student;
};

const getAllTutors = async () => {
  const tutors = await Tutor.aggregate([
    {
      $addFields: {
        reviewCount: { $size: '$reviews' },
      },
    },
    {
      $sort: {
        reviewCount: -1,
        rating: -1,
      },
    },
  ]);

  return tutors;
};

const getTutorById = async (id: string) => {
  const tutor = await Tutor.findById(id);
  return tutor;
};

const getBookingById = async (user: JwtPayload, bookingId: string) => {
  const tutor = await Tutor.findOne({ email: user.email });
  // console.log(tutor);

  const booking = await Booking.findOne({
    _id: bookingId,
    tutorId: tutor!._id,
  });
  return booking;
};

export const tutorService = {
  getMe,
  updateTutor,
  activeSessions,
  bookingRequests,
  getStudent,
  getAllTutors,
  getTutorById,
  getBookingById,
};
