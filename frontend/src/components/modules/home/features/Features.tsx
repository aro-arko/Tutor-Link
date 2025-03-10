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
    icon: <Search className="h-12 w-12 text-red-600" />,
    title: "Find Tutors Fast",
    description: "Search and book in seconds.",
  },
  {
    icon: <CreditCard className="h-12 w-12 text-red-600" />,
    title: "Secure Payments",
    description: "Your transactions are 100% safe.",
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-red-600" />,
    title: "Verified Profiles",
    description: "All tutors go through background checks.",
  },
];

const Features = () => {
  return (
    <section className="py-4 bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Section Title */}
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
            Why Choose Us?
          </h2>
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col items-center justify-center text-center p-8 h-[280px] bg-white shadow-md  rounded-xl"
              >
                <CardHeader className="flex flex-col items-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <CardTitle className="text-2xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
