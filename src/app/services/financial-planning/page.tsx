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
    id: 'financial-modelling',
    title: 'FINANCIAL MODELLING',
    description: "Financial modeling and analysis play a crucial role in decision-making for businesses and investors. It provides a structured framework to forecast financial performance, assess investment opportunities and evaluate risk. Our experts in financial modelling will aid your business in making informed choices, optimizing resource allocation, and maximizing profitability, contributing significantly to informed financial planning and strategic decision-making.",
    image: '/services/finplan.png'
  },
  {
    id: 'planning-tracking',
    title: 'PLANNING AND TRACKING', 
    description: "Bringing best-in-class processes like Zero based budgeting (ZBB) to yearly, Strategic planning (3–5-year plans) processes Setting KPIs for the business in terms of Revenue, Gross margins, Productivity, Cash flows to ensure a financially sustainable model in sync with business strategy. Presenting to Leadership team/ Board and setting in place systems, processes for implementation.",
    image: '/services/finplan.png'
  },
  {
    id: 'pl-management',
    title: 'P&L MANAGEMENT',
    description: "Regular management and reporting of P&L as per global standards (e.g. US GAAP). Highlighting stress points, opportunities in product mix, and other analytical inputs for improving performance.",
    image: '/services/finplan.png'
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
            FINANCIAL PLANNING
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
                  src="/services/finplan.png"
                  alt="Financial Planning"
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
