import mongoose from 'mongoose';
import { TUser } from '../User/user.interface';
import User from '../User/user.model';
import Student from '../Student/student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import Tutor from '../Tutor/tutor.model';
import { createToken } from './auth.utils';
import config from '../../config';

const createStudentIntoDB = async (payLoad: TUser) => {
  const userData = { ...payLoad };
  userData.role = 'student';

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already exists');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newUser = await User.create([userData], { session: session });
    const studentInfo = {
      user: newUser[0]._id,
      ...userData,
    };
    const newStudent = await Student.create([studentInfo], {
      session: session,
    });

    if (!newStudent || !newUser) {
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        'Error while creating student profile',
      );
    }
    await session.commitTransaction();
    await session.endSession();

    return newUser;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createTutorIntoDB = async (payLoad: TUser) => {
  const userData = { ...payLoad };
  userData.role = 'tutor';

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already exists');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newUser = await User.create([userData], { session: session });
    const tutorInfo = {
      user: newUser[0]._id,
      ...userData,
    };
    const newTutor = await Tutor.create([tutorInfo], {
      session: session,
    });

    if (!newTutor || !newUser) {
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        'Error while creating tutor profile',
      );
    }
    await session.commitTransaction();
    await session.endSession();

    return newUser;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const loginUser = async (payLoad: Partial<TUser>) => {
  const userData = { ...payLoad };
  const user = await User.isUserExistsByEmail(userData.email as string);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (
    !(await User.isPasswordMatched(userData.password as string, user.password))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  // jwt token generation
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return { accessToken: accessToken };
};

export const authServices = {
  createStudentIntoDB,
  createTutorIntoDB,
  loginUser,
};
