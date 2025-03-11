import { model, Schema } from 'mongoose';
import { TStudent } from './student.interface';

const studentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      trim: true,
    },
    educationLevel: {
      type: String,
      enum: ['High School', 'Undergraduate', 'Postgraduate'],
      default: 'High School',
    },
    age: {
      type: Number,
      default: 0,
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    bookedTutors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    paymentHistory: [
      {
        amount: {
          type: Number,
        },
        date: {
          type: Date,
        },
        method: {
          type: String,
          enum: ['SSLCommerz'],
        },
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Student = model<TStudent>('Student', studentSchema);

export default Student;
