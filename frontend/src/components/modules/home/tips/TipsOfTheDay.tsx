"use client";

import { getTips } from "@/services/TipsService";
import { TTips } from "@/types/tips";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const TipsOfTheDay = () => {
  const [tips, setTips] = useState<TTips[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const data = await getTips();
        setTips(data);
      } catch (error) {
        console.error("Error fetching tips:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTips();
  }, []);

  const tutor = tips[0]?.tutorId;
  const { _id, name, tutorImage } = tutor || {};
  const { tip } = tips[0] || {};

  if (loading) {
    return (
      <section className="pt-16 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
            Tip of the Day
          </h2>

          <div className="relative bg-white p-8 rounded-xl shadow-md border border-gray-200 flex flex-col items-center text-center">
            <Quote className="absolute top-10 left-10 text-gray-300 w-6 h-6 rotate-180" />

            <Skeleton className="w-24 h-24 rounded-full mb-4" />

            <Skeleton className="h-5 w-40 mb-2 rounded" />

            <div className="mt-4 flex flex-col gap-2 max-w-xl mx-auto">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-16 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
          Tip of the Day
        </h2>

        {tutor && (
          <div className="relative bg-white p-8 rounded-xl shadow-md border border-gray-200 flex flex-col items-center text-center">
            {/* Quotation mark top-left */}
            <Quote className="absolute top-10 left-10 text-red-500 w-6 h-6 rotate-180" />
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-red-100 shadow-sm mb-4">
              <Image
                src={tutorImage}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <Link
              href={`/tutors/${_id}`}
              className="text-lg font-semibold text-gray-800 hover:underline"
            >
              {name}
            </Link>
            <p className="mt-4 text-gray-600 italic max-w-2xl mx-auto text-base leading-relaxed">
              “{tip}”
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TipsOfTheDay;
