"use client"; // Required for Swiper to work in Next.js

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import facebookLogo from "@/app/assets/images/sponsors/Facebook-Logо.png";
import courseraLogo from "@/app/assets/images/sponsors/Coursera-Logo.jpg";
import googleLogo from "@/app/assets/images/sponsors/google_logo.png";
import hiltiLogo from "@/app/assets/images/sponsors/hilti-logo-png-transparent.png";
import microsoftLogo from "@/app/assets/images/sponsors/Microsoft-Logo.png";
import udemyLogo from "@/app/assets/images/sponsors/udemy-new-20212512.jpg";
import Image from "next/image";

const Sponsors = () => {
  const sponsors = [
    { logo: facebookLogo, alt: "Facebook" },
    { logo: googleLogo, alt: "Google" },
    { logo: hiltiLogo, alt: "Hilti" },
    { logo: microsoftLogo, alt: "Microsoft" },
    { logo: courseraLogo, alt: "Coursera" },
    { logo: udemyLogo, alt: "Udemy" },
  ];

  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Grid (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-8">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.alt}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Mobile Slider (visible on mobile) */}
        <div className="md:hidden">
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={false} // Removed pagination UI
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {sponsors.map((sponsor, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.alt}
                    className="h-12 w-auto object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
