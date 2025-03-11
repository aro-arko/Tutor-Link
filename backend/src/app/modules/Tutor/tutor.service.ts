import { JwtPayload } from 'jsonwebtoken';
import Tutor from './tutor.model';
import { TTutor } from './tutor.interface';
import User from '../User/user.model';
import mongoose from 'mongoose';

const getMe = async (user: JwtPayload) => {
  const tutor = await Tutor.findOne({ email: user.email });

  return tutor;
};

const updateTutor = async (user: JwtPayload, body: Partial<TTutor>) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const tutor = await Tutor.findOneAndUpdate(
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

    return tutor;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const tutorService = {
  getMe,
  updateTutor,
};
