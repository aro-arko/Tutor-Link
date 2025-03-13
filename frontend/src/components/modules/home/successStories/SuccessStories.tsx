"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
        const userRes = await fetch("https://randomuser.me/api/?results=6");
        const userData = await userRes.json();
        console.log("success", userData);

        const testimonialsData = userData.results.map(
          (user: any, index: number) => ({
            name: `${user.name.first} ${user.name.last}`,
            role: index % 2 === 0 ? "Student" : "Tutor",
            testimonial:
              index % 2 === 0
                ? "I found the perfect tutor for my math class. The lessons were clear, and I improved my grades significantly!"
                : "Being a tutor on TutorLink has been an amazing experience. I have met so many enthusiastic students!",
            avatar: user.picture.large,
            rating: 5,
          })
        );

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
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
          Success Stories
        </h2>

        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="w-full"
        >
          {testimonials.map((story, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <Card className="p-6 bg-white shadow-md rounded-lg h-full max-w-[600px]">
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;
