'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import ServiceNavigation from '@/components/shared/ServiceNavigation'

interface ServiceItem {
  id: string
  title: string
  description: string
  image: string
}

const services: ServiceItem[] = [
  {
    id: 'strategic-growth-model',
    title: 'STRATEGIC GROWTH MODEL',
    description: "We'll guide you on taking a fresh look at the business. Setting a Vision, long term goals. By using strategic frameworks, we will put together a Growth model that works for the customers and community it serves in a sustainable manner.",
    image: '/services/drivegrowth.png'
  },
  {
    id: 'implementing-best-practices',
    title: 'IMPLEMENTING BEST PRACTICES', 
    description: "We'll expose the Leadership team to best-in-class management practices and processes that build a strong foundation for growth. Tools like IBP (Integrated business planning), ZBB (Zero based budgeting), I2M (Ideas to market) are some of the examples.",
    image: '/services/drivegrowth.png'
  },
  {
    id: 'leadership-cxo-advisory',
    title: 'LEADERSHIP & CXO ADVISORY',
    description: "Provide hands on Leadership to the team by joining the Board as \"shadow\" CEO, CMO for 1–2-year assignments and train the next rung of leaders in Strategic thinking, Business acumen, People management and Financial discipline.",
    image: '/services/drivegrowth.png'
  }
]

const ServicesPage = () => {
  const [currentService, setCurrentService] = useState(0)

  const nextService = () => {
    setCurrentService((prev) => (prev + 1) % services.length)
  }

  const prevService = () => {
    setCurrentService((prev) => (prev - 1 + services.length) % services.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        

        {/* Services Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
            SERVICES WE PROVIDE TO OUR CLIENTS IN THE AREAS OF<br />
            DRIVING GROWTH
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {services[currentService].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {services[currentService].description}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center space-x-4 mt-8">
                <button
                  onClick={prevService}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </button>
                
                

                <button
                  onClick={nextService}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <span>Next</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Service Indicators */}
              <div className="flex space-x-2 justify-center mt-6">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentService(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentService ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative h-96 w-full">
                <Image
                  src="/services/drivegrowth.png"
                  alt="Driving Growth"
                  fill
                  className="object-cover rounded-lg"
                />
                {/* Yellow accent */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-yellow-400 rounded-tl-lg"></div>
              </div>
            </div>
          </div>

          {/* Service Tabs hidden as requested */}
        </div>
      </div>
      
      {/* Service Navigation */}
      <ServiceNavigation />
    </div>
  )
}

export default ServicesPage
