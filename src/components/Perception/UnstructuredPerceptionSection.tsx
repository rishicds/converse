"use client";
import Link from 'next/link';
import React from 'react';

const bulletItems = [
  'Brand Health Assessment',
  'Campaign Evaluation',
  'Influencer Impact',
  'Customer Experience',
  'Brand Communication & Analysis',
  'Competitive Intelligence',
  'Post launch Assessment',
  'Customer Switching Analysis'
];

const UnstructuredPerceptionSection: React.FC = () => {
  return (
    <section id="unstructured-perception" className="mx-auto w-full max-w-7xl px-6  font-[family-name:var(--font-raleway)]">
      {/* Logo at the top */}
      <div className="flex justify-center mb-10">
        <img
          src="Perception_Logo-01[1].png"
          alt="Perception Logo - Authentic insights, driving performance."
          className="h-38 w-auto"
        />
      </div>
      <div className="grid gap-12 md:grid-cols-2 items-start">
        {/* Left: Video placeholder */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center text-center text-white text-xl font-medium rounded-sm">
          <span>Perception video (old video to be corrected)</span>
        </div>
        {/* Right: Content */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold font-raleway tracking-wide">Key Applications of PERCEPTION</h2>
            <ul className="mt-4 list-disc pl-5 space-y-1 text-md leading-relaxed">
              {bulletItems.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <Link
              href="/perception/unstructured"
              className="inline-block text-white px-6 py-3 text-sm font-medium tracking-wide rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
              style={{ background: 'var(--button-primary)' }}
              onMouseOver={e => (e.currentTarget.style.background = 'var(--button-primary-hover)')}
              onMouseOut={e => (e.currentTarget.style.background = 'var(--button-primary)')}
            >
              Know more
            </Link>
          </div>
        </div>
      </div>
      <p className="mt-20 text-center font-semibold tracking-wide max-w-4xl mx-auto">PERCEPTION transforms unstructured online and offline conversations into strategic clarity.</p>
      <div className="mt-8 flex justify-center" id="scroll-down">
        
      </div>
      {/* Anchor targets / placeholder sections */}
      <div id="know-more" className="pt-28 -mt-28" aria-hidden />
    </section>
  );
};

export default UnstructuredPerceptionSection;
