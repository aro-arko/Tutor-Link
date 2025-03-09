import mongoose from 'mongoose';

export type TStudent = {
  name: string;
  email: string;
  educationLevel?: 'High School' | 'Undergraduate' | 'Postgraduate';
  age?: number;
  phoneNumber?: string;
  address?: string;
  bookedTutors?: mongoose.Schema.Types.ObjectId[];
  paymentHistory?: {
    amount: number;
    date: Date;
    method: 'SSLCommerz';
  };
};
