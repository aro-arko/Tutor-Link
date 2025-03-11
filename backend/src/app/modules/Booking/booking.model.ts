import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    tutorId: { type: Schema.Types.ObjectId, ref: 'Tutor', required: true },
    subject: { type: String, required: true },
    sessionDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'canceled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
    },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
