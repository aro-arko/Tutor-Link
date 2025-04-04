import AllTutors from "@/components/modules/tutors/AllTutors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutors",
  description: "Find the best tutors for your learning needs.",
};
import { Suspense } from "react";

const TutorsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen"> </div>
      }
    >
      <AllTutors />
    </Suspense>
  );
};

export default TutorsPage;
