"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const SuccessStories = () => {
  interface Testimonial {
    name: string;
    role: string;
    testimonial: string;
    avatar: string;
    rating: number;
  }

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const userRes = await fetch("https://randomuser.me/api/?results=3");
        const userData = await userRes.json();

        const testimonialsData = [
          {
            name: `${userData.results[0].name.first} ${userData.results[0].name.last}`,
            role: "Student",
            testimonial:
              "I found the perfect tutor for my math class. The lessons were clear, and I improved my grades significantly!",
            avatar: userData.results[0].picture.large,
            rating: 5,
          },
          {
            name: `${userData.results[1].name.first} ${userData.results[1].name.last}`,
            role: "Tutor",
            testimonial:
              "Being a tutor on TutorLink has been an amazing experience. I have met so many enthusiastic students!",
            avatar: userData.results[1].picture.large,
            rating: 5,
          },
          {
            name: `${userData.results[2].name.first} ${userData.results[2].name.last}`,
            role: "Student",
            testimonial:
              "I was struggling with chemistry, but my tutor made everything so simple. Highly recommend this service!",
            avatar: userData.results[2].picture.large,
            rating: 5,
          },
        ];

        setTestimonials(testimonialsData);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
          Success Stories
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((story, index) => (
            <Card key={index} className="p-6 bg-white shadow-md rounded-lg">
              <CardHeader className="flex flex-col items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={story.avatar} alt={story.name} />
                  <AvatarFallback>{story.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-gray-900 mt-4">
                  {story.name}
                </h3>
                <p className="text-sm text-gray-500">{story.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm italic">
                  “{story.testimonial}”
                </p>
                <div className="flex justify-center mt-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
