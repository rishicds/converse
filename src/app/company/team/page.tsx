"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const members = [
  {
    name: 'Krishnashish Ray (Kray)',
    title: 'Founder at Converse Global Consulting',
    blurb: '(ex Mondelez International, Kraft Foods, Unilever).',
    bullets: [
      '35+ years of experience in leading businesses',
      'Core areas: Strategic planning and Analytics',
      'Started CGC in 2016, and AI analytics tool PERCEPTION in 2017/18.'
    ],
    image: '/company/team/kray.png'
  },
  {
    name: 'Adriana Rohalova',
    title: 'CMO at Converse Global Consulting',
    blurb: '(Visual artist, ex Mondelez International, Kraft Foods).',
    bullets: [
      '20+ years of experience in Marketing and Innovations',
      'Core areas: Creativity and communication',
      'Collaborative mindset fostering a “voice of reason”'
    ],
    image: '/company/team/adriana.png'
  },
  {
    name: 'Anoop Sardeshpande',
    title: 'Research & Analytics Lead',
    blurb: '(ex Nielsen, Kantar / IMRB, SRE, TNs).',
    bullets: [
      '25+ years in Research and Analytics.',
      'Core areas: Regional insights (Quantitative and Qualitative) across multiple regions and multiple industries (FMCG, Retail, Banking, Automotive, Government)',
      'Proactive and growth-oriented'
    ],
    image: ''
  },
  {
    name: 'Vivaswan Bhattarchaya',
    title: 'Technical Consultant',
    blurb: '(ex Telephone Networks Professional at Major Telecom Service Providers).',
    bullets: [
      '25+ years in Telecom and Network Management',
      'Core areas: Managing large technology operations across geographies. Innovation. Technology and organizational transformation'
    ],
    image: '/company/team/vivaswan.png'
  },
  {
    name: 'Sajeev Bhaskaran',
    title: 'Supply Chain Consultant',
    blurb: '(ex Mondelez/Kraft Foods, Mars, P&G)',
    bullets: [
      '25+ years in Supply Chain and Logistics.',
      'Core areas: Establishing efficient & effective processes in sourcing and logistics. Supplier and logistic partner management. Demand and Supply planning.'
    ],
    image: '/company/team/placeholder.png'
  },
  {
    name: 'Harish Bhambhaney',
    title: 'Senior Finance and Legal Consultant',
    blurb: '(ex Mondelez/Kraft Foods, Transmed, Spinneys).',
    bullets: [
      '30+ years in Finance, Legal, Corporate Affairs and Commercial.',
      'Core areas: M&A, Brand Assessment, Corporte Finance and Treasury',
      'Core Strengths: Strategy focused, Purpose Driven and Result Oriented'
    ],
    image: '/company/team/harish.png'
  }
];

const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900">The Founding Team</h1>
        </div>

        <div className="space-y-12">
          {members.map((m, i) => (
            <div key={m.name} className="flex flex-col md:flex-row items-stretch bg-transparent">
              <div className="md:w-1/3 bg-gray-100 rounded-l-lg flex items-center justify-center min-h-[220px]">
                <div className="bg-gray-200 rounded-l-lg flex items-center justify-center w-[256px] h-[256px] overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.name}
                    width={256}
                    height={256}
                    className="object-cover w-full h-full rounded-l-lg"
                    priority={i < 3}
                  />
                </div>
              </div>

              <div className="md:w-2/3 bg-white border rounded-r-lg p-8 shadow-sm">
                <h2 className="text-xl font-bold text-black mb-2">{m.name}</h2>
                <p className="text-base text-gray-800 mb-4">{m.title}</p>
                {m.blurb && <p className="text-sm text-gray-600 mb-4">{m.blurb}</p>}

                <ul className="list-disc ml-5 space-y-2 text-gray-800">
                  {m.bullets.map(b => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <div className="mt-6">
                  <a href="#" aria-label="LinkedIn" className="inline-flex items-center gap-2 text-blue-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6C1.1 6 0 4.88 0 3.5C0 2.12 1.1 1 2.48 1C3.86 1 4.98 2.12 4.98 3.5Z" fill="#1B66A7" />
                      <path d="M.5 8.5H4.5V24H.5V8.5Z" fill="#1B66A7" />
                      <path d="M8.5 8.5H12.3V10.9H12.36C12.96 9.86 14.36 8.72 16.56 8.72C20.56 8.72 21 11.36 21 15.2V24H17V15.9C17 13.96 16.96 11.52 14.18 11.52C11.36 11.52 11 13.86 11 15.74V24H8.5V8.5Z" fill="#1B66A7" />
                    </svg>
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/company" className="text-sm text-blue-700 hover:underline">← Back to Company</Link>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
