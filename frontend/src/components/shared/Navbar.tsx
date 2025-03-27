"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "../ui/button";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
  Calendar,
  Search,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/AuthService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { protectedRoutes } from "@/constants";
import Image from "next/image";
import logo from "@/app/favicon.ico";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
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

interface Filters {
  search: string;
  subjects: string[];
  rating: string;
  hourlyRate: number;
  availability: string;
  location: string;
}

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const role = user?.role;
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBrowseTutorsOpen, setIsBrowseTutorsOpen] = useState(false);
  const [subjects, setSubjects] = useState<{ _id: string; name: string }[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    subjects: [],
    rating: "",
    hourlyRate: 50,
    availability: "",
    location: "",
  });

  const isActive = (path: string) => pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleBrowseTutors = () => {
    setIsBrowseTutorsOpen(!isBrowseTutorsOpen);
  };

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const handleSubjectChange = (subjectId: string) => {
    setFilters((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subjectId)
        ? prev.subjects.filter((id) => id !== subjectId)
        : [...prev.subjects, subjectId],
    }));
  };

  const handleSearch = () => {
    // Build query params from filters
    const queryParams = new URLSearchParams();
    if (filters.search) queryParams.append("search", filters.search);
    if (filters.subjects.length > 0)
      queryParams.append("subjects", filters.subjects.join(","));
    if (filters.rating) queryParams.append("rating", filters.rating);
    if (filters.hourlyRate)
      queryParams.append("maxRate", filters.hourlyRate.toString());
    if (filters.availability)
      queryParams.append("availability", filters.availability);
    if (filters.location) queryParams.append("location", filters.location);

    router.push(`/tutors?${queryParams.toString()}`);
    setIsBrowseTutorsOpen(false);
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await getAllSubjects();
        setSubjects(res.data);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [pathname, setIsLoading]);

  const navLinks = [
    { name: "Home", href: "/", icon: null },
    { name: "About", href: "/about", icon: null },
    { name: "FAQ", href: "/faq", icon: null },
    { name: "Blog", href: "/blog", icon: null },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm border-border"
          : "bg-background border-border"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-8 h-8"
              >
                <Image
                  src={logo}
                  alt="TutorLink"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
              </motion.div>
              <span className="text-xl font-bold">TutorLink</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center space-x-1",
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                )}
              >
                {link.icon && <span>{link.icon}</span>}
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Browse Tutors with Dropdown */}
            <DropdownMenu
              open={isBrowseTutorsOpen}
              onOpenChange={setIsBrowseTutorsOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-all flex items-center space-x-1",
                    isActive("/tutors")
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  <span>Browse Tutors</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[600px] p-4 shadow-lg rounded-lg border border-border"
                align="start"
                sideOffset={10}
              >
                <div className="space-y-4">
                  {/* Search Input */}
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Search Tutors
                    </h4>
                    <Input
                      type="text"
                      placeholder="Search by name or expertise..."
                      value={filters.search}
                      onChange={(e) =>
                        setFilters({ ...filters, search: e.target.value })
                      }
                    />
                  </div>

                  {/* Subject Filter */}
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Subjects</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {subjects.map((subject) => (
                        <div
                          key={subject._id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`subject-${subject._id}`}
                            checked={filters.subjects.includes(subject._id)}
                            onCheckedChange={() =>
                              handleSubjectChange(subject._id)
                            }
                          />
                          <label
                            htmlFor={`subject-${subject._id}`}
                            className="text-sm"
                          >
                            {subject.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rating and Rate Filters */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Minimum Rating
                      </h4>
                      <Select
                        value={filters.rating}
                        onValueChange={(value) =>
                          setFilters({ ...filters, rating: value })
                        }
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
                  </div>

                  {/* Availability and Location */}
                  <div className="grid grid-cols-2 gap-4">
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
                    <div>
                      <h4 className="text-sm font-medium mb-2">Location</h4>
                      <Input
                        type="text"
                        placeholder="City or region..."
                        value={filters.location}
                        onChange={(e) =>
                          setFilters({ ...filters, location: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={handleSearch}
                      className="gap-2 bg-primary hover:bg-primary/90"
                    >
                      <Search className="h-4 w-4" />
                      Search Tutors
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User/Log In Button */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 px-3 py-2 hover:bg-primary/5 rounded-full"
                  >
                    <FaUserCircle className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Account
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 mt-2 shadow-lg rounded-md border border-border"
                  align="end"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          role === "tutor"
                            ? "/tutor-profile"
                            : "/student-profile"
                        }
                        className="w-full flex items-center"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/${role}/dashboard`}
                        className="w-full flex items-center"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          role === "student"
                            ? "/booking/lists"
                            : "/tutor/bookings"
                        }
                        className="w-full flex items-center"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Bookings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/register-student">Sign Up</Link>
                </Button>
                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              className="rounded-full hover:bg-primary/5"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-4 py-3 space-y-2">
              <Link
                href="/"
                onClick={toggleMobileMenu}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  isActive("/")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                )}
              >
                Home
              </Link>
              <Link
                href="/tutors"
                onClick={toggleMobileMenu}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  isActive("/tutors")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                )}
              >
                Browse Tutors
              </Link>
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={toggleMobileMenu}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <>
                  <div className="pt-2 border-t border-border">
                    <Link
                      href={
                        role === "tutor" ? "/tutor-profile" : "/student-profile"
                      }
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:bg-primary/5 hover:text-primary"
                    >
                      Profile
                    </Link>
                    <Link
                      href={`/${role}/dashboard`}
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:bg-primary/5 hover:text-primary"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={
                        role === "student"
                          ? "/booking/lists"
                          : "/tutor/bookings"
                      }
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:bg-primary/5 hover:text-primary"
                    >
                      Bookings
                    </Link>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start px-3 py-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="pt-2 border-t border-border space-y-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/register-student" onClick={toggleMobileMenu}>
                      Sign Up
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90"
                  >
                    <Link href="/login" onClick={toggleMobileMenu}>
                      Login
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
