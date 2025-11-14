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
      {formattedNumber.split('').map((digit, idx) =>
        digit === ',' ? (
          <span
            key={idx}
            className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mx-0.5"
            style={{ minWidth: '1rem', textAlign: 'center' }}
          >
            ,
          </span>
        ) : (
          <span
            key={idx}
            className="bg-white text-blue-900 font-bold rounded px-2 py-1 text-2xl sm:text-3xl md:text-5xl lg:text-6xl shadow"
            style={{ minWidth: '2rem', textAlign: 'center' }}
          >
            {digit}
          </span>
        )
      )}
    </div>
  );
};

const AnalyticsDashboard = () => {
  // Client images data
  const clientImages = [
    { id: 1, name: 'Client 1', image: '/clientpics/c1.png?v=2' },
    { id: 2, name: 'Client 2', image: '/clientpics/c2.png?v=2' },
    { id: 3, name: 'Client 3', image: '/clientpics/c3.png?v=2' },
    { id: 4, name: 'Client 4', image: '/clientpics/c4.png?v=2' },
    { id: 5, name: 'Client 5', image: '/clientpics/c5.png?v=2' },
    { id: 6, name: 'Client 6', image: '/clientpics/c6.png?v=2' },
    { id: 7, name: 'Client 7', image: '/clientpics/c7.png?v=2' },
    { id: 8, name: 'Client 8', image: '/clientpics/c8.png?v=2' },
    { id: 9, name: 'Client 9', image: '/clientpics/c9.png?v=2' },
    { id: 10, name: 'Client 10', image: '/clientpics/c10.png?v=2' },
    { id: 11, name: 'Client 11', image: '/clientpics/c11.png?v=2' },
    { id: 12, name: 'Client 12', image: '/clientpics/c12.png?v=2' },
    { id: 13, name: 'Client 13', image: '/clientpics/c13.png?v=2' },
    { id: 14, name: 'Client 14', image: '/clientpics/c14.png?v=2' },
    { id: 15, name: 'Client 15', image: '/clientpics/c15.png?v=2' },
    { id: 16, name: 'Client 16', image: '/clientpics/c16.png?v=2' },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 flex justify-center items-center bg-transparent">
      <div className="bg-[#0c1e43] rounded-3xl shadow-2xl px-4 sm:px-6 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-4 lg:gap-6 max-w-7xl w-full" style={{borderRadius: '2rem'}}>
            
        {/* Left side - Two columns of client images (hidden on mobile/small tablets, show single column on md, two columns on lg+) */}
        <div className="hidden md:flex h-96 overflow-hidden md:w-40 lg:w-64 md:gap-1 lg:gap-2">
          {/* First column - always visible on md+ */}
          <div className="flex-1 flex flex-col items-center">
            {clientImages.slice(0, 4).map((client, index) => (
              <div
                key={`left1-${client.id}-${index}`}
                className="md:w-16 md:h-18 lg:w-20 lg:h-24 rounded-lg flex items-center justify-center mb-1 flex-shrink-0 overflow-hidden"
              >
                <Image
                  src={client.image}
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
            {clientImages.slice(4, 8).map((client, index) => (
              <div
                key={`left2-${client.id}-${index}`}
                className="w-20 h-24 rounded-lg flex items-center justify-center mb-1 flex-shrink-0 overflow-hidden"
              >
                <Image
                  src={client.image}
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
                  src="/perception.png?v=2"
                  alt="Perception Logo"
                  width={200}
                  height={200}
                  className="h-16 w-auto sm:h-24 md:h-28 lg:h-[120px]"
                  priority
                />
              </div>

              {/* Counter */}
              <div className="mb-3 sm:mb-4">
                <p className="text-white text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8">
                  Number of conversations analyzed
                </p>
                
                {/* Animated Counter with individual digit boxes */}
                <div className="mb-4">
                  <AnimatedCounter targetNumber={23381630} />
                </div>

                {/* Red indicator dot */}
                
              </div>

              {/* Mobile client images - horizontal layout */}
              <div className="md:hidden w-full mb-4">
                <div className="flex items-center justify-center gap-1 overflow-hidden">
                  <div className="flex">
                    {clientImages.slice(0, 16).map((client, index) => (
                      <div
                        key={`mobile-${client.id}-${index}`}
                        className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mx-0.5 overflow-hidden"
                      >
                        <Image
                          src={client.image}
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

            {/* Right side - Two columns of client images (hidden on mobile/small tablets, show single column on md, two columns on lg+) */}
            <div className="hidden md:flex h-96 overflow-hidden md:w-40 lg:w-64 md:gap-1 lg:gap-2">
              {/* First column - always visible on md+ */}
              <div className="flex-1 flex flex-col items-center">
                {clientImages.slice(8, 12).map((client, index) => (
                  <div
                    key={`right1-${client.id}-${index}`}
                    className="md:w-16 md:h-18 lg:w-20 lg:h-24 rounded-lg flex items-center justify-center mb-1 flex-shrink-0 overflow-hidden"
                  >
                    <Image
                      src={client.image}
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
                {clientImages.slice(12, 16).map((client, index) => (
                  <div
                    key={`right2-${client.id}-${index}`}
                    className="w-20 h-24 pt-4 rounded-lg flex items-center justify-center mb-1 flex-shrink-0 overflow-hidden"
                  >
                    <Image
                      src={client.image}
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

