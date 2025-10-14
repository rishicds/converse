import React from 'react'

const steps = [
  {
    number: 1,
    title: 'Issue a Brief',
    description:
      'Client shares a clear brief mentioning research background, objectives, geographic coverage, sources of data (online / offline), deliverables.'
  },
  {
    number: 2,
    title: 'Set-up Study',
    description:
      'Based on brief, taking into account sources of data, CGC team sets up study.'
  },
  {
    number: 3,
    title: 'Run Data Analysis',
    description:
      'Perception tool runs analysis, mining data from all accessible and contextually relevant online conversations and/or offline sources (previous research, customer internal data, etc).'
  },
  {
    number: 4,
    title: 'Dashboard preparation',
    description:
      'On the basis of expected deliverables, customized client dashboard gets set up where all researched data is loaded for viewing. Genie, our conversational reasoning Al tool is part of the dashboard, ready to answer any queries related to the research.'
  },
  {
    number: 5,
    title: 'Presentation to client',
    description:
      'Once analysis has been completed and all data is loaded on the dashboard, a presentation is scheduled for the client’s research and analytics team.'
  },
  {
    number: 6,
    title: 'Internal Training',
    description:
      'Final client presentation accompanied by internal training on dashboard functionality and usage.'
  }
]

const HowBigDataAnalysisWorks = () => {
  return (
    <section aria-labelledby="how-big-data-analysis-works" className="w-full mx-auto max-w-7xl px-4 md:px-8 py-12 overflow-hidden">
      <div className="text-center mb-12">
        <h2
          id="how-big-data-analysis-works"
          className="inline-block text-gray-500 font-bold px-8 py-4  tracking-wide text-2xl md:text-3xl"
        >
          PERCEPTION BIG DATA ANALYSIS STEP-BY-STEP
        </h2>
      </div>
  <ol aria-label="Process steps" className="grid gap-12 md:gap-20 md:grid-cols-3 relative">
        {steps.map((step, idx) => (
          <li
            key={step.number}
            className="flex flex-col space-y-4 relative"
          >
            {/* connector lines removed */}
            <div className="flex items-center space-x-4 relative z-10 bg-white md:bg-transparent">
              <div className="flex-shrink-0 h-10 w-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 font-semibold bg-white z-10">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold leading-snug">
                {step.title}
              </h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed pl-14 md:pl-0 md:pt-2">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default HowBigDataAnalysisWorks
