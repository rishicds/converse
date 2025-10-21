import React from 'react'
import Image from 'next/image'

const AIPoweredAnalytics = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-8 sm:px-6 md:py-12">
      <h1 className="uppercase text-2xl sm:text-3xl md:text-4xl pb-6 lg:text-5xl xl:text-4xl font-bold mb-4 text-center leading-tight">
        AI Powered Analytics Comes to life
      </h1>
      <Image
        src="/perception/aipoweredanalytics.png"
        alt="AI Powered Advanced Analytics Flow"
        width={900}
        height={480}
        className="w-full max-w-7xl h-auto "
        priority
      />
    </div>
  )
}

export default AIPoweredAnalytics
