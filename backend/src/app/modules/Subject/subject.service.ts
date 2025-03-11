import { TSubject } from './subject.interface';
import { Subject } from './subject.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import User from '../User/user.model';
import { JwtPayload } from 'jsonwebtoken';

const createSubject = async (subjectData: TSubject, user: JwtPayload) => {
  const registrar = await User.findOne({ email: user.email });
  if (!registrar) {
    throw new AppError(httpStatus.NOT_FOUND, 'Registrar not found');
  }

  const existingSubject = await Subject.findOne({ name: subjectData.name });
  if (existingSubject) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Subject name must be unique');
  }

  const subjectDataWithRegistrar = {
    ...subjectData,
    createdBy: registrar._id,
  };

  // Create the new subject
  const subject = await Subject.create(subjectDataWithRegistrar);
  return subject;
};

const getSubjects = async () => {
  const subjects = await Subject.find();
  return subjects;
};

const getSubjectById = async (id: string) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    throw new AppError(httpStatus.NOT_FOUND, 'Subject not found');
  }
  return subject;
};

const updateSubject = async (
  user: JwtPayload,
  id: string,
  subjectData: TSubject,
) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    throw new AppError(httpStatus.NOT_FOUND, 'Subject not found');
  }

  const userProfile = await User.findOne({ email: user.email });
  if (!userProfile) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.role === 'tutor' && !subject.createdBy.equals(userProfile._id)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to update this subject',
    );
  }

  const updatedSubject = await Subject.findByIdAndUpdate(id, subjectData, {
    new: true,
    runValidators: true,
  });

  return updatedSubject;
};

const deleteSubject = async (id: string) => {
  const subject = await Subject.findByIdAndDelete(id);
  return subject;
};

export const subjectService = {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
