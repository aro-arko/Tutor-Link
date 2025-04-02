"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tutorInfo, updateTutorProfile } from "@/services/TutorService";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { getAllSubjects } from "@/services/Subjects";
import Image from "next/image";

const TutorProfile = () => {
  const [tutorData, setTutorData] = useState({
    name: "",
    email: "",
    bio: "",
    address: "",
    hourlyRate: 0,
    tutorImage: "",
    phone: "",
    subjects: [] as { _id: string; name: string }[],
    qualification: "",
    age: 0,
    availability: [] as { day: string; timeSlots: string }[],
    backgroundImage: "",
  });

  const [allSubjects, setAllSubjects] = useState<
    { _id: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tutorResponse = await tutorInfo();
        if (tutorResponse.success) {
          setTutorData({
            name: tutorResponse.data.name,
            email: tutorResponse.data.email,
            bio: tutorResponse.data.bio,
            address: tutorResponse.data.address,
            hourlyRate: tutorResponse.data.hourlyRate,
            tutorImage: tutorResponse.data.tutorImage,
            phone: tutorResponse.data.phone,
            subjects: tutorResponse.data.subject,
            qualification: tutorResponse.data.qualification,
            age: tutorResponse.data.age,
            availability: tutorResponse.data.availability,
            backgroundImage: tutorResponse.data.backgroundImage,
          });
        } else {
          setError("Failed to fetch tutor information.");
        }

        const subjectsResponse = await getAllSubjects();
        setAllSubjects(subjectsResponse.data);
      } catch (error) {
        setError("Something went wrong. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTutorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (
    index: number,
    field: keyof (typeof tutorData.availability)[0],
    value: string
  ) => {
    const updatedAvailability = [...tutorData.availability];
    updatedAvailability[index][field] = value;
    setTutorData((prev) => ({ ...prev, availability: updatedAvailability }));
  };

  const addAvailability = () => {
    setTutorData((prev) => ({
      ...prev,
      availability: [...prev.availability, { day: "", timeSlots: "" }],
    }));
  };

  const removeAvailability = (index: number) => {
    const updatedAvailability = tutorData.availability.filter(
      (_, i) => i !== index
    );
    setTutorData((prev) => ({ ...prev, availability: updatedAvailability }));
  };

  const addSubject = (subjectId: string) => {
    const subjectToAdd = allSubjects.find(
      (subject) => subject._id === subjectId
    );
    if (subjectToAdd && !tutorData.subjects.some((s) => s._id === subjectId)) {
      setTutorData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, subjectToAdd],
      }));
    }
  };

  const removeSubject = (subjectId: string) => {
    setTutorData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((subject) => subject._id !== subjectId),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedData = {
        name: tutorData.name,
        bio: tutorData.bio,
        address: tutorData.address,
        hourlyRate: tutorData.hourlyRate,
        tutorImage: tutorData.tutorImage,
        phone: tutorData.phone,
        subject: tutorData.subjects.map((subject) => subject._id),
        qualification: tutorData.qualification,
        age: tutorData.age,
        availability: tutorData.availability,
        backgroundImage: tutorData.backgroundImage,
      };

      const response = await updateTutorProfile(updatedData);

      if (response.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-red-200 h-10 w-10"></div>
          <div className="flex-1 space-y-4">
            <div className="h-4 bg-red-200 rounded w-3/4"></div>
            <div className="h-4 bg-red-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="p-6 bg-white border border-red-200 rounded-lg max-w-md text-center">
          <div className="text-red-600 font-medium">{error}</div>
          <Button
            variant="outline"
            className="mt-4 bg-red-50 hover:bg-red-100"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        <Card className="w-full ">
          <CardHeader className="border-b pb-8">
            <div className="flex flex-col items-center space-y-4">
              {tutorData.tutorImage && (
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-100">
                  <Image
                    src={tutorData.tutorImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={128}
                    height={128}
                  />
                </div>
              )}
              <CardTitle className="text-3xl font-bold text-gray-800">
                {tutorData.name}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-8">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 border-red-100">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={tutorData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full "
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={tutorData.email}
                        readOnly
                        className="w-full bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <Input
                        type="text"
                        name="phone"
                        value={tutorData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age
                      </label>
                      <Input
                        type="number"
                        name="age"
                        value={tutorData.age}
                        onChange={handleChange}
                        placeholder="Enter your age"
                        className="w-full"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <Textarea
                        name="bio"
                        value={tutorData.bio}
                        onChange={handleChange}
                        placeholder="Tell students about yourself"
                        className="w-full min-h-[120px]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Qualification
                      </label>
                      <Input
                        type="text"
                        name="qualification"
                        value={tutorData.qualification}
                        onChange={handleChange}
                        placeholder="Your qualifications"
                        className="w-full"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Rates Section */}
              <div className="space-y-8">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 border-red-100">
                  Location & Rates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <Input
                      type="text"
                      name="address"
                      value={tutorData.address}
                      onChange={handleChange}
                      placeholder="Your full address"
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hourly Rate ($)
                    </label>
                    <Input
                      type="number"
                      name="hourlyRate"
                      value={tutorData.hourlyRate}
                      onChange={handleChange}
                      placeholder="Your hourly rate"
                      className="w-full"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Media Section */}
              <div className="space-y-8">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 border-red-100">
                  Profile Media
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Image URL
                    </label>
                    <Input
                      type="text"
                      name="tutorImage"
                      value={tutorData.tutorImage}
                      onChange={handleChange}
                      placeholder="https://example.com/profile.jpg"
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Image URL
                    </label>
                    <Input
                      type="text"
                      name="backgroundImage"
                      value={tutorData.backgroundImage}
                      onChange={handleChange}
                      placeholder="https://example.com/background.jpg"
                      className="w-full"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Subjects Section */}
              <div className="space-y-8">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 border-red-100">
                  Subjects You Teach
                </h3>
                <div className="space-y-4">
                  {tutorData.subjects.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {tutorData.subjects.map((subject) => (
                        <div
                          key={subject._id}
                          className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-full"
                        >
                          <span>{subject.name}</span>
                          <button
                            type="button"
                            onClick={() => removeSubject(subject._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No subjects added yet</p>
                  )}
                  <Select onValueChange={(value) => addSubject(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Add a subject you teach" />
                    </SelectTrigger>
                    <SelectContent>
                      {allSubjects
                        .filter(
                          (subject) =>
                            !tutorData.subjects.some(
                              (s) => s._id === subject._id
                            )
                        )
                        .map((subject) => (
                          <SelectItem key={subject._id} value={subject._id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Availability Section */}
              <div className="space-y-8">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 border-red-100">
                  Availability
                </h3>
                <div className="space-y-4">
                  {tutorData.availability.length > 0 ? (
                    tutorData.availability.map((availability, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Day
                          </label>
                          <Input
                            type="text"
                            value={availability.day}
                            onChange={(e) =>
                              handleAvailabilityChange(
                                index,
                                "day",
                                e.target.value
                              )
                            }
                            placeholder="e.g. Monday"
                            className="w-full"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Time Slots
                          </label>
                          <Input
                            type="text"
                            value={availability.timeSlots}
                            onChange={(e) =>
                              handleAvailabilityChange(
                                index,
                                "timeSlots",
                                e.target.value
                              )
                            }
                            placeholder="e.g. 09:00-12:00, 14:00-17:00"
                            className="w-full"
                            required
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeAvailability(index)}
                          className="h-10 bg-red-50 hover:bg-red-100 text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No availability slots added yet
                    </p>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addAvailability}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Availability Slot
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full py-6 text-lg bg-red-600 hover:bg-red-700"
                >
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TutorProfile;
