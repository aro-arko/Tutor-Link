"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-gray-50 py-16 sm:py-8 px-4 sm:px-6 lg:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-10 sm:p-12 text-center border border-gray-200">
          {/* Icon */}
          <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-200 shadow-inner">
            <Mail className="text-red-600 w-7 h-7" />
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-3xl font-extrabold text-gray-900">
            Stay in the Loop
          </h2>
          <p className="text-gray-600 mt-2 text-base max-w-md mx-auto">
            Join our newsletter and receive weekly tips, updates, and more from
            your favorite tutors.
          </p>

          {/* Form or Success */}
          {submitted ? (
            <div className="mt-8 flex flex-col items-center text-green-600 animate-fade-in">
              <CheckCircle2 className="w-8 h-8 mb-1" />
              <p className="text-lg font-medium">You&apos;re subscribed!</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-sm w-full"
                required
              />
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6"
              >
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
