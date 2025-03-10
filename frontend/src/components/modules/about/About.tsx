"use client";

import { Star, Users, Globe, BookOpen } from "lucide-react";
import Image from "next/image";
import AboutMission from "@/app/assets/images/about-mission.png";

const About = () => {
  const team = [
    { name: "John Doe", role: "Co-Founder & CEO", image: 10 },
    { name: "Jane Smith", role: "Co-Founder & CTO", image: 11 },
    { name: "Alex Johnson", role: "Head of Operations", image: 12 },
    { name: "Emily Brown", role: "Head of Marketing", image: 13 },
  ];

  const successStories = [
    {
      name: "Sarah",
      story:
        "TutorLink helped me find an amazing math tutor. My grades improved from Cs to As in just three months!",
      image: 20,
    },
    {
      name: "Michael",
      story:
        "I was struggling with chemistry, but my tutor made it so easy to understand. Highly recommend TutorLink!",
      image: 21,
    },
    {
      name: "Emily",
      story:
        "As a tutor, I love how TutorLink connects me with passionate students. It's been a rewarding experience!",
      image: 22,
    },
  ];

  const vision = [
    {
      icon: <Globe className="h-12 w-12 text-red-600 mx-auto" />,
      title: "Global Reach",
      description:
        "Expand our platform to connect students and tutors worldwide.",
    },
    {
      icon: <BookOpen className="h-12 w-12 text-red-600 mx-auto" />,
      title: "Diverse Subjects",
      description:
        "Offer a wider range of subjects to cater to every learner's needs.",
    },
    {
      icon: <Users className="h-12 w-12 text-red-600 mx-auto" />,
      title: "Community Growth",
      description: "Build a thriving community of learners and educators.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Overview Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          At TutorLink, we connect students with the best tutors worldwide. Our
          mission is to make learning personalized, accessible, and effective
          for everyone.
        </p>
      </section>

      {/* Mission Statement Section */}
      <section className="mb-16 flex flex-col md:flex-row items-center gap-8">
        <div className="space-y-6 md:w-2/3">
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="text-gray-600">
            We bridge the gap between students and qualified tutors, ensuring
            everyone has access to personalized education. Our platform is
            designed to help learners of all ages and levels achieve their
            academic goals. Whether you need help with math, science, languages,
            or test prep, we&apos;ve got you covered.
          </p>
          <div className="flex items-center gap-4">
            <Star className="h-8 w-8 text-red-600" />
            <span className="text-gray-700 font-semibold">
              Empowering learners, one connection at a time.
            </span>
          </div>
        </div>
        {/* Image Positioned to the Right */}
        <div className="md:w-1/3 flex justify-end">
          <Image
            src={AboutMission}
            alt="Mission"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="mb-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map(({ name, role, image }, index) => (
            <div key={index} className="text-center">
              <Image
                src={`https://randomuser.me/api/portraits/men/${image}.jpg`}
                alt={name}
                width={150}
                height={150}
                className="rounded-full border-4 border-red-200 shadow-md mx-auto"
              />
              <h3 className="text-xl font-semibold text-gray-900 mt-3">
                {name}
              </h3>
              <p className="text-gray-600">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="mb-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map(({ name, story, image }, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-red-100"
            >
              <Image
                src={`https://randomuser.me/api/portraits/women/${image}.jpg`}
                alt={name}
                width={120}
                height={120}
                className="rounded-full border-4 border-red-200 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
              <p className="text-gray-600 italic">&quot;{story}&quot;</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vision.map(({ icon, title, description }, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-red-100"
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
