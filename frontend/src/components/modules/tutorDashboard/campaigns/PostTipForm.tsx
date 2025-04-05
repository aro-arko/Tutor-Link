"use client";

import { useState, useEffect } from "react";
import { postTip } from "@/services/TipsService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const PostTipForm = () => {
  const [tipText, setTipText] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState("");

  // Countdown Logic
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const diff = tomorrow.getTime() - now.getTime();

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipText.trim()) return;
    setLoading(true);
    try {
      await postTip(tipText);
      toast.success("Tip submitted successfully!");
      setTipText("");
    } catch (error: any) {
      toast.error(error?.message || "Failed to submit tip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto mt-12 flex flex-col lg:flex-row gap-6">
      {/* Form Section - 3/4 */}
      <div className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow border border-gray-200">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Submit Your Tip
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Share a helpful learning tip..."
            value={tipText}
            onChange={(e) => setTipText(e.target.value)}
            rows={5}
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white hover:bg-red-700"
          >
            {loading ? "Submitting..." : "Submit Tip"}
          </Button>
        </form>
      </div>

      {/* Countdown Section - 1/4 */}
      <div className="w-full lg:w-1/4 bg-gray-100 border border-gray-200 rounded-lg shadow flex flex-col items-center justify-center p-6 text-center">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">
          ⏰ Next Tip Cycle
        </h4>
        <p className="text-3xl font-bold text-red-600">{countdown}</p>
        <p className="text-sm text-gray-600 mt-2">Resets at 00:00 daily</p>
      </div>
    </div>
  );
};

export default PostTipForm;
