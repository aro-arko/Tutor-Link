import { model, Schema } from 'mongoose';
import { TTutor } from './tutor.interface';

const tutorSchema = new Schema<TTutor>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, immutable: true, unique: true },
  bio: { type: String, default: '' },
  address: { type: String, default: '' },
  hourlyRate: { type: Number, default: 0 },
  tutorImage: { type: String, default: '' },
  phone: { type: String, default: '' },
  subject: { type: [Schema.Types.ObjectId], ref: 'Subject', default: [] },
  qualification: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  experience: { type: Number, default: 0 },
  age: { type: Number, default: 0 },
  bookedStudents: {
    type: [Schema.Types.ObjectId],
    ref: 'Student',
    default: [],
  },
  availability: {
    type: [
      {
        day: { type: String, default: '' },
        timeSlots: { type: String, default: '' },
      },
    ],
    default: [],
  },
});

const Tutor = model<TTutor>('Tutor', tutorSchema);
export default Tutor;
