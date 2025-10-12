import React from 'react'
import Image from 'next/image'

const AIPoweredAnalytics = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      <h1 className='uppercase text-4xl font-bold mb-4'>AI Powered Analytics Comes to life</h1>
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
