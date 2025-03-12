"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTutorById } from "@/services/TutorService";
import { getSubjectById } from "@/services/Subjects";
import { ITutor } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Booking = () => {
  const searchParams = useSearchParams();
  const tutorId = searchParams.get("tutorId") as string; // Retrieve `tutorId` from URL
  const [tutor, setTutor] = useState<ITutor | null>(null);
  const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string>("");
  const [sessionStartDate, setSessionStartDate] = useState<string>("");
  const [sessionEndDate, setSessionEndDate] = useState<string>("");

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await getTutorById(tutorId);
        setTutor(res.data);
      } catch (error) {
        console.error("Failed to fetch tutor info:", error);
      }
    };

    fetchTutor();
  }, [tutorId]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (tutor) {
        try {
          const subjectData = await Promise.all(
            tutor.subject.map(async (subjectId) => {
              const res = await getSubjectById(subjectId);
              return { id: subjectId, name: res.data.name };
            })
          );
          setSubjects(subjectData);
          // Set the first subject as default selected
          if (subjectData.length > 0) {
            setSelectedSubjectId(subjectData[0].id);
          }
        } catch (error) {
          console.error("Failed to fetch subjects:", error);
        }
      }
    };

    fetchSubjects();
  }, [tutor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedSubjectId ||
      !selectedTimeSlotId ||
      !sessionStartDate ||
      !sessionEndDate
    ) {
      alert("Please fill out all fields.");
      return;
    }

    // Format dates with static times and remove milliseconds
    const formattedStartDate = `${sessionStartDate}T01:00:00Z`;
    const formattedEndDate = `${sessionEndDate}T23:59:00Z`;

    // Prepare the booking data
    const bookingData = {
      tutorId: tutorId,
      subjectId: selectedSubjectId,
      timeSlotId: selectedTimeSlotId,
      sessionStartDate: formattedStartDate,
      sessionEndDate: formattedEndDate,
    };

    // Log the booking data (replace with API call)
    console.log("Booking Data:", bookingData);
    alert("Booking submitted successfully!");
  };

  if (!tutor) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Booking</h1>
      <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Tutor Details
          </CardTitle>
          <CardDescription className="text-gray-600">
            Review the tutor&apos;s information before booking.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-gray-700">
                <strong>Name:</strong> {tutor.name}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>Email:</strong> {tutor.email}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>Phone:</strong> {tutor.phone}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Form */}
      <Card className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Book a Session
          </CardTitle>
          <CardDescription className="text-gray-600">
            Fill out the form to book a session with the tutor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject Selection */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-gray-700">
                Select Subject
              </Label>
              <Select
                value={selectedSubjectId}
                onValueChange={(value) => setSelectedSubjectId(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-2">
              <Label htmlFor="timeSlot" className="text-gray-700">
                Select Time Slot
              </Label>
              <Select
                value={selectedTimeSlotId}
                onValueChange={(value) => setSelectedTimeSlotId(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {tutor.availability.map((slot) => (
                    <SelectItem key={slot.day} value={slot.day}>
                      {slot.day}: {slot.timeSlots}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Session Start Date */}
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-gray-700">
                Session Start Date
              </Label>
              <Input
                type="date"
                id="startDate"
                value={sessionStartDate}
                onChange={(e) => setSessionStartDate(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {/* Session End Date */}
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-gray-700">
                Session End Date
              </Label>
              <Input
                type="date"
                id="endDate"
                value={sessionEndDate}
                onChange={(e) => setSessionEndDate(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {/* Submit Button */}
            <CardFooter className="flex justify-end p-0">
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
              >
                Book Now
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Booking;
