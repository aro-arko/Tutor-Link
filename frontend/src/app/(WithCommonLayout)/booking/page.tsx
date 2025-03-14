import Booking from "@/components/modules/booking/Booking";
import { Suspense } from "react";

const BookingPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      }
    >
      <Booking />
    </Suspense>
  );
};

export default BookingPage;
