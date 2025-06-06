"use client";

import { useEffect, useState } from "react";
import TutorCard from "./TutorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter, Search, ChevronLeft, ChevronRight } from "lucide-react";
import TutorFilter from "./TutorFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { searchTutors } from "@/services/StudentService";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { ITutor } from "@/types";

const ITEMS_PER_PAGE = 9;

const AllTutors = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tutorData, setTutorData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: "",
    subjects: [] as string[],
    rating: "",
    hourlyRate: 50,
    availability: "",
    location: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        // Parse query parameters
        const name = searchParams.get("name");
        const subjectParam = searchParams.get("subjects");

        const subject = searchParams.get("subject");
        const rating = searchParams.get("rating");
        const maxRate = searchParams.get("maxRate");
        const availability = searchParams.get("availability");

        // Build filters object
        const filters: Record<string, string | number | string[]> = {};

        if (name) filters.name = name;
        if (subjectParam)
          filters.subjects = decodeURIComponent(subjectParam).split(",");
        if (rating) filters.rating = parseFloat(rating);
        if (maxRate) filters.maxRate = parseFloat(maxRate);
        if (subject) filters.subject = subject;
        if (availability) filters.availability = availability;

        console.log("Filters being sent to API:", filters);

        // Fetch tutors using searchTutors
        const response = await searchTutors(filters);
        console.log(response);

        if (response.success) {
          const sortedTutors = response.data.sort((a: ITutor, b: ITutor) => {
            const reviewsA = a.reviews?.length || 0;
            const reviewsB = b.reviews?.length || 0;

            if (reviewsB !== reviewsA) {
              return reviewsB - reviewsA;
            }

            return b.rating - a.rating;
          });

          setTutorData(sortedTutors);
        } else {
          console.error("Failed to fetch tutors:", response.message);
          setTutorData([]);
        }
      } catch (error) {
        console.error("Error fetching tutors:", error);
        setTutorData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [searchParams]);

  // Handle subject selection
  const handleSubjectChange = (subject: string) => {
    if (searchParams.toString()) {
      router.push("/tutors");
    }
    setFilters((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Filtered Tutors
  const filteredTutors = tutorData.filter((tutor) => {
    return (
      (filters.search
        ? tutor.name.toLowerCase().includes(filters.search.toLowerCase())
        : true) &&
      (filters.subjects.length
        ? filters.subjects.some((subject) => tutor.subject.includes(subject))
        : true) &&
      (filters.rating ? tutor.rating >= parseFloat(filters.rating) : true) &&
      (filters.hourlyRate
        ? parseFloat(tutor.hourlyRate) <= filters.hourlyRate
        : true) &&
      (filters.availability
        ? tutor.availability.some((slot: { day: string }) =>
            slot.day.toLowerCase().includes(filters.availability.toLowerCase())
          )
        : true) &&
      (filters.location
        ? tutor.address.toLowerCase().includes(filters.location.toLowerCase())
        : true)
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredTutors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTutors = filteredTutors.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-16">
      {/* Section Title & Description */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Find Your Ideal Tutor
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Explore our wide range of expert tutors, available for personalized
          learning.
        </p>
      </div>

      {/* Search and Filter Buttons */}
      <div className="flex items-center justify-between mb-8">
        {/* Filter Button (Left Side on Small Screens) */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 w-24 md:w-28 h-12 mr-1  md:pointer-events-none border-2 border-red-600 text-red-600 font-bold"
            >
              <Filter className="h-5 w-5" />
              Filters
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-lg font-semibold">
              Filter Tutors
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Use the filters below to refine your search.
            </DialogDescription>
            <TutorFilter
              filters={filters}
              setFilters={setFilters}
              handleSubjectChange={handleSubjectChange}
            />
          </DialogContent>
        </Dialog>

        {/* Search Bar (Right Side) */}
        <div className="relative w-3/4 md:w-1/3 max-w-md">
          <Input
            type="text"
            placeholder="Search tutors..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-10 h-12"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Layout: Filters Sidebar (Hidden on Small Screens) + Tutors List */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters (Hidden on Mobile) */}
        <div className="hidden md:block">
          <TutorFilter
            filters={filters}
            setFilters={setFilters}
            handleSubjectChange={handleSubjectChange}
          />
        </div>

        {/* Tutors Grid */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTutors.length > 0 ? (
            paginatedTutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No tutors match your search criteria.
            </p>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="flex items-center"
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </Button>
          <span className="text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="flex items-center"
          >
            Next
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllTutors;
