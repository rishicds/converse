import React from 'react'
import Image from 'next/image'

const WhyChoosePerceptionAI = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Title */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight flex flex-wrap items-center justify-center gap-2">
            <span className="whitespace-nowrap text-center font-raleway">WHY CHOOSE</span>
            <span className="flex items-center gap-2">
              
              {/* Brain / brand image inserted within the word */}
              <Image
                src="/perception.png"
                alt="Perception AI brand"
                width={100}
                height={100}
                className="h-60 w-60 md:h-20 md:w-65 object-contain"
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
        <div className="mt-8">
          <Image
            src="/perception/whychooseperception.png"
            alt="Why choose Perception AI infographic"
            width={1200}
            height={675}
            className="w-full h-auto "
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default WhyChoosePerceptionAI
