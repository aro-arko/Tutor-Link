import ActiveSessions from "./activeSessions/ActiveSessions";
import EarningsReviewsRatings from "./earnings-reviews-ratings/EarningsReviewsRatings";

const TutorDashboard = () => {
  return (
    <div>
      {/* Grid for the top section */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {/* Active Sessions Card */}
        <div className="rounded-xl bg-red-50 border border-red-100 h-[400px] overflow-y-auto">
          <ActiveSessions />
        </div>

        {/* Earnings, Reviews & Ratings Card */}
        <div className="rounded-xl bg-red-50 border border-red-100 h-[400px] overflow-y-auto">
          <EarningsReviewsRatings />
        </div>

        {/* Placeholder Card */}
        <div className="rounded-xl bg-muted h-[400px]"></div>
      </div>

      {/* Bottom Section */}
      <div className="min-h-[100vh] rounded-xl bg-muted mt-4"></div>
    </div>
  );
};

export default TutorDashboard;
