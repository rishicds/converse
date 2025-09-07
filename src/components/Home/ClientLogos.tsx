import React from 'react';

const ClientLogos = () => {
  const clientLogos = [
    { name: 'SABB', logo: '/clients/sabb-logo.png' },
    { name: 'Al Hilal', logo: '/clients/alhilal-logo.png' },
    { name: 'Allergan', logo: '/clients/allergan-logo.png' },
    { name: 'Amazon', logo: '/clients/amazon-logo.png' },
    { name: 'Mondelez', logo: '/clients/mondelez-logo.png' },
    { name: 'Kelloggs', logo: '/clients/kelloggs-logo.png' },
    { name: 'Abu Dawood', logo: '/clients/abudawood-logo.png' },
    { name: 'Kamani Foods', logo: '/clients/kamani-logo.png' },
    { name: 'Laurel Perfumes', logo: '/clients/laurel-logo.png' },
    { name: 'Imagine', logo: '/clients/imagine-logo.png' },
    { name: 'Britannia', logo: '/clients/britannia-logo.png' },
    { name: 'Maaza', logo: '/clients/maaza-logo.png' },
    { name: 'Emirates Food Industries', logo: '/clients/emirates-logo.png' },
    { name: 'Foodco', logo: '/clients/foodco-logo.png' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Leading Brands
          </h3>
          <p className="text-lg text-gray-600">
            We work with industry leaders across various sectors
          </p>
        </div>
        
        {/* Scrolling logos container */}
        <div className="relative overflow-hidden">
          <div className="flex space-x-8 animate-scroll">
            {/* First set of logos */}
            {clientLogos.map((client, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-32 h-20 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-center px-4">
                  <span className="text-sm font-medium text-gray-700 block">
                    {client.name}
                  </span>
                  <span className="text-xs text-gray-500">Logo</span>
                </div>
              </div>
            ))}
            {/* Duplicate set for infinite scroll */}
            {clientLogos.map((client, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-32 h-20 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-center px-4">
                  <span className="text-sm font-medium text-gray-700 block">
                    {client.name}
                  </span>
                  <span className="text-xs text-gray-500">Logo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation arrows */}
        <div className="flex justify-center mt-8 space-x-4">
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
