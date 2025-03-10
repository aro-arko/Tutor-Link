"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Tutor {
  id: string;
  tutorImage: string;
  name: string;
  address: string;
  hourlyRate: string;
  phone: string;
  qualification: string;
  rating: number;
  reviews: number;
  coverImage: string;
}

const FeaturedTutorsCard = ({ tutor }: { tutor: Tutor }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300 hover:shadow-lg transition duration-300">
      {/* Cover Image (Like Book Image) */}
      <div className="w-full h-48 relative rounded-md overflow-hidden mb-4">
        <Image
          src={tutor.coverImage}
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

      {/* Tutor Details */}
      <p className="text-lg font-semibold text-gray-900 mt-3">
        Starting from:{" "}
        <span className="text-red-600">{tutor.hourlyRate}/hr</span>
      </p>
      <p className="text-gray-600 text-sm">📞 Mobile: {tutor.phone}</p>
      <p className="text-gray-600 text-sm">
        🎓 Qualification: {tutor.qualification}
      </p>

      {/* Ratings */}
      <div className="flex items-center mt-2">
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
      <Link href={`/tutors/${tutor.id}`}>
        <Button className="mt-4 w-full bg-red-600 text-white py-2 hover:bg-red-700 transition">
          View Details
        </Button>
      </Link>
    </div>
  );
};

export default FeaturedTutorsCard;
