import { TSubject } from './subject.interface';
import { Subject } from './subject.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createSubject = async (subjectData: TSubject) => {
  const existingSubject = await Subject.findOne({ name: subjectData.name });
  if (existingSubject) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Subject name must be unique');
  }

  const subject = await Subject.create(subjectData);
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

export const subjectService = {
  createSubject,
  getSubjects,
  getSubjectById,
};
