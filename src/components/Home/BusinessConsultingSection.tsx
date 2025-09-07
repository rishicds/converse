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
      category: 'BUSINESS DEVELOPMENT',
      items: [
        'Strategic Value Consumer Analysis', 
        'Market Opportunity Assessment', 
        'Competitive Intelligence Mapping', 
        'Business Strategy & Implementation'
      ],
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80",
      description: "Transform your business with strategic development solutions that drive sustainable growth and market leadership."
    },
    {
      category: 'BRAND STRATEGY',
      items: [
        'Brand Positioning & Identity', 
        'Consumer Behavior Analysis', 
        'Brand Architecture Development', 
        'Marketing Communication Strategy'
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80",
      description: "Build powerful brand strategies that resonate with your target audience and differentiate you from competitors."
    },
    {
      category: 'FINANCIAL PLANNING',
      items: [
        'Revenue Forecasting & Modeling', 
        'Investment Strategy Planning', 
        'Cost Optimization Analysis', 
        'Financial Risk Assessment'
      ],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80",
      description: "Strategic financial planning to maximize profitability and ensure long-term business sustainability."
    },
    {
      category: 'DRIVING GROWTH',
      items: [
        'Growth Strategy Development', 
        'Market Expansion Planning', 
        'Customer Acquisition Strategies', 
        'Revenue Stream Optimization'
      ],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
      description: "Accelerate your business growth with data-driven strategies and proven methodologies."
    },
    {
      category: 'ROUTE TO MARKET',
      items: [
        'Distribution Channel Strategy', 
        'Go-to-Market Planning', 
        'Channel Partner Development', 
        'Market Entry Strategies'
      ],
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&q=80",
      description: "Optimize your path to market with strategic distribution and channel management solutions."
    },
    {
      category: 'SUPPLY CHAIN AND LOGISTICS',
      items: [
        'Supply Chain Optimization', 
        'Vendor Management Systems', 
        'Logistics Network Design', 
        'Inventory Management Solutions'
      ],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80",
      description: "Streamline operations with efficient supply chain and logistics management strategies."
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <div key={index} className="relative">
              <div
                className={`p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-lg ${
                  service.highlighted
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-teal-600'
                }`}
              >
                <h3 className="font-bold text-sm md:text-base mb-4 text-center">
                  {service.category}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image and Content */}
          <div className="relative">
            {/* Yellow accent background */}
            <div className="absolute -right-4 -bottom-4 w-full h-full bg-yellow-400 rounded-lg -z-10"></div>
            
            {/* Main image container */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80"
                alt="Business consultation meeting"
                width={500}
                height={320}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>

          {/* Right Side - Service Details */}
          <div className="space-y-6">
            <div className="bg-teal-600 text-white p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4">BUSINESS DEVELOPMENT</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Strategic Value Consumer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Mapping Competitive Intelligence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>SWOT Analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>Business Strategy and Implementation</span>
                </li>
              </ul>
              
              <button className="mt-6 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                Know More
              </button>
            </div>

            
            
          </div>
        </div>

        {/* Bottom Note */}
        
      </div>
    </section>
  );
};

export default BusinessConsultingSection;
