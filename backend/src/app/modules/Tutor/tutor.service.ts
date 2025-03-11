import { JwtPayload } from 'jsonwebtoken';
import Tutor from './tutor.model';
import { TTutor } from './tutor.interface';
import User from '../User/user.model';
import mongoose from 'mongoose';
import { Subject } from '../Subject/subject.model';

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

export const tutorService = {
  getMe,
  updateTutor,
};
