import TutorProfile from "@/components/modules/tutorDashboard/profile/TutorProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Tutor Profile Page",
};

const ProfilePage = () => {
  return (
    <div>
      <TutorProfile />
    </div>
  );
};

export default ProfilePage;
