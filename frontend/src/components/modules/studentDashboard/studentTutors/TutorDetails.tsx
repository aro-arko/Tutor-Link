/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { getTutorById } from "@/services/TutorService";
import { getSubjectById } from "@/services/Subjects";
import { Textarea } from "@/components/ui/textarea";
import { ITutor } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMe, reviewTutor, updateReview } from "@/services/StudentService";
import { toast } from "sonner";

const TutorDetails = () => {
  const { id } = useParams() as { id: string };
  const [tutor, setTutor] = useState<(ITutor & { reviews: [] }) | null>(null);
  const [subjectNames, setSubjectNames] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reviewId, setReviewId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await getMe();
        setStudentId(res.data._id);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await getTutorById(id);
        setTutor(res.data);
        const existingReview = res.data.reviews.find(
          (review: {
            studentId: string;
            _id: string;
            rating: number;
            review: string;
          }) => review.studentId === studentId
        );
        if (existingReview) {
          setRating(existingReview.rating);
          setReview(existingReview.review);
          setReviewId(existingReview._id);
        }
      } catch (error) {
        console.error("Failed to fetch tutor info:", error);
      }
    };

    if (studentId) {
      fetchTutor();
    }
  }, [id, studentId]);

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

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmitReview = async () => {
    const reviewData = {
      rating,
      review,
    };

    try {
      const res = await reviewTutor(id, reviewData);

      if (res.success) {
        toast.success("Review submitted successfully.");
      } else {
        toast.error("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  if (!tutor) {
    return <p className="text-center text-gray-600">Tutor not found.</p>;
  }

  const hasReviewed = tutor.reviews.some(
    (review: any) => review.studentId === studentId
  );

  const handleUpdateReview = async () => {
    const updateReviewData = {
      rating,
      review,
    };
    const existingReview = tutor.reviews.find(
      (review: {
        studentId: string;
        _id: string;
        rating: number;
        review: string;
      }) => review.studentId === studentId
    ) as
      | { studentId: string; _id: string; rating: number; review: string }
      | undefined;

    try {
      const res = await updateReview(existingReview!._id, updateReviewData);

      if (res.success) {
        toast.success("Review updated successfully.");
      } else {
        toast.error("Failed to update review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }

    console.log(existingReview?._id);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Tutor Profile Card */}
      <Card className="bg-red-50 border border-red-200 shadow-md">
        <CardHeader className="bg-red-600 text-white py-6 rounded-t-md">
          <CardTitle className="text-2xl font-bold">{tutor.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Tutor Image & Info */}
            <div className="lg:w-1/3 flex flex-col items-center text-center">
              <div className="h-32 w-32 relative">
                <Image
                  src={tutor.tutorImage}
                  alt={tutor.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-gray-300"
                />
              </div>
              <p className="text-lg font-semibold text-red-600 mt-4">
                {tutor.hourlyRate} /hr
              </p>
              <p className="text-gray-500 text-sm mt-1">
                🎓 {tutor.qualification}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{tutor.address}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{tutor.phone}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{tutor.email}</span>
              </div>
            </div>

            {/* Tutor Details */}
            <div className="lg:w-2/3">
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(Math.floor(tutor.rating))].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current hover:scale-110 transition-transform"
                    />
                  ))}
                </div>
                <p className="ml-2 text-gray-700 text-sm">
                  {tutor.rating.toFixed(1)} (
                  {Array.isArray(tutor.reviews) ? tutor.reviews.length : 0}{" "}
                  reviews)
                </p>
              </div>

              {/* Bio Section */}
              <div className="p-4 bg-white border border-red-200 rounded-lg">
                <h3 className="text-lg font-semibold text-red-700">
                  👨‍🏫 About {tutor.name}
                </h3>
                <p className="text-gray-700 mt-2">{tutor.bio}</p>
              </div>

              {/* Subjects */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-red-700">
                  📚 Subjects:
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {subjectNames.map((subjectName, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full"
                    >
                      {subjectName}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-red-700">
                  🕒 Availability:
                </h3>
                <div className="mt-2">
                  {tutor.availability.map((slot, index) => (
                    <li key={index} className="mt-1">
                      <span className="font-medium text-gray-700">
                        {slot.day}:
                      </span>{" "}
                      {slot.timeSlots}
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Section */}
      <Card className="mt-8 bg-red-50 border border-red-200 shadow-md">
        <CardHeader className="py-4 bg-red-600 text-white rounded-t-md">
          <CardTitle className="text-lg font-bold">
            {hasReviewed ? "🌟 Update Your Review" : "🌟 Leave a Review"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 cursor-pointer transition-transform ${
                  star <= rating
                    ? "text-yellow-400 fill-current scale-110"
                    : "text-gray-300 hover:scale-105"
                }`}
                onClick={() => handleRatingClick(star)}
              />
            ))}
          </div>
          <Textarea
            className="mt-4 border border-red-200"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          {hasReviewed ? (
            <Button
              className="mt-4 bg-red-600 hover:bg-red-700"
              onClick={handleUpdateReview}
            >
              Update Review
            </Button>
          ) : (
            <Button
              className="mt-4 bg-red-600 hover:bg-red-700"
              onClick={handleSubmitReview}
            >
              Submit Review
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorDetails;
