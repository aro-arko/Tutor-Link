import { Types } from 'mongoose';

export type TBooking = {
  studentId: Types.ObjectId;
  tutorId: Types.ObjectId;
  subject: string;
  sessionDate: Date;
  duration: number; // in hours
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
  paymentStatus: 'unpaid' | 'paid';
  price: number;
};
