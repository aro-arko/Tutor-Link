"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTutorById } from "@/services/TutorService";
import { getSubjectById } from "@/services/Subjects";
import { getMe, reviewTutor, updateReview } from "@/services/StudentService";
import {
  Calendar,
  MapPin,
  Mail,
  Phone,
  Star,
  GraduationCap,
  Book,
  User,
} from "lucide-react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ITutor } from "@/types";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const TutorDetails = () => {
  const { id } = useParams() as { id: string };
  const [tutor, setTutor] = useState<ITutor | null>(null);
  const [subjectNames, setSubjectNames] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      const res = await getMe();
      setStudentId(res.data._id);
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    if (!studentId) return;

    const fetchTutor = async () => {
      const res = await getTutorById(id);
      setTutor(res.data);

      const existingReview = res.data.reviews.find(
        (review: {
          studentId: string;
          rating: number;
          review: string;
          _id: string;
        }) => review.studentId === studentId
      );

      if (existingReview) {
        setRating(existingReview.rating);
        setReview(existingReview.review);
        setReviewId(existingReview._id);
      } else {
        setRating(0);
        setReview("");
        setReviewId(null);
      }
    };

    fetchTutor();
  }, [id, studentId]);

  useEffect(() => {
    if (!tutor) return;

    const fetchSubjects = async () => {
      const names = await Promise.all(
        tutor.subject.map(async (subjectId: string) => {
          const res = await getSubjectById(subjectId);
          return res.data.name;
        })
      );
      setSubjectNames(names);
    };

    fetchSubjects();
    setLoading(false);
  }, [tutor]);

  const hasReviewed = tutor?.reviews.some(
    (r: { studentId: string; rating: number; review: string; _id: string }) =>
      r.studentId === studentId
  );

  const handleRatingClick = (value: number) => setRating(value);

  const handleReviewSubmit = async () => {
    const payload = { rating, review };
    try {
      const res = hasReviewed
        ? await updateReview(reviewId!, payload)
        : await reviewTutor(id, payload);

      if (res.success) {
        toast.success(
          `Review ${hasReviewed ? "updated" : "submitted"} successfully.`
        );

        // Refresh tutor data to reflect updated review
        const updated = await getTutorById(id);
        setTutor(updated.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!tutor) {
    return <p className="text-center text-gray-600 mt-10">Tutor not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto  space-y-10">
        {/* Tutor Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
            <Image
              src={tutor.tutorImage}
              alt={tutor.name}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            {tutor.name}
          </h1>
          <p className="text-gray-500">🎓 {tutor.qualification}</p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="h-5 w-5" /> Contact Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {renderItem("Email", tutor.email, <Mail />)}
              {renderItem("Phone", tutor.phone, <Phone />)}
              {renderItem("Address", tutor.address, <MapPin />)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="h-5 w-5" /> Teaching Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {renderItem("Hourly Rate", `$${tutor.hourlyRate}`)}
              {renderItem("Rating", `${tutor.rating.toFixed(1)} ⭐`)}
              {renderItem(
                "Subjects",
                subjectNames.join(", ") || "N/A",
                <Book />
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5" /> Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {tutor.availability.length > 0 ? (
                tutor.availability.map((slot) =>
                  renderItem(slot.day, slot.timeSlots)
                )
              ) : (
                <p className="text-gray-500">No availability provided.</p>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" /> About {tutor.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-line">
                {tutor.bio || "No bio provided."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Review Section */}
        <Card className="border border-red-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-red-700">
              <Star className="h-5 w-5" /> {hasReviewed ? "Update" : "Submit"}{" "}
              Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  className={`h-6 w-6 cursor-pointer transition-transform ${
                    star <= rating
                      ? "text-yellow-400 fill-current scale-110"
                      : "text-gray-300 hover:scale-105"
                  }`}
                />
              ))}
            </div>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="border-red-200"
            />
            <Button
              onClick={handleReviewSubmit}
              className="bg-red-600 hover:bg-red-700"
            >
              {hasReviewed ? "Update Review" : "Submit Review"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const renderItem = (
  label: string,
  value: string | number,
  icon?: React.ReactNode
) => (
  <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg">
    {icon && <div className="pt-1">{icon}</div>}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-800 break-words">{value}</p>
    </div>
  </div>
);

export default TutorDetails;
