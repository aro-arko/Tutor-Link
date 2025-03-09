"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react"; // Import hamburger and close icons
import { useState } from "react"; // Import useState for mobile menu toggle

export default function Navbar() {
  const pathname = usePathname(); // Get the current route
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  // Define a function to check if a link is active
  const isActive = (path: string) => pathname === path;

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
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
              href="/browse-tutors"
              className={`text-gray-600 hover:text-gray-900 transition duration-300 ${
                isActive("/browse-tutors") ? "text-red-600 font-semibold" : ""
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

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
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
