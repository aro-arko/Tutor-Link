"use client";

import React, { useEffect, useState } from "react";
import { tutorPersonalInfo } from "@/services/TutorService";
import { Alert } from "@/components/ui/alert";
import { Star, Mail, User, MessageCircle } from "lucide-react"; // Import icons

const EarningsReviewsRatings = () => {
  const [personalInfo, setPersonalInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await tutorPersonalInfo();

        // Debugging: Log the response
        console.log("Fetched Personal Info:", response);

        // Ensure response is an object before setting state
        if (response.success) {
          setPersonalInfo(response.data);
        } else {
          console.error("Expected an object but got:", response);
          setPersonalInfo(null); // Fallback to null
        }
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
        setError("Failed to fetch personal info. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-8 w-8"></div>
          <div className="flex-1 space-y-3">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Reviews & Ratings</h1>
      {personalInfo ? (
        <div className="space-y-4">
          {/* Name Card */}
          <div className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-full">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-base font-semibold">{personalInfo.name}</p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 rounded-full">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-base font-semibold">{personalInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Rating Card */}
          <div className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-50 rounded-full">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Rating</p>
                <p className="text-base font-semibold">{personalInfo.rating}</p>
              </div>
            </div>
          </div>

          {/* Reviews Card */}
          <div className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-50 rounded-full">
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Reviews</p>
                <p className="text-base font-semibold">
                  {personalInfo.reviews.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No personal info found.</p>
      )}
    </div>
  );
};

export default EarningsReviewsRatings;
