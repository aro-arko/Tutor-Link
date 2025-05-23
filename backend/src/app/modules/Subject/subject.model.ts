import { Schema, model } from 'mongoose';
import { TSubject } from './subject.interface';

const SubjectSchema = new Schema<TSubject>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    gradeLevel: {
      type: String,
      enum: ['high-school', 'bachelors', 'post-graduate'],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const Subject = model<TSubject>('Subject', SubjectSchema);
