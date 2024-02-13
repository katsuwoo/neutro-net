import exp from 'constants';
import React from 'react';

const FullScreenLoading: React.FC = () => {
  // Spinner for Loading with tailwind css.
  return (
    <div className="fixed flex justify-center items-center w-screen h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  )
}

export default FullScreenLoading;