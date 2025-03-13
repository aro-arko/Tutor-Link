import ActiveSessions from "./activeSessions/ActiveSessions";
import BookingApproval from "./booking-approval/BookingApproval";
import CreateSubject from "./createSubject/CreateSubject";
import EarningsReviewsRatings from "./earnings-reviews-ratings/EarningsReviewsRatings";
import TotalEarning from "./totalEarnings/TotalEarning";

const TutorDashboard = () => {
  return (
    <div>
      {/* Grid for the top section */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {/* Active Sessions Card */}
        <div className="rounded-xl bg-red-50 border border-red-100 h-[400px] overflow-y-auto">
          <ActiveSessions />
        </div>

        {/* Reviews & Ratings Card */}
        <div className="rounded-xl bg-red-50 border border-red-100 h-auto md:h-[400px] overflow-y-auto">
          <EarningsReviewsRatings />
        </div>
        {/* booking status update */}
        <div className="rounded-xl bg-red-50 border border-red-100 h-auto md:h-[400px] overflow-y-auto">
          <BookingApproval />
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-2 mt-8">
        {/* Active Sessions Card */}
        <div className="rounded-xl bg-red-50 border border-red-100 h-auto md:h-[450px] overflow-y-auto">
          <CreateSubject />
        </div>

        {/* Earnings */}
        <div className="rounded-xl bg-red-50 border border-red-100 h-auto md:h-[450px] overflow-y-auto">
          <TotalEarning />
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
