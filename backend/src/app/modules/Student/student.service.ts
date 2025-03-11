import { JwtPayload } from 'jsonwebtoken';
import User from '../User/user.model';
import Student from './student.model';
import mongoose from 'mongoose';
import { TStudent } from './student.interface';

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

export const studentService = {
  getMe,
  updateMe,
};
