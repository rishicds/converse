"use client"
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useInView, animate } from 'framer-motion';

interface CounterDigitProps {
  digit: string;
  isComma?: boolean;
}

const CounterDigit = ({ digit, isComma }: CounterDigitProps) => {
  if (isComma) {
    return (
      <span className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mx-1">
        ,
      </span>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-2 sm:p-3 lg:p-4 mx-0.5">
      <span className="text-blue-900 text-4xl sm:text-5xl lg:text-6xl font-bold leading-none">
        {digit}
      </span>
    </div>
  );
};

interface AnimatedCounterProps {
  targetNumber: number;
}

const AnimatedCounter = ({ targetNumber }: AnimatedCounterProps) => {
  const [displayNumber, setDisplayNumber] = React.useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;

    animate(0, targetNumber, {
      duration: 2.5,
      onUpdate(value) {
        setDisplayNumber(Math.floor(value));
      },
    });
  }, [targetNumber, isInView]);

  // Format the number with commas
  const formattedNumber = displayNumber.toLocaleString();

  return (
    <div ref={ref} className="flex items-center justify-center gap-1">
      {formattedNumber.split('').map((char, index) => (
        <CounterDigit 
          key={index} 
          digit={char} 
          isComma={char === ','} 
        />
      ))}
    </div>
  );
};

const AnalyticsDashboard = () => {
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
    <section className="py-8 sm:py-12 lg:py-16 flex justify-center items-center bg-transparent">
      <div className="bg-[#0c1e43] rounded-3xl shadow-2xl px-4 sm:px-6 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-4 lg:gap-6 max-w-7xl w-full" style={{borderRadius: '2rem'}}>
            
        {/* Left side - Two columns of client faces (hidden on mobile/small tablets, show single column on md, two columns on lg+) */}
        <div className="hidden md:flex h-96 overflow-hidden md:w-40 lg:w-64 md:gap-1 lg:gap-2">
          {/* First column - always visible on md+ */}
          <div className="flex-1 flex flex-col items-center">
            {clientFaces.slice(0, 6).map((client, index) => (
              <div
                key={`left1-${client.id}-${index}`}
                className="md:w-16 md:h-18 lg:w-20 lg:h-24 rounded-lg flex items-center justify-center mb-1 flex-shrink-0 overflow-hidden"
              >
                <Image
                  src={client.avatar}
                  alt={client.name}
                  width={80}
                  height={96}
                  className="md:w-16 md:h-18 lg:w-20 lg:h-24 rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Second column - only visible on lg+ */}
          <div className="hidden lg:flex flex-1 flex-col items-center">
            {clientFaces.slice(6, 12).map((client, index) => (
              <div
                key={`left2-${client.id}-${index}`}
                className="w-20 h-24 rounded-lg flex items-center justify-center mb-1 flex-shrink-0 overflow-hidden"
              >
                <Image
                  src={client.avatar}
                  alt={client.name}
                  width={80}
                  height={96}
                  className="w-20 h-24 rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>            {/* Center - Main content */}
            <div className="flex-1 text-center px-2 sm:px-4 md:px-6 lg:px-8 w-full max-w-md md:max-w-lg lg:max-w-none mx-auto">
              {/* Perception Logo */}
              <div className="mb-3 sm:mb-4 lg:mb-6 flex justify-center">
                <Image
                  src="/perception.png"
                  alt="Perception Logo"
                  width={200}
                  height={200}
                  style={{ height: '120px', width: 'auto' }}
                  priority
                />
              </div>

              {/* Counter */}
              <div className="mb-3 sm:mb-4">
                <p className="text-white text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8">
                  Number of online conversations analyzed
                </p>
                
                {/* Animated Counter with individual digit boxes */}
                <div className="mb-4">
                  <AnimatedCounter targetNumber={23381630} />
                </div>

                {/* Red indicator dot */}
                
              </div>

              {/* Mobile client faces - horizontal layout */}
              <div className="md:hidden w-full mb-4">
                <div className="flex items-center justify-center gap-1 overflow-hidden">
                  <div className="flex">
                    {clientFaces.slice(0, 8).map((client, index) => (
                      <div
                        key={`mobile-${client.id}-${index}`}
                        className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mx-0.5 overflow-hidden"
                      >
                        <Image
                          src={client.avatar}
                          alt={client.name}
                          width={56}
                          height={56}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Two columns of client faces (hidden on mobile/small tablets, show single column on md, two columns on lg+) */}
            <div className="hidden md:flex h-96 overflow-hidden md:w-40 lg:w-64 md:gap-1 lg:gap-2">
              {/* First column - always visible on md+ */}
              <div className="flex-1 flex flex-col items-center">
                {clientFaces.slice(0, 6).map((client, index) => (
                  <div
                    key={`right1-${client.id}-${index}`}
                    className="md:w-16 md:h-18 lg:w-20 lg:h-24 rounded-lg flex items-center justify-center mb-1 flex-shrink-0 overflow-hidden"
                  >
                    <Image
                      src={client.avatar}
                      alt={client.name}
                      width={80}
                      height={96}
                      className="md:w-16 md:h-18 lg:w-20 lg:h-24 rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
             
              {/* Second column - only visible on lg+ */}
              <div className="hidden lg:flex flex-1 flex-col items-center">
                {clientFaces.slice(6, 12).map((client, index) => (
                  <div
                    key={`right2-${client.id}-${index}`}
                    className="w-20 h-24 pt-4 rounded-lg flex items-center justify-center mb-1 flex-shrink-0 overflow-hidden"
                  >
                    <Image
                      src={client.avatar}
                      alt={client.name}
                      width={80}
                      height={96}
                      className="w-20 h-24 rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        
      
    </section>
  );
};

export default AnalyticsDashboard;
