"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getSubjectById } from "@/services/Subjects";

interface Tutor {
  _id: string;
  tutorImage: string;
  name: string;
  address: string;
  hourlyRate: string;
  phone: string;
  qualification: string;
  rating: number;
  reviews: number;
  backgroundImage: string;
  subject: string[];
  availability: { day: string; timeSlots: string[] }[];
}

const FeaturedTutorsCard = ({ tutor }: { tutor: Tutor }) => {
  const [subjectNames, setSubjectNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectNames = await Promise.all(
          tutor.subject.map(async (subjectId) => {
            const res = await getSubjectById(subjectId);
            return res.data.name;
          })
        );
        setSubjectNames(subjectNames);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };
    fetchSubjects();
  }, [tutor.subject]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300 hover:shadow-lg transition duration-300">
      {/* Cover Image */}
      <div className="w-full h-48 relative rounded-md overflow-hidden mb-4">
        <Image
          src={tutor.backgroundImage || "/images/tutor-default.jpg"}
          alt={`${tutor.name} Cover`}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      {/* Tutor Info */}
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={tutor.tutorImage} alt={tutor.name} />
          <AvatarFallback>{tutor.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{tutor.name}</h2>
          <p className="text-gray-600 text-sm">{tutor.address}</p>
        </div>
      </div>

      {/* Hourly Rate */}
      <p className="text-lg font-semibold text-gray-900 mt-3">
        Starting from:{" "}
        <span className="text-red-600">{tutor.hourlyRate}/hr</span>
      </p>

      {/* Contact & Qualification */}
      <p className="text-gray-600 text-sm">📞 Mobile: {tutor.phone}</p>
      <p className="text-gray-600 text-sm">
        🎓 Qualification: {tutor.qualification}
      </p>

      {/* Subjects */}
      <div className="mt-3">
        <h4 className="text-sm font-semibold text-gray-700">Subjects:</h4>
        <div className="flex flex-wrap gap-2 mt-1">
          {subjectNames.map((subjectName, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-md"
            >
              {subjectName}
            </span>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mt-3">
        <h4 className="text-sm font-semibold text-gray-700">Availability:</h4>
        <ul className="text-xs text-gray-600 mt-1">
          {tutor.availability.map((slot, index) => (
            <li key={index} className="mt-1">
              <span className="font-medium text-gray-700">{slot.day}:</span>{" "}
              {/* Ensure timeSlots is treated as an array */}
              {Array.isArray(slot.timeSlots)
                ? slot.timeSlots.join(", ")
                : slot.timeSlots}
            </li>
          ))}
        </ul>
      </div>

      {/* Ratings */}
      <div className="flex items-center mt-3">
        <div className="flex">
          {[...Array(Math.floor(tutor.rating))].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="ml-2 text-gray-700 text-sm">
          {tutor.rating.toFixed(1)} ({tutor.reviews.toLocaleString()} reviews)
        </p>
      </div>

      {/* View Details Button */}
      <Link href={`/tutors/${tutor._id}`}>
        <Button className="mt-4 w-full bg-red-600 text-white py-2 hover:bg-red-700 transition">
          View Details
        </Button>
      </Link>
    </div>
  );
};

export default FeaturedTutorsCard;
