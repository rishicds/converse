"use client";
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

// This component implements the "Structured Data" vs "Unstructured Data" comparison
// based on the provided design reference. Content adapted into semantic HTML.

// Image size constants
const IMAGE_WIDTH = 410;
const IMAGE_HEIGHT = 320;
const IMAGE_MAX_WIDTH = `${IMAGE_WIDTH}px`;

const issues = [
  'Their slow and static nature',
  'Influence of gratuity culture',
  'Restricted demographic & geographic sample size reach',
  'Question and response biases',
  'Insufficient comprehensiveness of insight',
  'Significant investment requirements'
];

const comparisonRows: { label: string; sml: string; perception: string }[] = [
  { label: 'Configuration', sml: 'Key words', perception: 'Contextual (LLM)' },
  { label: 'Sentiment analysis', sml: 'Simplistic', perception: 'Quantifying emotions' },
  { label: 'Brand Health', sml: '✗', perception: '✔' },
  { label: 'Purchase Driver', sml: '✗', perception: '✔' },
  { label: 'Emerging ideas', sml: '✗', perception: '✔' },
  { label: 'Data source', sml: 'Social media', perception: 'Multi-dimensional (Offline and Online)' },
  { label: 'Languages', sml: 'Limited', perception: 'Large number (79)' },
  { label: 'Actionable Insights', sml: '✗', perception: '✔' },
  { label: 'Word Cloud', sml: '✔', perception: '✔' },
  { label: 'Visualization', sml: 'SaaS', perception: 'Custom made with GENIE (conversational reasoning tool)' }
];

const StructuredUnstructuredSection: React.FC = () => {
  return (
    <section aria-labelledby="structured-unstructured-heading" className="font-inter overflow-x-hidden max-w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 space-y-12 md:space-y-16 lg:space-y-20">
        {/* Unstructured Data - show first with image on left */}
        <div className="flex flex-col lg:flex-row items-start gap-6 md:gap-8 max-w-full">
          <div className="lg:w-1/2 flex flex-col">
            <h2 id="unstructured-heading" className="text-2xl sm:text-3xl font-extrabold font-raleway mb-4 md:mb-6 uppercase text-[#0f1417]">Unstructured Data</h2>
            <p className="text-[#303030] leading-relaxed text-base md:text-lg mb-4">
              Our proprietary AI-powered research analytics tool PERCEPTION uncovers real, unbiased insights from unstructured data such as online sources and as well as from internal client data. It goes over and above what other AI tools can deliver.
            </p>
            <p className="text-base md:text-lg font-semibold text-[#0f1417] p-3 rounded mb-6 md:mb-8">
              Key differences of PERCEPTION vs other AI research tools are:
            </p>
            <div className="w-full overflow-hidden">
              <div className="overflow-x-auto border rounded shadow-sm">
                <table className="w-full text-xs sm:text-sm md:text-base min-w-[300px] sm:min-w-[400px] md:min-w-[480px]">
                  <thead>
                    <tr className="bg-[#d00] text-white">
                      <th className="px-1 sm:px-2 md:px-4 py-2 font-semibold text-left w-1/3 text-xs sm:text-sm">
                        <span className="sr-only">Attribute</span>
                      </th>
                      <th className="text-left px-1 sm:px-2 md:px-4 py-2 font-semibold w-1/3 text-xs sm:text-sm">SMLs</th>
                      <th className="text-left px-1 sm:px-2 md:px-4 py-2 font-semibold w-1/3 text-xs sm:text-sm">PERCEPTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map(row => (
                      <tr key={row.label} className="odd:bg-gray-50">
                        <th scope="row" className="px-1 sm:px-2 md:px-4 py-2 font-semibold text-[#222] align-top text-left text-xs sm:text-sm break-words">{row.label}</th>
                        <td className="px-1 sm:px-2 md:px-4 py-2 text-[#444] text-xs sm:text-sm break-words">{row.sml}</td>
                        <td className="px-1 sm:px-2 md:px-4 py-2 text-[#0f4d63] font-medium text-xs sm:text-sm break-words">{row.perception}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 flex justify-center">
              <Link href="/perception#unstructured-perception" className="inline-block">
                <button
                  className="text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold transition text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                  type="button"
                  style={{ background: 'var(--button-primary)' }}
                  onMouseOver={e => (e.currentTarget.style.background = 'var(--button-primary-hover)')}
                  onMouseOut={e => (e.currentTarget.style.background = 'var(--button-primary)')}
                >
                  Know more
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex-shrink-0 max-w-full overflow-hidden">
            <Image
              src="/perception/uns.png"
              alt="Unstructured data visualization"
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              className={`perception-global-img w-full max-w-[${IMAGE_MAX_WIDTH}] h-auto object-contain rounded`}
              priority
              sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${IMAGE_MAX_WIDTH}`}
            />
             <Image
              src="/perception/uns2.png"
              alt="Unstructured data visualization"
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              className={`perception-global-img w-full max-w-[${IMAGE_MAX_WIDTH}] pt-4 h-auto object-contain rounded`}
              priority
              sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${IMAGE_MAX_WIDTH}`}
            />
          </div>
        </div>

        {/* Structured Data - show second with image on left */}
        <div className="flex flex-col lg:flex-row items-start gap-6 md:gap-8 max-w-full">
          <div className="lg:w-1/2 flex flex-col max-w-full">
              <h2 id="structured-heading" className="text-2xl sm:text-3xl font-extrabold font-raleway mb-4 md:mb-6 uppercase text-[#0f1417]">Structured Data</h2>
            <div className="space-y-4 md:space-y-6 text-[#303030] leading-relaxed text-base md:text-lg">
              <p>
                In cases where there is a need for traditional research, such as qualitative and quantitative studies, we cater to such clients with integrated technology-driven market research solution.
              </p>
              <p>
                This end-to-end suite combines established market research methodologies with advanced NextGen technology, leveraging the experience and expertise of human researchers.
              </p>
              <p>
                We seeks to address challenges associated with established market research methodologies –
              </p>
            </div>
            <ol className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 bg-[#6bb7d4] text-white p-3 sm:p-4 md:p-6 rounded shadow-inner text-xs sm:text-sm md:text-base font-medium max-w-full">
              {issues.map((issue, i) => (
                <li key={issue} className="flex items-start gap-1 sm:gap-2">
                  <span className="font-semibold w-4 sm:w-5 shrink-0 text-xs sm:text-sm">{i + 1}.</span>
                  <span className="break-words">{issue}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 md:mt-6 font-semibold text-[#1d2d3a] font-raleway">
              PERCEPTION AI technology augments established market research methodologies at every stage of the research process.
            </p>
            <div className="mt-6 sm:mt-8 flex justify-center">
              <Link href="/perception/structured" className="inline-block">
                <button
                  className="text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold transition text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                  type="button"
                  style={{ background: 'var(--button-primary)' }}
                  onMouseOver={e => (e.currentTarget.style.background = 'var(--button-primary-hover)')}
                  onMouseOut={e => (e.currentTarget.style.background = 'var(--button-primary)')}
                >
                  Know more
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 pt-0 lg:pt-40 flex-shrink-0 max-w-full overflow-hidden">
            <Image
              src="/perception/struct.png"
              alt="Structured data visualization"
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              className={`perception-global-img w-full max-w-[${IMAGE_MAX_WIDTH}] h-auto object-contain rounded`}
              priority
              sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${IMAGE_MAX_WIDTH}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StructuredUnstructuredSection;
