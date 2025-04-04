import StudentRegisterForm from "@/components/modules/auth/student-register/StudentRegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register as a student",
};

const StudentRegisterPage = () => {
  return (
    <div>
      <StudentRegisterForm />
    </div>
  );
};

export default StudentRegisterPage;
