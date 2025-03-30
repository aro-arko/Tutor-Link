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

const searchTutors = async (query: Partial<TQuery>) => {
  const { name, subject, subjects, rating, maxRate, availability } = query;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, prefer-const
  let searchQuery: any = {};

  // Filter by name
  if (name) {
    searchQuery.name = { $regex: name, $options: 'i' };
  }

  // Filter by a single subject name
  if (subject) {
    const subjectDetails = await Subject.findOne({
      name: { $regex: subject, $options: 'i' },
    });
    if (subjectDetails) {
      searchQuery.subject = { $in: [subjectDetails._id] };
    } else {
      return [];
    }
  }

  // Filter by multiple subject IDs
  if (subjects) {
    const subjectIds =
      typeof subjects === 'string'
        ? subjects.split(',').map((id) => new mongoose.Types.ObjectId(id))
        : subjects.map((id) => new mongoose.Types.ObjectId(id));
    searchQuery.subject = { $in: subjectIds };
  }

  // Filter by minimum rating
  if (rating) {
    searchQuery.rating = { $gte: Number(rating) };
  }

  // Filter by maximum hourly rate
  if (maxRate) {
    searchQuery.hourlyRate = { $lte: Number(maxRate) };
  }

  // Filter by availability (day of the week)
  if (availability) {
    searchQuery['availability.day'] = availability;
  }

  const queryBuilder = new QueryBuilder(Tutor.find(), query).filter().sort();

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
  searchTutors,
  getStudentByEmail,
};
