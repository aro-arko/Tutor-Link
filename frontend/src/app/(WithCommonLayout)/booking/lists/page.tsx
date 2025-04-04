import BookingLists from "@/components/modules/booking/lists/BookingLists";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Lists",
  description: "Booking Lists Page",
};

const BookingListsPage = () => {
  return (
    <div>
      <BookingLists />
    </div>
  );
};

export default BookingListsPage;
