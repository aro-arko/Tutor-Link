import StudentDashboard from "@/components/modules/studentDashboard/StudentDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Student Dashboard",
};

const StudentDashboardPage = () => {
  return (
    <div>
      <StudentDashboard />
    </div>
  );
};

export default StudentDashboardPage;
