import TutorProfile from "@/components/modules/tutor-profile/TutorProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutor Profile",
  description: "Profile page for TutorLink tutors",
};

const tutorProfilePage = () => {
  return (
    <div>
      <TutorProfile />
    </div>
  );
};

export default tutorProfilePage;
