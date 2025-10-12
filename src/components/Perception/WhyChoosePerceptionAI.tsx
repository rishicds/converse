import React from 'react'
import Image from 'next/image'

const WhyChoosePerceptionAI = () => {
  return (
    <section className="w-full py-6 md:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-6xl w-full">
        {/* Title */}
        <div className="mb-4 md:mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 mb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-center font-raleway">
              WHY CHOOSE
            </h2>
            <div className="flex items-center">
              {/* Brain / brand image inserted within the word */}
              <Image
                src="/perception.png"
                alt="Perception AI brand"
                width={100}
                height={100}
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32 object-contain"
                priority
                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, (max-width: 1280px) 112px, 128px"
              />
            </div>
          </div>
          <p className="mt-3 md:mt-4 max-w-4xl text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-700 text-center mx-auto px-4 sm:px-0">
            Structured and Unstructured data flows into <span className="font-semibold">PERCEPTION</span>, a proprietary AI-powered
            analytics tool based on advanced Large Language Models (LLMs) with a conversational AI chatbot which promptly
            answers any queries related to the analyzed data.
          </p>
        </div>

        {/* Infographic image only (cards removed) */}
        <div className="mt-4 md:mt-6">
          <Image
            src="/perception/whychooseperception.png"
            alt="Why choose Perception AI infographic"
            width={1200}
            height={675}
            className="w-full h-auto"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </div>
      </div>
    </section>
  )
}

export default WhyChoosePerceptionAI
