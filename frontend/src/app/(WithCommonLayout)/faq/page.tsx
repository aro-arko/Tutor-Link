import FAQ from "@/components/modules/faq/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently Asked Questions about TutorLink",
};

const FAQPage = () => {
  return (
    <div>
      <FAQ />
    </div>
  );
};

export default FAQPage;
