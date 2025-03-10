"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import tutorData from "@/fakeData/tutorsData.json";
import { Button } from "@/components/ui/button";
import { Star, PhoneCall, MapPin } from "lucide-react";
import Image from "next/image";

interface Tutor {
  id: string;
  tutorImage: string;
  name: string;
  bio: string;
  address: string;
  hourlyRate: string;
  phone: string;
  qualification: string;
  rating: number;
  reviews: number;
  coverImage: string;
  subject: string[];
  availability: { day: string; timeSlots: string[] }[];
}

const TutorDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [tutor, setTutor] = useState<Tutor | null>(null);

  useEffect(() => {
    // Find the tutor based on the ID
    const foundTutor = tutorData.find((t) => t.id === id);
    setTutor(foundTutor || null);
  }, [id]);

  if (!tutor) {
    return <p className="text-center text-gray-600">Tutor not found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cover Image (Left Side) */}
        <div className="lg:w-1/2">
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={tutor.coverImage}
              alt={tutor.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* Tutor Details (Right Side) */}
        <div className="lg:w-1/2">
          {/* Tutor Info */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="h-28 w-28 relative">
              <Image
                src={tutor.tutorImage}
                alt={tutor.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full border-4 border-gray-300"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{tutor.name}</h2>
              <p className="text-gray-600 flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500" /> {tutor.address}
              </p>
              <p className="text-lg font-semibold text-red-600">
                {tutor.hourlyRate} /hr
              </p>
              <p className="text-gray-500 text-sm mt-1">
                🎓 {tutor.qualification}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mt-4">
            <div className="flex">
              {[...Array(Math.floor(tutor.rating))].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <p className="ml-2 text-gray-700 text-sm">
              {tutor.rating.toFixed(1)} ({tutor.reviews.toLocaleString()}{" "}
              reviews)
            </p>
          </div>

          {/* Bio Section */}
          <div className="mt-6 bg-gray-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold">👨‍🏫 About {tutor.name}</h3>
            <p className="text-gray-700 mt-2">{tutor.bio}</p>
          </div>

          {/* Subjects */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">📚 Subjects:</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {tutor.subject.map((subject, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">🕒 Availability:</h3>
            <div className="mt-2">
              {tutor.availability.map((slot, index) => (
                <div key={index} className="p-3 bg-gray-100 rounded-md mb-2">
                  <strong>{slot.day}:</strong>{" "}
                  <span className="text-gray-700">
                    {slot.timeSlots.join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Button */}
          <div className="mt-6">
            <Button className="w-full bg-red-600 text-white py-2 hover:bg-red-700 transition flex items-center gap-2">
              <PhoneCall className="h-5 w-5" />
              Contact {tutor.name}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
