import { Types } from 'mongoose';

export type TBooking = {
  studentId: Types.ObjectId;
  tutorId: Types.ObjectId;
  subject: Types.ObjectId;
  timeSlotId: Types.ObjectId;
  sessionStartDate: Date;
  sessionEndDate: Date;
  duration: number;
  approvalStatus: 'pending' | 'confirmed' | 'completed' | 'canceled';
  status: 'Unpaid' | 'Paid';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  price: number;
  paymentUrl: string;
};
