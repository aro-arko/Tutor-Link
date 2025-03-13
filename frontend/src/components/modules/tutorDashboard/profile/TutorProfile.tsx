"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { tutorInfo } from "@/services/TutorService";
import { toast } from "sonner";

const TutorProfile = () => {
  const [tutorData, setTutorData] = useState({
    name: "",
    email: "",
    bio: "",
    address: "",
    hourlyRate: 0,
    phone: "",
    qualification: "",
    experience: 0,
    age: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTutorInfo = async () => {
      try {
        const response = await tutorInfo();
        if (response.success) {
          setTutorData({
            name: response.data.name,
            email: response.data.email,
            bio: response.data.bio,
            address: response.data.address,
            hourlyRate: response.data.hourlyRate,
            phone: response.data.phone,
            qualification: response.data.qualification,
            experience: response.data.experience,
            age: response.data.age,
          });
        } else {
          setError("Failed to fetch tutor information.");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTutorInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTutorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add API call to update tutor info here
      console.log("Updated Tutor Data:", tutorData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

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
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tutor Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
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
              className="w-full"
            />
          </div>

          {/* Email (Immutable) */}
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
            className="w-full"
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
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hourly Rate */}
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
              className="w-full"
            />
          </div>

          {/* Phone */}
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
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Qualification */}
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
              className="w-full"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience (Years)
            </label>
            <Input
              type="number"
              name="experience"
              value={tutorData.experience}
              onChange={handleChange}
              placeholder="Enter years of experience"
              required
              className="w-full"
            />
          </div>
        </div>

        {/* Age */}
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
            className="w-full"
          />
        </div>

        {/* Update Button */}
        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700"
          disabled={loading}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default TutorProfile;
