import { Types } from 'mongoose';

export type TTips = {
  tutorId: Types.ObjectId;
  tip: string;
  date: Date;
};
