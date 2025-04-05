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
    // TODO: Integrate with your email API
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-0">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex flex-col items-center mb-6">
          <Mail className="w-10 h-10 text-red-600 mb-2" />
          <h2 className="text-3xl font-bold text-gray-800">
            Stay Updated with Us
          </h2>
          <p className="text-gray-600 mt-2 text-base">
            Subscribe to our newsletter and never miss tips, updates, or tutor
            highlights.
          </p>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center text-green-600 mt-6">
            <CheckCircle2 className="w-8 h-8 mb-1" />
            <p className="text-lg font-medium">You&apos;re subscribed!</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-md"
              required
            />
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
