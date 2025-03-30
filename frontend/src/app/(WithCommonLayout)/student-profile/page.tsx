import StudentProfile from "@/components/modules/student-profile/StudentProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment",
  description: "Payment page for TutorLink",
};

const studentProfilePage = () => {
  return (
    <div>
      <StudentProfile />
    </div>
  );
};

export default studentProfilePage;
