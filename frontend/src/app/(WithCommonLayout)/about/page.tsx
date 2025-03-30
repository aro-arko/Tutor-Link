import About from "@/components/modules/about/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about TutorLink, our mission, vision, and the team behind the platform.",
};

const AboutPage = () => {
  return (
    <div>
      <About />
    </div>
  );
};

export default AboutPage;
