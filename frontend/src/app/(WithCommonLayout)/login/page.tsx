import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
