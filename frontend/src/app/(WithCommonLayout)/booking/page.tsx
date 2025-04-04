import Booking from "@/components/modules/booking/Booking";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Booking",
  description: "Book a session with a tutor.",
};

const BookingPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen"> </div>
      }
    >
      <Booking />
    </Suspense>
  );
};

export default BookingPage;
