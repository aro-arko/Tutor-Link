import { Types } from 'mongoose';

export type TTutor = {
  user: Types.ObjectId;
  name: string;
  email: string;
  bio: string;
  address: string;
  hourlyRate: number;
  tutorImage: string;
  phone: string;
  subject: Types.ObjectId[];
  qualification?: string;
  rating: number;
  reviews: number;
  experience: number;
  age: number;
  bookedStudents?: Types.ObjectId[];
  availability: {
    _id: Types.ObjectId;
    day: string;
    timeSlots: string;
  }[];
};
