import AllTutors from "@/components/modules/tutors/AllTutors";
import { Suspense } from "react";

const TutorsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      }
    >
      <AllTutors />
    </Suspense>
  );
};

export default TutorsPage;
