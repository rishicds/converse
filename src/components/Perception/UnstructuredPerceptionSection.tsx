"use client";
import UnstructuredPerceptionPage from '@/app/perception/unstructured/page';
import React from 'react';

const UnstructuredPerceptionSection: React.FC = () => {
  return (
    <section
      id="unstructured-perception"
      className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py- font-[family-name:var(--font-raleway)]"
    >
      {/* Header: stacks on mobile, inline on md+ */}
      <div className="max-w-3xl md:max-w-full mx-auto md:mx-0 text-center md:text-left">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-600 tracking-wide uppercase flex flex-col md:flex-row items-center gap-3 whitespace-normal md:whitespace-nowrap">
          <span className="block md:inline-block">KEY APPLICATIONS OF</span>
          <img src="/perception.png" alt="Perception logo" className="h-8 md:h-10 mx-auto md:mx-0" />
          <span className="block md:inline-block">IN UNSTRUCTURED DATA ANALYSIS</span>
        </h2>
      </div>

      {/* Content injected from the page component. It already uses responsive grid/flex; add outer spacing */}
      <div className="mt-">
        <UnstructuredPerceptionPage />
      </div>

      <div className="mt-8 flex justify-center" id="scroll-down" />
      {/* Anchor targets / placeholder sections */}
    </section>
  );
};

export default UnstructuredPerceptionSection;
