"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { a } from 'framer-motion/client';

const team = [
  'Kray Ray',
  'Adriana Rohalova',
  'Anoop Sardeshpande',
  'Dina Dali',
  'Vivaswan Bhattarchaya',
  'Sajeev Bhaskaran',
  'Harish Bhambhaney'
];

// Map of simple first-name -> image filename in public/company/team
const photos: Record<string, string> = {
  kray: '/company/team/kray.png',
  adriana: '/company/team/adriana.png',
  dina: '/company/team/dina.png',
  vivaswan: '/company/team/vivaswan.png',
  harish: '/company/team/harish.png',
  anoop: '/company/team/anoop.jpg', // no photo
  sajeev: '/company/team/sajeev.jpg' // no photo
};

const MeetTheTeam: React.FC = () => {
  // define which people should have the cyan accent when no photo
  const cyanAccent = new Set(['adriana', 'dina', 'sajeev']);

  // explicit layout ordering: top row 3, bottom row 4
  const topRow = ['Kray Ray', 'Adriana Rohalova', 'Anoop Sardeshpande'];
  const bottomRow = [
    'Dina Dali',
    'Vivaswan Bhattarchaya',
    'Sajeev Bhaskaran',
    'Harish Bhambhaney',
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">Our Team</h2>

        {/* Top row: 3 members, centered */}
        <div className="flex justify-center gap-6 sm:gap-12 mb-12 flex-wrap">
          {topRow.map((name) => {
            const first = name.split(' ')[0].toLowerCase();
            const src = photos[first];
            const sizeClass = 'w-32 h-32 sm:w-44 h-44';
            const ringClass = 'ring-2 ring-gray-200';
            const shadowClass = 'shadow-sm';
            const avatarWrapperClass = `${sizeClass} rounded-full overflow-hidden bg-white flex items-center justify-center ${ringClass} ${shadowClass}`;
            const fallbackBg = cyanAccent.has(first) ? 'bg-[#00f2ef]' : 'bg-gray-300';
            return (
              <div key={name} className="flex flex-col items-center z-10">
                {src ? (
                  <div className={avatarWrapperClass}>
                    <Image
                      src={src}
                      alt={`Photo of ${name}`}
                      width={176}
                      height={176}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div
                    className={`${sizeClass} rounded-full flex items-center justify-center text-xl sm:text-2xl font-semibold text-white ${fallbackBg} ${ringClass} ${shadowClass}`}
                  >
                    {name.split(' ').map(n => n[0]).slice(0,2).join('')}
                  </div>
                )}
                <p className="mt-4 text-center text-xs sm:text-sm text-gray-800">{name}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom row: 4 members, centered */}
        <div className="flex justify-center gap-6 sm:gap-12 flex-wrap">
          {bottomRow.map((name) => {
            const first = name.split(' ')[0].toLowerCase();
            const src = photos[first];
            const sizeClass = 'w-32 h-32 sm:w-44 h-44';
            const ringClass = 'ring-2 ring-gray-200';
            const shadowClass = 'shadow-sm';
            const avatarWrapperClass = `${sizeClass} rounded-full overflow-hidden bg-white flex items-center justify-center ${ringClass} ${shadowClass}`;
            const fallbackBg = cyanAccent.has(first) ? 'bg-[#00f2ef]' : 'bg-gray-300';
            return (
              <div key={name} className="flex flex-col items-center z-10">
                {src ? (
                  <div className={avatarWrapperClass}>
                    <Image
                      src={src}
                      alt={`Photo of ${name}`}
                      width={176}
                      height={176}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div
                    className={`${sizeClass} rounded-full flex items-center justify-center text-xl sm:text-2xl font-semibold text-white ${fallbackBg} ${ringClass} ${shadowClass}`}
                  >
                    {name.split(' ').map(n => n[0]).slice(0,2).join('')}
                  </div>
                )}
                <p className="mt-4 text-center text-xs sm:text-sm text-gray-800">{name}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link href="/company/team" className="inline-flex items-center gap-2 text-sm text-blue-700 font-medium hover:underline">
            More about the team <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
