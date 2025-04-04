import AllStudentTutors from "@/components/modules/studentDashboard/studentTutors/AllStudentTutors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Tutors",
  description: "View all your tutors.",
};

const StudentTutorsPage = () => {
  return (
    <div>
      <AllStudentTutors />
    </div>
  );
};

export default StudentTutorsPage;
