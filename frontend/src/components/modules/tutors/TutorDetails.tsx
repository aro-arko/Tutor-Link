"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Star,
  MapPin,
  Calendar,
  Phone,
  Mail,
  BookOpen,
  Clock,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import { getTutorById } from "@/services/TutorService";
import { getSubjectById } from "@/services/Subjects";
import Link from "next/link";
import { ITutor } from "@/types";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useUser } from "@/context/UserContext";
import Cookies from "js-cookie";
import { addToCart, getCart, removeFromCart } from "@/services/CartService";
import { toast } from "sonner";

const TutorDetails = () => {
  const { id } = useParams() as { id: string };
  const [tutor, setTutor] = useState<ITutor | null>(null);
  const [subjectNames, setSubjectNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await getTutorById(id);
        setTutor(res.data);

        if (!user) {
          Cookies.set("tutorId", id, { expires: 1 });
        }
      } catch (error) {
        console.error("Failed to fetch tutor info:", error);
      }
    };

    fetchTutor();
  }, [id, user]);

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
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSubjects();
  }, [tutor]);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!user || !tutor?._id) return;

      try {
        const res = await getCart();
        if (res?.success) {
          const found = res.data.find(
            (item: any) => item.tutorId._id === tutor._id
          );
          if (found) {
            setIsWishlisted(true);
            setCartId(found._id);
          }
        }
      } catch (error) {
        console.error("Wishlist check failed", error);
      }
    };

    checkWishlistStatus();
  }, [user, tutor?._id]);

  const toggleWishlist = async () => {
    try {
      if (!user?.role || user.role !== "student") {
        toast.error("Please login as student to manage wishlist.");
        return;
      }

      if (isWishlisted && cartId) {
        await removeFromCart(cartId);
        setIsWishlisted(false);
        setCartId(null);
        window.dispatchEvent(new Event("cart-updated"));
        toast.success("Removed from wishlist.");
      } else {
        const res = await addToCart(tutor!._id);
        setIsWishlisted(true);
        setCartId(res.data._id);
        window.dispatchEvent(new Event("cart-updated"));
        toast.success("Added to wishlist.");
      }
    } catch (error: any) {
      toast.error(error.message || "Action failed.");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!tutor) {
    return <p className="text-center text-gray-600">Tutor not found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-12">
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Cover Image and Bio */}
        <div className="lg:w-1/2 flex flex-col gap-8">
          {/* Cover Image */}
          <div className="relative w-full h-48 md:h-80 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={tutor.backgroundImage}
              alt={tutor.name}
              layout="fill"
              objectFit="cover"
              className=""
            />
          </div>

          {/* Bio Section */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-red-600" />
              About {tutor.name}
            </h3>
            <p className="text-gray-700 leading-relaxed">{tutor.bio}</p>
          </div>
        </div>

        {/* Right Side - Tutor Details */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          {/* Tutor Profile Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="h-28 w-28 relative shrink-0">
                <Image
                  src={tutor.tutorImage}
                  alt={tutor.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-white shadow-md"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {tutor.name}
                </h2>
                <p className="text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4 text-gray-500" /> {tutor.address}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-lg font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                    ${tutor.hourlyRate}/hr
                  </p>
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                    <div className="flex mr-1">
                      {[...Array(Math.floor(tutor.rating))].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {tutor.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <GraduationCap className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {tutor.qualification}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{tutor.phone}</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg sm:col-span-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{tutor.email}</span>
              </div>
            </div>
          </div>

          {/* Subjects Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-red-600" />
              Subjects Offered
            </h3>
            <div className="flex flex-wrap gap-3">
              {subjectNames.map((subjectName, index) => (
                <span
                  key={index}
                  className="bg-red-50 text-gray-900 text-sm px-4 py-2 rounded-full font-medium"
                >
                  {subjectName}
                </span>
              ))}
            </div>
          </div>

          {/* Availability Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-red-600" />
              Availability
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tutor.availability.map((slot, index) => (
                <div key={index} className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-800">{slot.day}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {Array.isArray(slot.timeSlots)
                      ? slot.timeSlots.join(", ")
                      : slot.timeSlots}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Button */}
          {user?.role === "student" && (
            <div className="mt-4 space-y-2">
              <div>
                <Link href={`/booking?tutorId=${tutor._id}`}>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg shadow-lg transition-all hover:shadow-xl flex items-center justify-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Book a Session
                  </Button>
                </Link>
              </div>
              <div>
                <Button
                  variant="outline"
                  onClick={toggleWishlist}
                  className="w-full text-red-600 border-red-600 hover:text-red-700"
                >
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
