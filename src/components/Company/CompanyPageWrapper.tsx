"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WhoWeAre from './WhoWeAre';

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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">About Us</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">Tap into unbiased, unstated responses to drive sharper strategy and sustained growth.</p>
        </div>
      </section>

  {/* Who We Are Section */}
  

      {/* Founders Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Meet the Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Our founding team brings together strategic, analytical and operational depth to convert market noise into growth clarity for our clients.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-1 space-y-4">
              {founders.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveId(f.id)}
                  className={`w-full text-left p-4 rounded-xl border transition shadow-sm hover:shadow-md focus:outline-none ${activeId === f.id ? 'bg-blue-900 text-white border-blue-900' : 'bg-white border-gray-200 text-blue-900'}`}
                >
                  <div className="flex items-center">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-900 font-semibold mr-4 text-sm">
                      {f.name.split(' ').map(p => p[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <p className="font-semibold leading-tight">{f.name}</p>
                      <p className="text-xs opacity-80 mt-1">{f.title}</p>
                    </div>
                  </div>
                </button>
              ))}
              <Link href="#leadership" className="block text-sm text-primary font-semibold mt-4 hover:underline">More About Leadership Team →</Link>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden border border-blue-100 shadow-sm bg-white flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/3 h-64 md:h-auto">
                  <Image src={activeFounder.image} alt={activeFounder.name} fill className="object-cover" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-blue-900 mb-1">{activeFounder.name}</h3>
                  <p className="text-sm font-medium text-primary mb-4">{activeFounder.title}</p>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base flex-1">{activeFounder.bio}</p>
                  <div className="mt-6 flex space-x-4">
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
