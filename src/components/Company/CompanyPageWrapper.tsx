"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WhoWeAre from './WhoWeAre';
import MeetTheTeam from './MeetTheTeam';

const founders = [
  {
    id: 'ritu',
    name: 'Ritu Soni Srivastava',
    title: 'Co-founder & CEO',
    image: '/home/businessdev.png',
    bio: 'Seasoned entrepreneur focused on building scalable insight engines. Led cross-industry growth initiatives combining consumer behavior analysis, AI enabled research and commercialization strategy.'
  },
  {
    id: 'yogesh',
    name: 'Yogesh Sachdeva',
    title: 'Co-founder',
    image: '/home/business.png',
    bio: 'Growth strategist with deep experience in category development, pricing and route-to-market. Passionate about blending structured KPIs with qualitative market signals.'
  },
  {
    id: 'vishal',
    name: 'Vishal Soni',
    title: 'Co-founder',
    image: '/home/ibuy.png',
    bio: 'Data & analytics leader specializing in unstructured signal processing, LLM powered pipelines and decision acceleration for commercial teams.'
  }
];

export const CompanyPageWrapper: React.FC = () => {
  const [activeId, setActiveId] = useState(founders[0].id);
  const activeFounder = founders.find(f => f.id === activeId)!;

  return (
    <div className="min-h-screen bg-white font-open-sans">
      {/* Hero Section */}
      <section className="relative h-[380px] w-full overflow-hidden flex items-center justify-center">
        <Image
          src="/home/hero/business.png"
          alt="About Us"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/60" />
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Meet the Team</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">Our team brings together strategic, analytical and operational depth to convert market noise into growth clarity for our clients.</p>
        </div>
      </section>
      <MeetTheTeam />
  {/* Who We Are Section */}
  

      {/* Founders Section */}
      

      <WhoWeAre />
      

      {/* Contact CTA */}
      <section className="py-20 bg-blue-900 text-blue-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Partner With Us</h2>
          <p className="text-blue-100 max-w-3xl mx-auto mb-8">Ready to unlock deeper insight, align teams on the real drivers of choice and translate intelligence into execution? We would love to explore how we can support you.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="px-8 py-3 rounded-full bg-white text-blue-900 font-semibold shadow hover:shadow-md transition">Contact Us</Link>
            <Link href="/perception" className="px-8 py-3 rounded-full border border-blue-300 text-blue-100 hover:bg-blue-800 transition font-semibold">Explore Perception AI</Link>
          </div>
        </div>
      </section>

      {/* 360 / How We Operate */}
      
    </div>
  );
};

export default CompanyPageWrapper;
