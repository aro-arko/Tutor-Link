"use client";
import PostTipForm from "./PostTipForm";
import "./Campaigns.css";
import TipOfToday from "./TipOfToday";

const Campaigns = () => {
  return (
    <div className=" min-h-screen space-y-4">
      {/* Custom Scrolling Text */}
      <div className="overflow-hidden whitespace-nowrap bg-red-600 py-3 rounded-lg">
        <div className="inline-block animate-slide text-white font-medium text-center px-4">
          🌟 Tutors! Share your tip of the day and get featured on the homepage.
          Be the first to inspire, and let students discover your expertise!
        </div>
      </div>

      <div className="pt-4">
        <TipOfToday />
      </div>
      <PostTipForm />
    </div>
  );
};

export default Campaigns;
