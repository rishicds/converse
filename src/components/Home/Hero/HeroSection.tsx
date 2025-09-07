import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-raleway">
          STRATEGIC BUSINESS CONSULTING AND ADVANCED RESEARCH SOLUTIONS
        </h1>
        
        <h2 className="text-xl md:text-2xl text-[#5c768d] mb-8 font-raleway font-semibold">
          Helping businesses grow through tailored strategy and data-driven insights
        </h2>
        
        <p className="text-lg text-gray-600 max-w-4xl mx-auto font-open-sans leading-relaxed">
          We are a team of highly experienced marketers, strategic thinkers and research analysts creating value through insightful analytics
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
