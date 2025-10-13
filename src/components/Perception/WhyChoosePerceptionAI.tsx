import React from 'react'
import Image from 'next/image'

const WhyChoosePerceptionAI = () => {
  return (
    <section className="w-full ">
      <div className="mx-auto max-w-6xl px-6">
        {/* Title */}
        <div className="mb-8 md:mb-12">
          <h2 className="flex flex-col md:flex-row items-center justify-center gap-4 text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-center">
            <span className="whitespace-nowrap font-raleway">WHY CHOOSE</span>
            <span className="flex items-center justify-center">
              {/* Brand image sized responsively */}
              <Image
                src="/perception.png"
                alt="Perception AI brand"
                width={160}
                height={160}
                className="h-10 w-40 md:h-16 md:w-12 lg:h-20 lg:w-42 object-contain"
                priority
              />
              
            </span>
          </h2>
          <p className="mt-6 max-w-4xl text-base md:text-lg leading-relaxed text-neutral-700 text-center mx-auto">
            Structured and Unstructured data flows into <span className="font-semibold">PERCEPTION</span>, a proprietary AI-powered
            analytics tool based on advanced Large Language Models (LLMs) with a conversational AI chatbot which promptly
            answers any queries related to the analyzed data.
          </p>
        </div>

        {/* Infographic image only (cards removed) */}
        <div className="mt-6">
          <div className="w-full rounded-lg overflow-hidden shadow-sm">
            <Image
              src="/perception/whychooseperception.png"
              alt="Why choose Perception AI infographic"
              width={1200}
              height={675}
              className="w-full h-auto block"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoosePerceptionAI
