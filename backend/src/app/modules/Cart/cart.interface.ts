import { Types } from 'mongoose';

export type TCart = {
  tutorId: Types.ObjectId;
  studentEmail: string;
};
