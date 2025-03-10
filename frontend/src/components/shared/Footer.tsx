"use client";

import { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setIsSubmitted(true);
      setEmail(""); // Clear input after submission
      setTimeout(() => setIsSubmitted(false), 4000); // Hide message after 4 seconds
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">TutorLink</h3>
          <p className="text-sm text-gray-400">
            Connecting students with the best tutors worldwide. Learn, grow, and
            achieve your goals with TutorLink.
          </p>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Browse Tutors
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Contact Us</h4>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">
                support@tutorlink.com
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">+1 (123) 456-7890</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Newsletter</h4>
          <p className="text-sm text-gray-400">
            Subscribe to our newsletter to get the latest updates and offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
            </div>
            {isSubmitted && (
              <p className="text-sm text-green-500">
                ✅ Subscribed successfully!
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-8 pt-8 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} TutorLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
