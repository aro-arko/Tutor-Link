export type TStudent = {
  _id: string;
  name: string;
  email: string;
  educationLevel?: "High School" | "Undergraduate" | "Postgraduate";
  age?: number;
  phoneNumber?: string;
  address?: string;
  bookedTutors?: string[];
  paymentHistory?: {
    amount: number;
    date: Date;
    method: "SSLCommerz";
  };
  createdAt: Date;
  updatedAt: Date;
};
