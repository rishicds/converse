"use client";
import UnstructuredPerceptionPage from '@/app/perception/unstructured/page';
import React from 'react';

const UnstructuredPerceptionSection: React.FC = () => {
  return (
    <section id="unstructured-perception" className="mx-auto w-full max-w-7xl px-6  font-[family-name:var(--font-raleway)]">
      <div className="grid gap-12 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold font-raleway tracking-wide">Key Applications of Perception</h2>
          </div>
        </div>
      </div>
      <UnstructuredPerceptionPage />
      <div className="mt-8 flex justify-center" id="scroll-down">
        
      </div>
  {/* Anchor targets / placeholder sections */}
    </section>
  );
};

export default UnstructuredPerceptionSection;
