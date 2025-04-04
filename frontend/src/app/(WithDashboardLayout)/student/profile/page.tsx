import StudentProfile from "@/components/modules/studentDashboard/profile/StudentProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "View your profile.",
};

const StudenProfilePage = () => {
  return (
    <div>
      <StudentProfile />
    </div>
  );
};

export default StudenProfilePage;
