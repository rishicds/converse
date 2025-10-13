import React from 'react';
import PerceptionPageWrapper from '@/components/Perception/PerceptionPageWrapper';
import PerceptionOverview from '@/components/Perception/PerceptionOverview';
import StructuredUnstructuredSection from '@/components/Perception/StructuredUnstructuredSection';
import AIPoweredAnalytics from '@/components/Perception/AIPoweredAnalytics';
import WhyChoosePerceptionAI from '@/components/Perception/WhyChoosePerceptionAI';
import UnstructuredPerceptionSection from '@/components/Perception/UnstructuredPerceptionSection';
import WhyClientsChooseUs from '@/components/Perception/WhyClientsChooseUs';
import HowBigDataAnalysisWorks from '@/components/Perception/HowBigDataAnalysisWorks';
export const metadata = {
  title: 'Perception | AI Powered Advanced Analytics',
  description: 'AI powered advanced analytics and research augmentation.'
};

const PerceptionPage = () => {
  return (
    <PerceptionPageWrapper>
      <PerceptionOverview />
      <div className="mt-8 md:mt-12 lg:mt-16 space-y-8 md:space-y-12 lg:space-y-16 overflow-hidden">
        <StructuredUnstructuredSection />
        <AIPoweredAnalytics />
        <WhyChoosePerceptionAI />
        <UnstructuredPerceptionSection />
        <WhyClientsChooseUs />
        <HowBigDataAnalysisWorks />
      </div>
    </PerceptionPageWrapper>
  );
};

export default PerceptionPage;

