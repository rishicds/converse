import React from 'react';
import Navbar from '@/components/shared/Navbar';
import HeroSection from '@/components/Home/Hero/HeroSection';
import ServiceCard from '@/components/Home/Hero/ServiceCard';
import ClientLogos from '@/components/Home/ClientLogos';
import AnalyticsDashboard from '@/components/Home/AnalyticsDashboard';
import ResearchSection from '@/components/Home/ResearchSection';
import BusinessConsultingSection from '@/components/Home/BusinessConsultingSection';

const HomePage = () => {
  const services = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80",
      title: "Research and Analytics PERCEPTION",
      description: "Unlock category and brand customer insights augmented by our LLM based AI tool that decodes authentic conversations.",
      isLogo: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&q=80",
      title: "Business and Marketing Consulting",
      description: "With deep CPG / FMCG expertise, we provide strategic consulting in marketing and operations, acting as an embedded extension of our clients' teams wherever support is needed."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                image={service.image}
                title={service.title}
                description={service.description}
                isLogo={service.isLogo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <ClientLogos />

      {/* Analytics Dashboard Section */}
      <AnalyticsDashboard />
      <ResearchSection />
       <BusinessConsultingSection />
    </div>
  );
};

export default HomePage;
