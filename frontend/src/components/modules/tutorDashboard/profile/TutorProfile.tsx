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
  >([]); // Store all available subjects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tutor info and all subjects
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tutor info
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

        // Fetch all subjects
        const subjectsResponse = await getAllSubjects();
        setAllSubjects(subjectsResponse.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Something went wrong. Please try again.");
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
      // Prepare the data to be submitted
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

      console.log(updatedData);
      const response = await updateTutorProfile(updatedData);
      console.log(response);

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
      <div className="flex items-center justify-center h-40 bg-red-50">
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
      <div className="p-4 bg-red-50">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 rounded-2xl bg-red-50">
      {" "}
      {/* Light red background for the entire page */}
      <div className="flex justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Tutor Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <Textarea
                  name="bio"
                  value={tutorData.bio}
                  onChange={handleChange}
                  placeholder="Enter your bio"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <Input
                  type="text"
                  name="address"
                  value={tutorData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                />
              </div>

              {/* Hourly Rate and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hourly Rate
                  </label>
                  <Input
                    type="number"
                    name="hourlyRate"
                    value={tutorData.hourlyRate}
                    onChange={handleChange}
                    placeholder="Enter hourly rate"
                    required
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
                    required
                  />
                </div>
              </div>

              {/* Tutor Image and Background Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tutor Image URL
                  </label>
                  <Input
                    type="text"
                    name="tutorImage"
                    value={tutorData.tutorImage}
                    onChange={handleChange}
                    placeholder="Enter tutor image URL"
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
                    placeholder="Enter background image URL"
                    required
                  />
                </div>
              </div>

              {/* Subjects */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subjects
                </label>
                <div className="space-y-2">
                  {/* Display selected subjects */}
                  {tutorData.subjects.map((subject) => (
                    <div
                      key={subject._id}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <span>{subject.name}</span>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeSubject(subject._id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  ))}
                  {/* Dropdown to add new subjects */}
                  <Select onValueChange={(value) => addSubject(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Add a subject" />
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

              {/* Qualification and Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification
                  </label>
                  <Input
                    type="text"
                    name="qualification"
                    value={tutorData.qualification}
                    onChange={handleChange}
                    placeholder="Enter your qualification"
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
                    required
                  />
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                {tutorData.availability.map((availability, index) => (
                  <div key={index} className="flex gap-4 items-end mb-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Day
                      </label>
                      <Input
                        type="text"
                        value={availability.day}
                        onChange={(e) =>
                          handleAvailabilityChange(index, "day", e.target.value)
                        }
                        placeholder="Enter day (e.g., Monday)"
                        required
                      />
                    </div>
                    <div className="flex-1">
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
                        placeholder="Enter time slots (e.g., 09:00-11:00)"
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => removeAvailability(index)}
                      className="mb-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAvailability}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Availability
                </Button>
              </div>

              {/* Update Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TutorProfile;
