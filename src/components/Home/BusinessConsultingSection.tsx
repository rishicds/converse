'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface ServiceData {
  category: string;
  items: string[];
  image: string;
  description: string;
}

const BusinessConsultingSection = () => {
  const [activeService, setActiveService] = useState(0);

  const services: ServiceData[] = [
    {
      category: 'BUSINESS DEVELOPMENT ',
      items: [
        'Strategic Value Consumer', 
        'Mapping Competitive Intelligence', 
        'SWOT Analysis', 
        'Business Strategy and Implementation'
      ],
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80",
      description: "Transform your business with strategic development solutions that drive sustainable growth and market leadership through comprehensive analysis and implementation."
    },
    {
      category: 'BRAND STRATEGY ',
      items: [
        'Brand Equity', 
        'Campaign Strategy', 
        'Marketing Mix Development', 
        'Innovation Strategy',
        'Concept to Execution'
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80",
      description: "Build powerful brand strategies that resonate with your target audience and differentiate you from competitors through innovative campaigns and execution."
    },
    {
      category: 'FINANCIAL PLANNING ',
      items: [
        'Financial Modelling', 
        'Planning and Tracking', 
        'P&L Management'
      ],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80",
      description: "Strategic financial planning to maximize profitability and ensure long-term business sustainability through comprehensive modeling and P&L management."
    },
    {
      category: 'DRIVING GROWTH ',
      items: [
        'Strategic Growth Model', 
        'Implementing Best Practices', 
        'Leadership & CXO Advisory'
      ],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
      description: "Accelerate your business growth with data-driven strategies, proven methodologies, and executive-level advisory services."
    },
    {
      category: 'ROUTE TO MARKET ',
      items: [
        'RTM Strategy', 
        'Distributor Vetting and Management', 
        'Food Service'
      ],
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&q=80",
      description: "Optimize your path to market with strategic distribution and channel management solutions tailored for your industry."
    },
    {
      category: 'SUPPLY CHAIN & LOGISTICS ',
      items: [
        'Integrated Business Planning (IBP)', 
        'Procurement', 
        'Logistics'
      ],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80",
      description: "Streamline operations with efficient supply chain and logistics management strategies through integrated business planning."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            WE BUILD AND NURTURE OUR CLIENTS BRANDS AS IF THEY ARE OUR OWN
          </h2>
        </div>

        {/* Services Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => setActiveService(index)}
              className={`p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                activeService === index
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg'
                  : 'bg-white text-gray-900 border-gray-300 hover:border-[var(--primary)]'
              }`}
            >
              <h3 className="font-bold text-sm md:text-base text-center">
                {service.category}
              </h3>
            </button>
          ))}
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Dynamic Image */}
          <div className="relative">
            {/* Yellow accent background */}
            <div className="absolute -right-4 -bottom-4 w-full h-full bg-yellow-400 rounded-lg -z-10"></div>
            
            {/* Main image container */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                key={activeService} // Force re-render on service change
                src={services[activeService].image}
                alt={`${services[activeService].category} consultation`}
                width={500}
                height={320}
                className="w-full h-64 md:h-80 object-cover transition-opacity duration-500"
              />
            </div>
          </div>

          {/* Right Side - Dynamic Service Details */}
          <div className="space-y-6">
            <div className="bg-[var(--primary)] text-white p-6 rounded-lg transition-all duration-500">
              <h3 className="font-bold text-lg mb-2">{services[activeService].category}</h3>
              <p className="text-blue-100 mb-4 text-sm">
                {services[activeService].description}
              </p>
              <ul className="space-y-3">
                {services[activeService].items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              
              <button className="mt-6 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                Know More
              </button>
            </div>

            {/* Service Categories */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg text-center hover:bg-gray-200 transition-colors duration-300">
                <h4 className="font-semibold text-gray-900">MARKETING</h4>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center hover:bg-gray-200 transition-colors duration-300">
                <h4 className="font-semibold text-gray-900">BUSINESS</h4>
              </div>
            </div> */}
          </div>
        </div>

        {/* Bottom Navigation Indicator */}
        {/* <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  activeService === index ? 'bg-[var(--primary)]' : 'bg-gray-300'
                }`}
                aria-label={`Select ${services[index].category}`}
              />
            ))}
          </div>
        </div> */}

        {/* Bottom Note */}
        
      </div>
    </section>
  );
};

export default BusinessConsultingSection;
