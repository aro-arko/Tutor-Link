export type TTutor = {
  name: string;
  email: string;
  bio?: string;
  subjects?: string[];
  degree?: string;
  experience?: number;
  age?: number;
  phoneNumber?: string;
  address?: string;
  bookedStudents?: string[];
  hourlyRate?: number;
  availability?: {
    day: string;
    timeSlots: string[];
  }[];
};
