import React from 'react';
import Image from 'next/image';

const PerceptionOverview: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center text-[#3b3f42] mb-12 font-raleway">
        AI Powered Advanced Analytics
      </h1>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="text-lg md:text-xl leading-relaxed font-inter text-[#303030] space-y-10">
          <p>
            AI uses neural networks to learn like the human brain – connecting inputs to outputs without being manually programmed. Through deep learning, it trains itself by processing data repeatedly, improving its ability to analyze and make decisions.
          </p>
          <div>
            <h2 className="text-2xl font-bold mb-4 font-raleway">Why AI?</h2>
            <p>
              In today’s rapidly evolving world, asking questions isn’t enough—real insights live in the unstructured noise (data) you’re ignoring.
            </p>
          </div>
          <p className="font-semibold font-raleway text-[#1d2d3a]">
            At CGC we augment traditional research with NextGen technology.
          </p>
        </div>
        <div className="relative w-full aspect-video bg-black flex items-center justify-center text-center text-white text-xl font-medium rounded-sm">
          <span>video(work in progress)</span>
        </div>
      </div>
    </>
  );
};

export default PerceptionOverview;
