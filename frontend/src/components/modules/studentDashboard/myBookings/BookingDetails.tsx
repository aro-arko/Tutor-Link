"use client";

import { getTutorById } from "@/services/TutorService";
import { getSubjectById } from "@/services/Subjects";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, Mail, Phone, MapPin, Book, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { getBookingById } from "@/services/StudentService";
import { TBooking } from "@/types/booking";
import { ITutor } from "@/types";

const BookingDetails = () => {
  const { id } = useParams() as { id: string };
  const [booking, setBooking] = useState<TBooking | null>(null);
  const [tutor, setTutor] = useState<ITutor | null>(null);
  const [subjectName, setSubjectName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await getBookingById(id);
        if (res.success) {
          setBooking(res.data);

          const [tutorRes, subjectRes] = await Promise.all([
            getTutorById(res.data.tutorId),
            getSubjectById(res.data.subject),
          ]);

          setTutor(tutorRes.data);
          setSubjectName(subjectRes.data.name);
        } else {
          setError("Failed to fetch booking details");
        }
      } catch (err) {
        setError("Error fetching booking details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBookingDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="p-4 bg-red-50 text-center rounded-lg max-w-md mx-auto mt-10">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  if (!booking || !tutor)
    return (
      <div className="p-4 bg-gray-50 text-center rounded-lg max-w-md mx-auto mt-10">
        <p className="text-gray-600">Booking or tutor information not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen md:bg-gray-50 rounded-lg py-12 px-1 md:px-4">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left - Booking Info */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderItem("Booking ID", booking._id)}
              {renderItem(
                "Session",
                `${new Date(
                  booking.sessionStartDate
                ).toLocaleDateString()} - ${new Date(
                  booking.sessionEndDate
                ).toLocaleDateString()}`,
                <Calendar />
              )}
              {renderItem("Subject", subjectName, <Book />)}
              {renderItem(
                "Status",
                booking.status,
                statusBadge(booking.status)
              )}
              {renderItem(
                "Approval",
                booking.approvalStatus || "Pending",
                approvalBadge(booking.approvalStatus)
              )}
              {renderItem("Price", `$${booking.price}`)}
              {renderItem("Transaction", booking.transaction?.id || "N/A")}
            </CardContent>
          </Card>
        </div>

        {/* Right - Tutor Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <User className="h-5 w-5" /> Tutor Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-300 shadow">
                  <Image
                    src={tutor.tutorImage}
                    alt={tutor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mt-2">
                  {tutor.name}
                </h2>
                <p className="text-sm text-gray-500">{tutor.qualification}</p>
              </div>
              <div className="space-y-3">
                {renderItem("Email", tutor.email, <Mail />)}
                {renderItem("Phone", tutor.phone, <Phone />)}
                {renderItem("Address", tutor.address, <MapPin />)}
                {renderItem("Hourly Rate", `$${tutor.hourlyRate}`)}
              </div>
            </CardContent>
          </Card>
        </div>
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

const statusBadge = (status: string) => {
  const map: Record<"Paid" | "Pending" | "Unpaid", string> = {
    Paid: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Unpaid: "bg-red-100 text-red-600",
  };
  return (
    <span
      className={`px-2 py-1 text-sm rounded-full ${
        map[status as keyof typeof map] || ""
      }`}
    >
      {status}
    </span>
  );
};

const approvalBadge = (
  status: "confirmed" | "completed" | "canceled" | "pending"
) => {
  const map = {
    confirmed: "bg-green-100 text-green-600",
    completed: "bg-blue-100 text-blue-600",
    canceled: "bg-red-100 text-red-600",
    pending: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`px-2 py-1 text-sm rounded-full ${
        map[status] || map["pending"]
      }`}
    >
      {status || "Pending"}
    </span>
  );
};

export default BookingDetails;
