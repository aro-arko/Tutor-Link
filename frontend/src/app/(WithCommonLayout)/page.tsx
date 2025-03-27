import Banner from "@/components/modules/home/banner/Banner";
import FeaturedTutors from "@/components/modules/home/featuredTutors/FeaturedTutors";
import Features from "@/components/modules/home/features/Features";
import Sponsors from "@/components/modules/home/sponsors/Sponsors";
import SuccessStories from "@/components/modules/home/successStories/SuccessStories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TutorLink",
  description: "Find the best tutors for your needs",
};

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Sponsors />
      <FeaturedTutors />
      <Features />
      <SuccessStories />
    </div>
  );
};

export default HomePage;
