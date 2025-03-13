"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { logout } from "@/services/AuthService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { protectedRoutes } from "@/constants";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const role = user?.role;
  console.log(role);
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              TutorLink
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`text-gray-600 hover:text-gray-900 transition duration-300 ${
                isActive("/") ? "text-red-600 font-semibold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/tutors"
              className={`text-gray-600 hover:text-gray-900 transition duration-300 ${
                isActive("/tutors") ? "text-red-600 font-semibold" : ""
              }`}
            >
              Browse Tutors
            </Link>
            <Link
              href="/about"
              className={`text-gray-600 hover:text-gray-900 transition duration-300 ${
                isActive("/about") ? "text-red-600 font-semibold" : ""
              }`}
            >
              About
            </Link>
            <Link
              href="/faq"
              className={`text-gray-600 hover:text-gray-900 transition duration-300 ${
                isActive("/faq") ? "text-red-600 font-semibold" : ""
              }`}
            >
              FAQ
            </Link>
            <Link
              href="/blog"
              className={`text-gray-600 hover:text-gray-900 transition duration-300 ${
                isActive("/blog") ? "text-red-600 font-semibold" : ""
              }`}
            >
              Blog
            </Link>
          </div>

          {/* User/Log In Button */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              // If the user is logged in, show the user icon with dropdown menu
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <FaUserCircle className="text-gray-600 cursor-pointer h-6 w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  <DropdownMenuItem>
                    <Link
                      href={`/${role}/dashboard`}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={`/booking/lists`}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // If the user is not logged in, show the login button
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <Link
                href="/"
                className={`text-gray-600 hover:text-gray-900 transition duration-300 ${
                  isActive("/") ? "text-red-600 font-semibold" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link
                href="/browse-tutors"
                className={`text-gray-600 hover:text-gray-900 transition duration-300 ${
                  isActive("/browse-tutors") ? "text-red-600 font-semibold" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                Browse Tutors
              </Link>
              <Link
                href="/about"
                className={`text-gray-600 hover:text-gray-900 transition duration-300 ${
                  isActive("/about") ? "text-red-600 font-semibold" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <Link
                href="/faq"
                className={`text-gray-600 hover:text-gray-900 transition duration-300 ${
                  isActive("/faq") ? "text-red-600 font-semibold" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                FAQ
              </Link>
              <Link
                href="/blog"
                className={`text-gray-600 hover:text-gray-900 transition duration-300 ${
                  isActive("/blog") ? "text-red-600 font-semibold" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                Blog
              </Link>
              <Button asChild className="w-full mt-4">
                <Link href="/login" onClick={toggleMobileMenu}>
                  Login
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
