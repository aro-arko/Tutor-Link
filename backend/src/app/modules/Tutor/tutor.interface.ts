export type TTutor = {
  name: string;
  email: string;
  bio?: string;
  address?: string;
  hourlyRate?: number;
  tutorImage?: string;
  phone?: string;
  subject?: string[];
  qualification?: string;
  rating?: number;
  reviews?: number;
  experience?: number;
  age?: number;
  bookedStudents?: string[];
  availability?: {
    day: string;
    timeSlots: string[];
  }[];
};
