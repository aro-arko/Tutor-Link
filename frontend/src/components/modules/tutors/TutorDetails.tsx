"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { getTutorById } from "@/services/TutorService";
import { getSubjectById } from "@/services/Subjects";
import Link from "next/link";
import { ITutor } from "@/types";

const TutorDetails = () => {
  const { id } = useParams() as { id: string };
  const [tutor, setTutor] = useState<ITutor | null>(null);
  const [subjectNames, setSubjectNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await getTutorById(id);
        setTutor(res.data);
      } catch (error) {
        console.error("Failed to fetch tutor info:", error);
      }
    };

    fetchTutor();
  }, [id]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (tutor) {
        try {
          const subjectNames = await Promise.all(
            tutor.subject.map(async (subjectId: string) => {
              const res = await getSubjectById(subjectId);
              return res.data.name;
            })
          );
          setSubjectNames(subjectNames);
        } catch (error) {
          console.error("Failed to fetch subjects:", error);
        }
      }
    };

    fetchSubjects();
  }, [tutor]);

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
              src={tutor.backgroundImage}
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
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-gray-500 text-sm mt-1">
                  {tutor.phone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-500 text-sm mt-1">
                  {tutor.email}
                </span>
              </div>
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
              {tutor.rating.toFixed(1)} (
              {Array.isArray(tutor.reviews) ? tutor.reviews.length : 0} reviews)
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
              {subjectNames.map((subjectName, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {subjectName}
                </span>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">🕒 Availability:</h3>
            <div className="mt-2">
              {tutor.availability.map((slot, index) => (
                <li key={index} className="mt-1">
                  <span className="font-medium text-gray-700">{slot.day}:</span>{" "}
                  {/* Ensure timeSlots is treated as an array */}
                  {Array.isArray(slot.timeSlots)
                    ? slot.timeSlots.join(", ")
                    : slot.timeSlots}
                </li>
              ))}
            </div>
          </div>

          {/* Contact Button */}
          <div className="mt-6">
            <Link href={`/booking?tutorId=${tutor._id}`}>
              <Button className="w-full bg-red-600 text-white py-2 hover:bg-red-700 transition flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Request a Booking
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
