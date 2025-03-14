import ActiveBookings from "./activeBookings/ActiveBookings";
import EditProfile from "./editProfile/EditProfile";

const StudentDashboard = () => {
  return (
    <div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-2 mt-8">
        {/* Active Sessions Card */}
        <div className="rounded-xl bg-red-50 border border-red-100 h-auto md:h-[450px] overflow-y-auto">
          <ActiveBookings />
        </div>

        {/* Earnings */}
        <div className="rounded-xl bg-red-50 border border-red-100 h-auto md:h-[450px] overflow-y-auto">
          <EditProfile />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
