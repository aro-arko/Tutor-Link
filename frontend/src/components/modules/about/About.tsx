"use client";

import { Star, Users, Globe, BookOpen } from "lucide-react";
import Image from "next/image";
import goalImage from "@/app/assets/images/goal.jpg";
const About = () => {
  const team = [
    {
      name: "John Doe",
      role: "Co-Founder & CEO",
      image:
        "https://business.columbia.edu/sites/default/files-efs/styles/default_3_2_mobile_543x362/public/articles/images_upload/the-connected-narrative-N8lRH2uxih4-unsplash.jpg?h=b2774bcf&itok=USAV08mN",
    },
    {
      name: "Sophia Williams",
      role: "Co-Founder & CTO",
      image:
        "https://img.freepik.com/premium-photo/portrait-professional-woman-suit-business-woman-standing-office-generative-ai_868783-4132.jpg",
    },
    {
      name: "Alex Johnson",
      role: "Head of Operations",
      image:
        "https://xebia.com/wp-content/uploads/2023/08/avatar_user_619_1691398826-256x256.jpg",
    },
    {
      name: "Emily Brown",
      role: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    },
  ];

  const successStories = [
    {
      name: "Muniba",
      story:
        "TutorLink helped me excel in my English language skills. I feel more confident now!",
      image:
        "https://i.pinimg.com/736x/32/10/8a/32108a13a9753d5569a5a587cc22452e.jpg",
    },
    {
      name: "Michael",
      story:
        "I was struggling with chemistry, but my tutor made it so easy to understand. Highly recommend TutorLink!",
      image:
        "https://img.freepik.com/premium-photo/boy-student-chinese-portrait-standing-smiling_53876-289705.jpg",
    },
    {
      name: "Emily",
      story:
        "As a tutor, I love how TutorLink connects me with passionate students. It's been a rewarding experience!",
      image:
        "https://images.stockcake.com/public/8/1/3/8131eb96-18fd-4112-8459-28613801e8b4_medium/graduate-s-joyful-moment-stockcake.jpg",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-16">
      {/* Overview Section */}
      <section className="text-center mb-16">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">About Us</h1>
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
        <div className="md:w-1/3 flex h-56 justify-end border-1 border-gray-100 rounded-lg">
          <Image
            src={goalImage}
            alt="Mission"
            width={400}
            height={100}
            className="rounded-lg shadow-lg object-cover h-full w-full "
          />
        </div>
      </section>

      <section className="mb-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map(({ name, role, image }, index) => (
            <div key={index} className="text-center">
              <Image
                src={image}
                alt={name}
                width={150}
                height={150}
                className="rounded-full aspect-square object-cover border-4 border-red-200 shadow-md mx-auto"
              />
              <h3 className="text-xl font-semibold text-gray-900 mt-3">
                {name}
              </h3>
              <p className="text-gray-600">{role}</p>
            </div>
          ))}
        </div>
      </section>

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
                src={image}
                alt={name}
                width={120}
                height={120}
                className="rounded-full aspect-square object-cover border-4 border-red-200 mx-auto mb-4"
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
