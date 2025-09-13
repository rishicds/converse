"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const ResearchSection = () => {
  const [activeTab, setActiveTab] = useState('I WANT');

  const researchData = {
    'I WANT': {
      title: 'Identify Customer Desires',
      description: 'Customers express a need, want or desire. This is often influenced by what they see, hear and read.',
      points: [
        'Identify Needs: Recognize the essential problems that must be solved.',
        'Understand Wants: Target the appropriate products or services based on customer preferences.',
        'Tap into Desires: Build deeper brand connections and long-term loyalty by addressing aspirational drivers'
      ],
      image: '/home/iwant.png'
    },
    'I SEARCH': {
      title: 'Customer Research Journey',
      description: 'This stage marks the beginning of the customer’s research process, during which they explore options for products or services. Customers search online, compare brands, read reviews and testimonials, and consult friends and family. Though this phase is largely invisible to marketers, it presents a valuable opportunity to shape brand awareness, relevance, and preference while customers are actively engaged.',
      image: '/home/isearch.png'
    },
    'I BUY & USE': {
      title: 'Purchase and Usage Behavior',
      description: 'At this point, customers finalize their decision regarding which product and brand to purchase and use. Their opinions are shaped by their direct experience, particularly in terms of how well the product or brand fulfils their needs, wants, or desires. Marketers can influence the final choice through store activations—both online and offline—such as promotions, product demonstrations, and engaging displays.',
      image: '/home/ibuy.png'
    },
    'I RECOMMEND': {
      title: 'Customer Advocacy and Referrals',
      description: 'After consumption, customers reflect on their experience and evaluate whether the product delivered on its brand promise. Satisfied customers often become brand advocates, sharing their opinions and influencing potential buyers. This advocacy not only enhances brand equity and loyalty but also encourages repeat purchases. Businesses benefit through sustained revenue and the potential for incremental growth via product innovation and brand extensions.',
      image: '/home/irecommend.png'
    }
  };

  return (
  <section className="py-16 px-4 md:px-8 lg:px-16" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
            HUMAN BEHAVIOUR-LED RESEARCH, AUGMENTED BY PERCEPTION
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
        {Object.keys(researchData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={
              activeTab === tab
                ? {
                  background: '#1e3a8a',
                  color: 'white',
                  border: 'none'
                }
                : {
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  border: '1px solid #e5e7eb'
                }
            }
            className={`px-8 py-4 text-base font-semibold transition-colors duration-200 rounded-lg min-w-[140px]`}
          >
            {tab}
          </button>
        ))}
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg overflow-hidden">
              <Image
                src={researchData[activeTab as keyof typeof researchData].image}
                alt="Research illustration"
                width={500}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {researchData[activeTab as keyof typeof researchData].title}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {researchData[activeTab as keyof typeof researchData].description}
            </p>

            {/* Only show points for 'I WANT' */}
            {activeTab === 'I WANT' && (
              <div className="space-y-4">
                <p className="font-semibold text-gray-800">For businesses, it is crucial to:</p>
                <ul className="space-y-3">
                  {researchData['I WANT'].points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-black leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Perception Logo above Know More */}
            <div className="flex flex-col items-start pt-6 gap-4">
              <div className="bg-white/90 p-3 rounded">
                <Image
                  src="/perception.png"
                  alt="Perception logo"
                  width={100}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
              <Link href="/perception" className="inline-block w-full">
              <button
                style={{
                  background: 'var(--button-primary)',
                  color: 'var(--background)',
                  border: 'none'
                }}
                className="px-8 py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-[var(--button-primary-hover)] hover:opacity-100"
              >
                Know More
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
