"use client";

import { useEffect, useState } from "react";
import { getSubjectById } from "@/services/Subjects";
import { getCart, addToCart, removeFromCart } from "@/services/CartService";
import { Heart, Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { toast } from "sonner";
import { TCart } from "@/types/cart.type";

interface Tutor {
  _id: string;
  tutorImage: string;
  name: string;
  address: string;
  hourlyRate: string;
  phone: string;
  qualification: string;
  rating: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
  backgroundImage: string;
  subject: string[];
  availability: { day: string; timeSlots: string[] }[];
}

const FeaturedTutorsCard = ({ tutor }: { tutor: Tutor }) => {
  const [subjectNames, setSubjectNames] = useState<string[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null); // needed for removal

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

    const checkIfInCart = async () => {
      try {
        const res = await getCart();
        if (res?.success) {
          const cart = res.data;
          const matched = cart.find(
            (item: TCart) => item.tutorId._id === tutor._id
          );
          if (matched) {
            setIsWishlisted(true);
            setCartId(matched._id); // Save cart ID for removal
          }
        }
      } catch (error) {
        console.error("Error checking cart:", error);
      }
    };

    fetchSubjects();
    checkIfInCart();
  }, [tutor._id, tutor.subject]);

  const toggleWishlist = async () => {
    try {
      if (isWishlisted && cartId) {
        await removeFromCart(cartId);
        setIsWishlisted(false);
        setCartId(null);
        toast.success("Removed from wishlist.");
      } else {
        const res = await addToCart(tutor._id);
        setIsWishlisted(true);
        setCartId(res.data._id); // Update cartId after adding
        toast.success("Added to wishlist!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to update wishlist.");
    }
  };

  return (
    <div className="relative shadow-md rounded-lg border border-gray-300 hover:shadow-lg transition duration-300 flex flex-col h-full">
      <div className="p-4 bg-white rounded-lg flex flex-col h-full">
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
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {tutor.name}
              </h2>
              <button
                onClick={toggleWishlist}
                className="text-red-500 hover:scale-110 transition"
                title={
                  isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                }
              >
                <Heart
                  className={clsx("w-5 h-5", {
                    "fill-red-500": isWishlisted,
                    "fill-transparent": !isWishlisted,
                  })}
                />
              </button>
            </div>
            <p className="text-gray-600 text-sm">{tutor.address}</p>
          </div>
        </div>

        {/* Hourly Rate */}
        <p className="text-lg font-semibold text-gray-900 mt-3">
          Starting from:{" "}
          <span className="text-red-600">${tutor.hourlyRate}/hr</span>
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

        {/* Ratings */}
        <div className="flex items-center mt-3">
          <div className="flex">
            {[...Array(Math.floor(tutor.rating))].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="ml-2 text-gray-700 text-sm">
            {tutor.rating.toFixed(1)} ({tutor.reviews?.length || 0} reviews)
          </p>
        </div>

        {/* Push button to bottom */}
        <div className="flex-grow" />

        {/* View Profile Button */}
        <Link href={`/tutors/${tutor._id}`}>
          <Button className="mt-4 w-full bg-red-600 text-white py-2 hover:bg-red-700 transition">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedTutorsCard;
