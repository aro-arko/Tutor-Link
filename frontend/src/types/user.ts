export interface IUser {
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface ITutor {
  _id: string;
  email: string;
  tutorImage: string;
  backgroundImage: string;
  name: string;
  bio: string;
  address: string;
  hourlyRate: string;
  phone: string;
  qualification: string;
  rating: number;
  reviews: number;
  coverImage: string;
  subject: string[];
  availability: { day: string; timeSlots: string[] }[];
}
