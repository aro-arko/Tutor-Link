"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import FeaturedTutorsCard from "./FeaturedTutorsCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAllTutors } from "@/services/TutorService";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const FeaturedTutors = () => {
  const [tutorData, setTutorData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const response = await getAllTutors();
        setTutorData(response.data);
      } catch (error) {
        console.error("Failed to fetch tutors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const displayedTutors = tutorData.slice(0, 6);

  return (
    <section className="pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Featured Tutors
          </h2>
          <p className="text-gray-600 mt-2">
            Every instructor is professional and highly qualified.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {displayedTutors.map((tutor) => (
                <FeaturedTutorsCard key={tutor._id} tutor={tutor} />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <Link href="/tutors">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-6 text-lg">
                  Explore More Tutors
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedTutors;
