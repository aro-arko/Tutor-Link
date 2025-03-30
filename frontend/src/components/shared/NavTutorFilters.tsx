"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

interface Filters {
  search: string;
  subjects: string[];
  rating: string;
  hourlyRate: number;
  availability: string;
  location: string;
}

interface INavTutorFiltersProps {
  subjects: { _id: string; name: string }[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  onSearch: () => void;
}

export default function NavTutorFilters({
  subjects,
  filters,
  setFilters,
  onSearch,
}: INavTutorFiltersProps) {
  const handleSubjectChange = (subjectId: string) => {
    setFilters({
      ...filters,
      subjects: filters.subjects.includes(subjectId)
        ? filters.subjects.filter((id) => id !== subjectId)
        : [...filters.subjects, subjectId],
    });
  };

  return (
    <div className="space-y-4">
      {/* Subject Filter */}
      <div>
        <h4 className="text-lg font-semibold mb-2">Subjects</h4>
        <div className="grid grid-cols-3 gap-2">
          {subjects.map((subject) => (
            <div key={subject._id} className="flex items-center space-x-2">
              <Checkbox
                id={`subject-${subject._id}`}
                checked={filters.subjects.includes(subject._id)}
                onCheckedChange={() => handleSubjectChange(subject._id)}
              />
              <label htmlFor={`subject-${subject._id}`} className="text-sm">
                {subject.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating and Rate Filters */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Minimum Rating</h4>
          <Select
            value={filters.rating}
            onValueChange={(value) => setFilters({ ...filters, rating: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="2">2+ Stars</SelectItem>
              <SelectItem value="1">1+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Availability</h4>
          <Select
            value={filters.availability}
            onValueChange={(value) =>
              setFilters({ ...filters, availability: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Monday">Monday</SelectItem>
              <SelectItem value="Tuesday">Tuesday</SelectItem>
              <SelectItem value="Wednesday">Wednesday</SelectItem>
              <SelectItem value="Thursday">Thursday</SelectItem>
              <SelectItem value="Friday">Friday</SelectItem>
              <SelectItem value="Saturday">Saturday</SelectItem>
              <SelectItem value="Sunday">Sunday</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Availability and Location */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2">
            Max Hourly Rate: ${filters.hourlyRate}
          </h4>
          <Slider
            defaultValue={[filters.hourlyRate]}
            max={100}
            step={5}
            onValueChange={(value) =>
              setFilters({ ...filters, hourlyRate: value[0] })
            }
          />
        </div>
        {/* Search Button */}
        <div className="flex justify-between pt-2">
          <Button
            onClick={onSearch}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Search className="h-4 w-4" />
            Search Tutors
          </Button>
        </div>
      </div>
    </div>
  );
}
