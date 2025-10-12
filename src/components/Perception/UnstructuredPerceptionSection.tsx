"use client";
import UnstructuredPerceptionPage from '@/app/perception/unstructured/page';
import React from 'react';

const UnstructuredPerceptionSection: React.FC = () => {
  return (
    <section id="unstructured-perception" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 font-[family-name:var(--font-raleway)] overflow-hidden">
      <div className="grid gap-8 md:gap-12 items-start">
        <div className="space-y-6 md:space-y-8">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500 font-raleway tracking-wide uppercase flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3 text-center">
              <span className="whitespace-nowrap">KEY APPLICATIONS OF</span>
              <img src="/perception.png" alt="Perception logo" className="h-6 sm:h-8" />
              <span className="whitespace-nowrap">IN UNSTRUCTURED DATA ANALYSIS</span>
            </h2>
          </div>
        </div>
      </div>
      <UnstructuredPerceptionPage />
      <div className="mt-6 md:mt-8 flex justify-center" id="scroll-down">
        
      </div>
  {/* Anchor targets / placeholder sections */}
    </section>
  );
};

export default UnstructuredPerceptionSection;
