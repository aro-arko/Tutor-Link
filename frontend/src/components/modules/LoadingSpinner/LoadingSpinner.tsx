// components/LoadingSpinner.tsx
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        {/* Outer red ring */}
        <div className="absolute w-full h-full border-4 border-red-500/30 rounded-full"></div>

        {/* Animated inner spinner */}
        <div className="absolute w-full h-full border-4 border-transparent border-t-red-600 border-r-red-600 rounded-full animate-spin"></div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-700 rounded-full"></div>

        {/* Unique flare effect */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-red-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
