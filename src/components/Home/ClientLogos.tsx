import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const logos = [
  { name: 'SABB', file: 'sabb.png' },
  { name: 'Al Hilal', file: 'alhilal.png' },
  { name: 'Allergan', file: 'allergan.png' },
  { name: 'Amazon', file: 'amazon.png' },
  { name: 'Mondelez', file: 'mondelez.png' },
  { name: 'Kelloggs', file: 'kelloggs.png' },
  { name: 'Abu Dawood', file: 'abudawood.png' },
  { name: 'Kamani Foods', file: 'kamani.png' },
  { name: 'Laurel Perfumes', file: 'laurel.png' },
  { name: 'Imagine', file: 'imagine.png' },
  { name: 'Britannia', file: 'britannia.png' },
  { name: 'Maaza', file: 'maaza.png' },
  { name: 'Emirates Food Industries', file: 'emirates.png' },
  { name: 'Foodco', file: 'foodco.png' }
];

const ClientLogos = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstGroupRef = useRef<HTMLDivElement | null>(null);
  const [groupWidth, setGroupWidth] = useState<number | null>(null);

  useEffect(() => {
    function measure() {
      if (firstGroupRef.current) {
        setGroupWidth(firstGroupRef.current.offsetWidth);
      }
    }

    measure();
    window.addEventListener('resize', measure);
    // Images may load after mount and change width; re-measure when idle
    const id = window.setTimeout(measure, 500);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const trackStyle: React.CSSProperties & Record<string, string | undefined> = {
    // set CSS variable that the keyframes use; fall back to undefined if not measured yet
    ...(groupWidth ? { ['--group-width']: `${groupWidth}px` } : {})
  };

  return (
    <section className="pb-8 pt-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Trusted by Leading Brands</h3>
          <p className="text-lg text-gray-600">We work with industry leaders across various sectors</p>
        </div>
        <div className="relative overflow-hidden" aria-label="Client logos">
          {/* track: duplicated sequences for seamless scroll (second sequence is aria-hidden) */}
          <div
            ref={trackRef}
            className="flex items-center animate-scroll will-change-transform"
            style={trackStyle}
          >
            <div ref={firstGroupRef} className="flex items-center">
              {logos.map((logo, i) => (
                <div key={`${logo.file}-1-${i}`} className="flex-shrink-0 w-32 h-20 flex items-center justify-center p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow mr-8">
                  <Image
                    src={`/clients/${logo.file}`}
                    alt={`${logo.name} logo`}
                    width={120}
                    height={60}
                    className="object-contain max-h-full w-auto"
                    loading={i < 6 ? 'eager' : 'lazy'}
                  />
                  <span className="sr-only">{logo.name}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center" aria-hidden="true">
              {logos.map((logo, i) => (
                <div key={`${logo.file}-2-${i}`} className="flex-shrink-0 w-32 h-20 flex items-center justify-center p-2 rounded-lg bg-white border border-gray-200 shadow-sm mr-8">
                  <Image
                    src={`/clients/${logo.file}`}
                    alt={`${logo.name} logo`}
                    width={120}
                    height={60}
                    className="object-contain max-h-full w-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
