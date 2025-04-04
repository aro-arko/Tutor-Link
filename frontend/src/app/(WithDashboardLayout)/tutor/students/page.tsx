import Students from "@/components/modules/tutorDashboard/students/students";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Students",
  description: "View all your students and their details.",
};

const studentsPage = () => {
  return (
    <div>
      <Students />
    </div>
  );
};

export default studentsPage;
