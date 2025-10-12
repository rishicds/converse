import React from 'react';

type PerceptionPageWrapperProps = {
  children: React.ReactNode;
};

const PerceptionPageWrapper: React.FC<PerceptionPageWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default PerceptionPageWrapper;
