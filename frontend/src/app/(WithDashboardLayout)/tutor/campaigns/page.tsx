import Campaigns from "@/components/modules/tutorDashboard/campaigns/Campaigns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaigns",
  description: "Campaigns page for tutors",
};

const CampaignsPage = () => {
  return (
    <div>
      <Campaigns />
    </div>
  );
};

export default CampaignsPage;
