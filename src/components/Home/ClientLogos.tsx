import React from 'react';
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

// Duplicate list for seamless scrolling
const scrollingLogos = [...logos, ...logos];

const ClientLogos = () => {
  return (
    <section className="pb-16 pt-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Trusted by Leading Brands</h3>
          <p className="text-lg text-gray-600">We work with industry leaders across various sectors</p>
        </div>
        <div className="relative overflow-hidden" aria-label="Client logos">
          <div className="flex items-center space-x-8 animate-scroll">
            {scrollingLogos.map((logo, idx) => (
              <div key={idx} className="flex-shrink-0 w-32 h-20 flex items-center justify-center p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={`/clients/${logo.file}`}
                  alt={`${logo.name} logo`}
                  width={120}
                  height={60}
                  className="object-contain max-h-full w-auto"
                  loading={idx < 8 ? 'eager' : 'lazy'}
                />
                <span className="sr-only">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
