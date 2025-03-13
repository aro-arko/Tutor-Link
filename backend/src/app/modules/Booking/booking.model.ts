import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    tutorId: { type: Schema.Types.ObjectId, ref: 'Tutor', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    timeSlotId: { type: Schema.Types.ObjectId, ref: 'Tutor', required: true }, // Added timeSlotId
    sessionStartDate: { type: Date, required: true },
    sessionEndDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    approvalStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'canceled'],
      default: 'pending',
    },
    status: {
      type: String,
      enum: ['Unpaid', 'Paid'],
      default: 'Unpaid',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
    price: { type: Number, required: true },
    paymentUrl: { type: String },
  },

  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
