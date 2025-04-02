export type TBooking = {
  _id: string;
  studentId: string;
  tutorId: string;
  subject: string;
  timeSlotId: string;
  sessionStartDate: Date;
  sessionEndDate: Date;
  duration: number;
  approvalStatus: "pending" | "confirmed" | "completed" | "canceled";
  status: "Unpaid" | "Paid";
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  price: number;
  paymentUrl: string;
};
