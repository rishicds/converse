import React from 'react';
import PerceptionPageWrapper from '@/components/Perception/PerceptionPageWrapper';
import PerceptionOverview from '@/components/Perception/PerceptionOverview';
import StructuredUnstructuredSection from '@/components/Perception/StructuredUnstructuredSection';
import AIPoweredAnalytics from '@/components/Perception/AIPoweredAnalytics';
import WhyChoosePerceptionAI from '@/components/Perception/WhyChoosePerceptionAI';
export const metadata = {
  title: 'Perception | AI Powered Advanced Analytics',
  description: 'AI powered advanced analytics and research augmentation.'
};

const PerceptionPage = () => {
  return (
    <PerceptionPageWrapper>
      <PerceptionOverview />
      <div className="mt-24">
        <StructuredUnstructuredSection />
        <AIPoweredAnalytics />
        <WhyChoosePerceptionAI />
      </div>
    </PerceptionPageWrapper>
  );
};

export default PerceptionPage;

