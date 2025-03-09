import { model, Schema } from 'mongoose';
import { TTutor } from './tutor.interface';

const tutorSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String, default: '' },
  subjects: { type: [String], default: [] },
  degree: { type: String, default: '' },
  experience: { type: Number, default: 0 },
  age: { type: Number, default: 0 },
  phoneNumber: { type: String, default: '' },
  address: { type: String, default: '' },
  hourlyRate: { type: Number, default: 0 },
  availability: {
    type: [
      {
        day: { type: String, default: '' },
        timeSlots: { type: [String], default: [] },
      },
    ],
    default: [],
  },
  bookedStudents: {
    type: [Schema.Types.ObjectId],
    ref: 'Student',
    default: [],
  },
  paymentHistory: {
    type: [
      {
        amount: { type: Number, default: 0 },
        date: { type: Date, default: Date.now },
        method: { type: String, enum: ['SSLCommerz'], default: 'SSLCommerz' },
      },
    ],
    default: [],
  },
});

const Tutor = model<TTutor>('Tutor', tutorSchema);
export default Tutor;
