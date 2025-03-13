/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSubject } from "@/services/Subjects";
import { toast } from "sonner";

const CreateSubject = () => {
  const [subjectData, setSubjectData] = useState({
    name: "",
    description: "",
    gradeLevel: "bachelors",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSubjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createSubject(subjectData);
      if (response.success) {
        toast.success("Subject created successfully!");
        setSubjectData({
          name: "",
          description: "",
          gradeLevel: "bachelors",
          category: "",
        });
      } else {
        toast.error(response.message || "Failed to create subject");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create a New Subject
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subject Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Name
            </label>
            <Input
              type="text"
              name="name"
              value={subjectData.name}
              onChange={handleChange}
              placeholder="Enter subject name"
              required
              className="w-full bg-white"
            />
          </div>

          {/* Grade Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grade Level
            </label>
            <Select
              value={subjectData.gradeLevel}
              onValueChange={(value) =>
                setSubjectData((prev) => ({ ...prev, gradeLevel: value }))
              }
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Grade Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="bachelors">Bachelors</SelectItem>
                <SelectItem value="post-graduate">Post Graduate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            name="description"
            value={subjectData.description}
            onChange={handleChange}
            placeholder="Enter subject description"
            required
            className="w-full bg-white"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <Input
            type="text"
            name="category"
            value={subjectData.category}
            onChange={handleChange}
            placeholder="Enter subject category"
            required
            className="w-full bg-white"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Subject"}
        </Button>
      </form>
    </div>
  );
};

export default CreateSubject;
