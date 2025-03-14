"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { getAllSubjects } from "@/services/Subjects";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Import the Button component
import { useRouter } from "next/navigation"; // Import useRouter

interface Filters {
  search: string;
  subjects: string[]; // Should store subject IDs
  rating: string;
  hourlyRate: number;
  availability: string;
  location: string;
}

interface TutorFilterProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  handleSubjectChange: (subjectId: string) => void;
}

const initialFilters: Filters = {
  search: "",
  subjects: [],
  rating: "",
  hourlyRate: 50, // Default hourly rate
  availability: "",
  location: "",
};

const TutorFilter: React.FC<TutorFilterProps> = ({
  filters,
  setFilters,
  handleSubjectChange,
}) => {
  const [subs, setSubs] = useState<{ _id: string; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await getAllSubjects();
        setSubs(res.data);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleResetFilters = () => {
    setFilters(initialFilters);
    router.push("/tutors");
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      {/* Subject Filter */}
      <div>
        <h4 className="text-lg font-semibold">Subjects</h4>
        <div className="flex flex-wrap gap-3 mt-2">
          {subs.map((subject) => (
            <div key={subject._id} className="flex items-center gap-2">
              <Checkbox
                id={subject._id}
                checked={filters.subjects.includes(subject._id)}
                onCheckedChange={() => handleSubjectChange(subject._id)}
              />
              <label htmlFor={subject._id} className="text-sm">
                {subject.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="text-lg font-semibold">Rating</h4>
        <Select
          value={filters.rating}
          onValueChange={(value) => setFilters({ ...filters, rating: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="3">3+ Stars</SelectItem>
            <SelectItem value="2">2+ Stars</SelectItem>
            <SelectItem value="1">1+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Hourly Rate Filter */}
      <div>
        <h4 className="text-lg font-semibold">Max Hourly Rate</h4>
        <Slider
          defaultValue={[filters.hourlyRate]}
          max={100}
          step={1}
          onValueChange={(value) =>
            setFilters({ ...filters, hourlyRate: value[0] })
          }
        />
        <p className="text-sm mt-2">Up to ${filters.hourlyRate}/hr</p>
      </div>

      {/* Availability Filter */}
      <div>
        <h4 className="text-lg font-semibold">Availability</h4>
        <Select
          value={filters.availability}
          onValueChange={(value) =>
            setFilters({ ...filters, availability: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Monday">Monday</SelectItem>
            <SelectItem value="Tuesday">Tuesday</SelectItem>
            <SelectItem value="Wednesday">Wednesday</SelectItem>
            <SelectItem value="Thursday">Thursday</SelectItem>
            <SelectItem value="Friday">Friday</SelectItem>
            <SelectItem value="Saturday">Saturday</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Location Filter */}
      <div>
        <h4 className="text-lg font-semibold">Location</h4>
        <Input
          type="text"
          placeholder="Enter location..."
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>

      {/* Reset Filters Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={handleResetFilters}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default TutorFilter;
