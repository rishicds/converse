"use client"
import React from 'react';
import HeroSection from '@/components/Home/Hero/HeroSection';
import ServiceCard from '@/components/Home/Hero/ServiceCard';
import ClientLogos from '@/components/Home/ClientLogos';
import AnalyticsDashboard from '@/components/Home/AnalyticsDashboard';
import ResearchSection from '@/components/Home/ResearchSection';
import BusinessConsultingSection from '@/components/Home/BusinessConsultingSection';
import ContactSection from '@/components/Home/ContactSection';

const HomePage = () => {
  const services = [
    {
      id: 1,
      image: "/home/hero/ai.png",
        title: (
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap">Research and Analytics</span>
            <img src="/perception.png" alt="Perception Logo" className="h-8 w-auto sm:h-10 ml" />
          </div>
        ),
      description: "Unlock category and brand customer insights augmented by our LLM based AI tool that decodes authentic conversations.",
      isLogo: false,
      targetId: 'research'
    },
    {
      id: 2,
      image: "/home/hero/business.png",
      title: "Business and Marketing Consulting",
      description: "With deep CPG / FMCG expertise, we provide strategic consulting in marketing and operations, acting as an embedded extension of our clients' teams wherever support is needed.",
      targetId: 'consulting'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      <HeroSection />
      
      {/* Services Section */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                image={service.image}
                title={service.title}
                description={service.description}
                isLogo={service.isLogo}
                targetId={service.targetId}
              />
            ))}
          </div>
        </div>
      </section>
      <p className="max-w-5xl text-center mx-auto text-xl md:text-2xl text-[#5c768d] mb-8 font-raleway font-semibold">
          We are a team of highly experienced marketers, strategic thinkers and research analysts creating value through insightful analytics
        </p>

      {/* Client Logos Section */}
      <ClientLogos />

      {/* Analytics Dashboard Section */}
      <AnalyticsDashboard />
      <div id="research">
        <ResearchSection />
      </div>
      <div id="consulting">
        <BusinessConsultingSection />
      </div>
       
      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
};

export default HomePage;
