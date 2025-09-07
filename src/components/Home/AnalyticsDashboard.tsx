"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const AnalyticsDashboard = () => {
  const [count, setCount] = useState(0);
  const targetCount = 23381630; // The number shown in the image

  useEffect(() => {
    const duration = 3000; // Animation duration in milliseconds
    const increment = targetCount / (duration / 50); // Update every 50ms
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const getDigits = (num: number) => {
    const numStr = formatNumber(num);
    return numStr.split('').map((char, index) => ({ char, index }));
  };

  // Sample client faces/avatars data (repeat for infinite effect)
  const clientFaces = [
    { id: 1, name: 'Client 1', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Client 2', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Client 3', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, name: 'Client 4', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: 5, name: 'Client 5', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { id: 6, name: 'Client 6', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
    { id: 7, name: 'Client 7', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
    { id: 8, name: 'Client 8', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
    { id: 9, name: 'Client 9', avatar: 'https://randomuser.me/api/portraits/men/9.jpg' },
    { id: 10, name: 'Client 10', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' },
    { id: 11, name: 'Client 11', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
    { id: 12, name: 'Client 12', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-8 shadow-2xl border border-blue-600/30">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-8">
            
            {/* Left side - Two columns of client faces with infinite scroll (hidden on mobile) */}
            <div className="hidden lg:flex relative h-96 overflow-hidden w-48 flex-row items-center gap-2">
              {/* First column */}
              <div className="absolute left-0 top-0 h-full w-1/2 flex flex-col items-center animate-scroll-up">
                {[...clientFaces, ...clientFaces].map((client, index) => (
                  <div
                    key={`left1-${client.id}-${index}`}
                    className="w-24 h-28 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center shadow-lg mb-4 flex-shrink-0"
                  >
                    <Image
                      src={client.avatar}
                      alt={client.name}
                      width={88}
                      height={104}
                      className="w-22 h-26 rounded-2xl object-cover shadow"
                    />
                  </div>
                ))}
              </div>
              {/* Second column, offset for staggered effect */}
              <div className="absolute right-0 top-8 h-full w-1/2 flex flex-col items-center animate-scroll-up">
                {[...clientFaces, ...clientFaces].map((client, index) => (
                  <div
                    key={`left2-${client.id}-${index}`}
                    className="w-24 h-28 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center shadow-lg mb-4 flex-shrink-0"
                  >
                    <Image
                      src={client.avatar}
                      alt={client.name}
                      width={88}
                      height={104}
                      className="w-22 h-26 rounded-2xl object-cover shadow"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Center - Main content */}
            <div className="flex-1 text-center px-2 sm:px-4 lg:px-8 w-full max-w-md lg:max-w-none mx-auto">
              {/* Perception Logo */}
              <div className="mb-3 sm:mb-4 lg:mb-6">
                <div className="inline-block">
                  <Image 
                    src="/perception.png" 
                    alt="Perception" 
                    width={120}
                    height={48}
                    className="h-6 sm:h-8 lg:h-12 w-auto"
                  />
                </div>
              </div>

              {/* Counter */}
              <div className="mb-3 sm:mb-4">
                <p className="text-white/90 text-xs sm:text-sm lg:text-lg mb-2 sm:mb-3 lg:mb-4 px-2">
                  Number of online conversations analyzed
                </p>
                
                {/* Mobile: Stack digits differently */}
                <div className="flex justify-center items-center flex-wrap gap-0.5 sm:gap-1 mb-3 sm:mb-4 lg:mb-6">
                  {getDigits(count).map(({ char, index }) => (
                    char === ',' ? (
                      <span key={index} className="text-white text-sm sm:text-lg lg:text-2xl font-bold mx-0.5 sm:mx-1">
                        {char}
                      </span>
                    ) : (
                      <div
                        key={index}
                        className="bg-white/90 rounded-md sm:rounded-lg p-1.5 sm:p-2 lg:p-4 min-w-[1.75rem] sm:min-w-[2.5rem] lg:min-w-[3rem] h-8 sm:h-12 lg:h-16 flex items-center justify-center shadow-lg"
                      >
                        <span className="font-bold text-sm sm:text-lg lg:text-2xl text-blue-900">
                          {char}
                        </span>
                      </div>
                    )
                  ))}
                </div>

                {/* Red indicator dot */}
                
                
                {/* Chevron down */}
                
              </div>

              {/* Mobile client faces - horizontal scroll */}
              <div className="lg:hidden w-full mb-4">
                <div className="flex items-center justify-center gap-2 overflow-hidden">
                  <div className="flex animate-scroll">
                    {[...clientFaces, ...clientFaces].map((client, index) => (
                      <div
                        key={`mobile-${client.id}-${index}`}
                        className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center shadow-lg mx-1"
                      >
                        <Image
                          src={client.avatar}
                          alt={client.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-lg object-cover shadow"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Two columns of client faces with infinite scroll (hidden on mobile) */}
            <div className="hidden lg:flex relative h-96 overflow-hidden w-48 flex-row items-center gap-2">
              {/* First column */}
              <div className="absolute left-0 top-0 h-full w-1/2 flex flex-col items-center animate-scroll-down">
                {[...clientFaces, ...clientFaces].map((client, index) => (
                  <div
                    key={`right1-${client.id}-${index}`}
                    className="w-24 h-28 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center shadow-lg mb-4 flex-shrink-0"
                  >
                    <Image
                      src={client.avatar}
                      alt={client.name}
                      width={88}
                      height={104}
                      className="w-22 h-26 rounded-2xl object-cover shadow"
                    />
                  </div>
                ))}
              </div>
              {/* Second column, offset for staggered effect */}
              <div className="absolute right-0 top-8 h-full w-1/2 flex flex-col items-center animate-scroll-down">
                {[...clientFaces, ...clientFaces].map((client, index) => (
                  <div
                    key={`right2-${client.id}-${index}`}
                    className="w-24 h-28 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center shadow-lg mb-4 flex-shrink-0"
                  >
                    <Image
                      src={client.avatar}
                      alt={client.name}
                      width={88}
                      height={104}
                      className="w-22 h-26 rounded-2xl object-cover shadow"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default AnalyticsDashboard;
