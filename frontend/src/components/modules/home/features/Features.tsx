"use client";

import { ShieldCheck, Search, CreditCard } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const features = [
  {
    icon: <Search className="h-10 w-10 text-red-600" />,
    title: "Find Tutors Fast",
    description: "Search made easy and efficient",
    details: [
      "Advanced search filters",
      "Instant matching with ideal tutors",
      "24/7 availability for urgent needs",
    ],
  },
  {
    icon: <CreditCard className="h-10 w-10 text-red-600" />,
    title: "Secure Payments",
    description: "Your transactions are 100% protected",
    details: [
      "Bank-level encrypted transactions",
      "Multiple secure payment options",
      "No hidden fees or charges",
    ],
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-red-600" />,
    title: "Verified Profiles",
    description: "Only thoroughly vetted tutors",
    details: [
      "Rigorous credential verification",
      "Comprehensive background checks",
      "Transparent rating system",
    ],
  },
];

const Features = () => {
  return (
    <section className="pt-16 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 mt-2">
            Discover the best tutors tailored to your needs. Experience secure,
            fast, and reliable services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-xl border border-gray-100 hover:border-red-100 h-full"
            >
              <div className="p-8 flex flex-col h-full">
                <CardHeader className="flex flex-col items-center px-0">
                  <div className="p-4 mb-6 bg-red-50 rounded-xl">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg mb-6">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 mt-auto">
                  <ul className="space-y-3 text-gray-700">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-6 w-6 text-red-500 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-base leading-relaxed">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
