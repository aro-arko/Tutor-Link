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
import { Dispatch, SetStateAction } from "react";

interface Filters {
  search: string;
  subjects: string[];
  rating: string;
  hourlyRate: number;
  availability: string;
  location: string;
}

interface TutorFilterProps {
  filters: Filters;
  setFilters: Dispatch<
    SetStateAction<{
      search: string;
      subjects: string[];
      rating: string;
      hourlyRate: number;
      availability: string;
      location: string;
    }>
  >;
  handleSubjectChange: (subject: string) => void;
}

const TutorFilter: React.FC<TutorFilterProps> = ({
  filters,
  setFilters,
  handleSubjectChange,
}) => {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      {/* Subject Filter */}
      <div>
        <h4 className="text-lg font-semibold">Subjects</h4>
        <div className="flex flex-wrap gap-3 mt-2">
          {["Math", "Physics", "Chemistry", "Biology", "English"].map(
            (subject) => (
              <div key={subject} className="flex items-center gap-2">
                <Checkbox
                  id={subject}
                  checked={filters.subjects.includes(subject)}
                  onCheckedChange={() => handleSubjectChange(subject)}
                />
                <label htmlFor={subject} className="text-sm">
                  {subject}
                </label>
              </div>
            )
          )}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="text-lg font-semibold">Rating</h4>
        <Select
          value={filters.rating}
          onValueChange={(value) =>
            setFilters({ ...filters, rating: value, search: filters.search })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="3">3+ Stars</SelectItem>
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
            setFilters({
              ...filters,
              hourlyRate: value[0],
              search: filters.search,
            })
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
            setFilters({
              ...filters,
              availability: value,
              search: filters.search,
            })
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
          onChange={(e) =>
            setFilters({
              ...filters,
              location: e.target.value,
              search: filters.search,
            })
          }
        />
      </div>
    </div>
  );
};

export default TutorFilter;
