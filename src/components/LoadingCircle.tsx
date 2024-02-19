import React from "react";

const LoadingCircle: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex justify-center items-center w-12 h-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main-blue"></div>
      </div>
    </div>
  );
};

export default LoadingCircle;