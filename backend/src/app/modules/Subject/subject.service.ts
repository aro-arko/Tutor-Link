import { TSubject } from './subject.interface';
import { Subject } from './subject.model';

const createSubject = async (subjectData: TSubject) => {
  const subject = await Subject.create(subjectData);
  return subject;
};

export const subjectService = {
  createSubject,
};
