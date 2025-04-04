import StudentProfile from "@/components/modules/student-profile/StudentProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Student Profile",
};

const studentProfilePage = () => {
  return (
    <div>
      <StudentProfile />
    </div>
  );
};

export default studentProfilePage;
