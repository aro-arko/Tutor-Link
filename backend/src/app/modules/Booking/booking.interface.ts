import { Types } from 'mongoose';

export type TBooking = {
  studentId: Types.ObjectId;
  tutorId: Types.ObjectId;
  subject: Types.ObjectId;
  timeSlotId: Types.ObjectId;
  sessionStartDate: Date;
  sessionEndDate: Date;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
  paymentStatus: 'unpaid' | 'paid';
  price: number;
};
