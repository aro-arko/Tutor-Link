import StudentDetails from "@/components/modules/tutorDashboard/students/StudentDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Details",
  description: "View detailed information about the student.",
};

const studentDetailsPage = () => {
  return (
    <div>
      <StudentDetails />
    </div>
  );
};

export default studentDetailsPage;
