import TutorRegisterForm from "@/components/modules/auth/tutor-register/TutorRegisterFrom";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register as a tutor",
};

const StudentRegisterPage = () => {
  return (
    <div>
      <TutorRegisterForm />
    </div>
  );
};

export default StudentRegisterPage;
