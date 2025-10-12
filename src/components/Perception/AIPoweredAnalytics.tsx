import React from 'react'
import Image from 'next/image'

const AIPoweredAnalytics = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-6 md:py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <h1 className='uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-center leading-tight'>AI Powered Analytics Comes to life</h1>
      <div className="w-full max-w-7xl">
        <Image
          src="/perception/aipoweredanalytics.png"
          alt="AI Powered Advanced Analytics Flow"
          width={900}
          height={480}
          className="w-full h-auto"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        />
      </div>
    </div>
  )
}

export default AIPoweredAnalytics
