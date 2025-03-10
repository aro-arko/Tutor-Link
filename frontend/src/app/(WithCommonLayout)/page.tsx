"use client";
import Banner from "@/components/modules/home/banner/Banner";
import Features from "@/components/modules/home/features/Features";
import Sponsors from "@/components/modules/home/sponsors/Sponsors";
import SuccessStories from "@/components/modules/home/successStories/SuccessStories";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const user = useUser();
  console.log(user);
  return (
    <div>
      <Banner />
      <Sponsors />
      <Features />
      <SuccessStories />
    </div>
  );
};

export default HomePage;
