import React from 'react';

type PerceptionPageWrapperProps = {
  children: React.ReactNode;
};

const PerceptionPageWrapper: React.FC<PerceptionPageWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default PerceptionPageWrapper;
