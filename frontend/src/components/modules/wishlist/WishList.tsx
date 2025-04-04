"use client";

import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "@/services/CartService";
import { getSubjectById } from "@/services/Subjects";
import { TCart } from "@/types/cart.type";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock, MapPin, Calendar, Trash } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Button } from "@/components/ui/button";

const WishList = () => {
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState<
    (TCart & { subjectNames: string[] })[]
  >([]);

  useEffect(() => {
    const fetchCartWithSubjects = async () => {
      try {
        const res = await getCart();
        if (res?.success) {
          const cartItems: TCart[] = res.data;

          const enriched = await Promise.all(
            cartItems.map(async (item) => {
              const subjectNames = await Promise.all(
                item.tutorId.subject.map(async (subjectId: string) => {
                  const res = await getSubjectById(subjectId);
                  return res.data?.name || "Unknown Subject";
                })
              );
              return { ...item, subjectNames };
            })
          );

          setCartData(enriched);
        } else {
          toast.error("Failed to fetch wishlist.");
        }
      } catch (error) {
        console.error("Wishlist fetch error:", error);
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartWithSubjects();
  }, []);

  const handleRemove = async (cartId: string) => {
    try {
      await removeFromCart(cartId);
      setCartData((prev) => prev.filter((item) => item._id !== cartId));
      toast.success("Removed from wishlist.");
    } catch (error) {
      console.error("Remove failed:", error);
      toast.error("Failed to remove from wishlist.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Wishlist</h1>

      {cartData.length === 0 ? (
        <p className="text-center text-gray-500">No tutors in wishlist.</p>
      ) : (
        <ul className="space-y-5">
          {cartData.map((item) => {
            const tutor = item.tutorId;

            return (
              <li
                key={item._id}
                className="p-5 bg-white border rounded-lg shadow-sm hover:shadow-md transition relative"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex gap-4 flex-1">
                    {/* Tutor Image */}
                    <div className="relative w-28 h-28 rounded-lg overflow-hidden border shadow-sm">
                      <Image
                        src={tutor.tutorImage}
                        alt={tutor.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      <InfoBlock
                        icon={<MapPin className="w-5 h-5 text-blue-600" />}
                        label={tutor.name}
                        value={tutor.address}
                      />
                      <InfoBlock
                        icon={<BookOpen className="w-5 h-5 text-red-600" />}
                        label="Subjects"
                        value={
                          item.subjectNames.length > 0
                            ? item.subjectNames.join(", ")
                            : "Not Listed"
                        }
                      />
                      <InfoBlock
                        icon={<Clock className="w-5 h-5 text-purple-600" />}
                        label="Availability"
                        value={
                          tutor.availability.length > 0
                            ? tutor.availability
                                .map((slot) => `${slot.day}: ${slot.timeSlots}`)
                                .join(" | ")
                            : "No Availability"
                        }
                      />
                      <InfoBlock
                        icon={<Calendar className="w-5 h-5 text-yellow-600" />}
                        label="Hourly Rate"
                        value={`$${tutor.hourlyRate}/hr`}
                      />
                    </div>
                  </div>

                  {/* Action */}
                  <div className="min-w-[200px] flex flex-row justify-end items-center gap-3 mt-4 md:mt-0">
                    <Link
                      href={`/tutors/${tutor._id}`}
                      className="text-sm text-blue-600 bg-blue-100 rounded-full px-4 py-2 font-medium"
                    >
                      View Profile
                    </Link>

                    <Link href={`/booking?tutorId=${tutor._id}`}>
                      <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full text-sm px-4 py-2">
                        Book Now
                      </Button>
                    </Link>

                    <button
                      onClick={() => handleRemove(item._id)}
                      title="Remove from Wishlist"
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <Trash className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const InfoBlock = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-base text-gray-800 break-words">{value}</p>
    </div>
  </div>
);

export default WishList;
