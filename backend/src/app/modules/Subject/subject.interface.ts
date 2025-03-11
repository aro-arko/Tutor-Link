import { Types } from 'mongoose';

export type TSubject = {
  name: string;
  description: string;
  gradeLevel: 'high-school' | 'bachelors' | 'post-graduate';
  category: string;
  createdBy: Types.ObjectId;
};
