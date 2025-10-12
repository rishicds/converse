"use client";
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

// This component implements the "Structured Data" vs "Unstructured Data" comparison
// based on the provided design reference. Content adapted into semantic HTML.

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
    <section aria-labelledby="structured-unstructured-heading" className="font-inter">
      <div className="space-y-20">
        {/* Unstructured Data - show first with image on left */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="md:w-1/2 flex flex-col">
            <h2 id="unstructured-heading" className="text-3xl font-extrabold font-raleway mb-6 uppercase text-[#0f1417]">Unstructured Data</h2>
            <p className="text-[#303030] leading-relaxed text-lg mb-4">
              Our proprietary AI-powered research analytics tool PERCEPTION uncovers real, unbiased insights from unstructured data such as online sources and as well as from internal client data. It goes over and above what other AI tools can deliver.
            </p>
            <p className="text-lg font-semibold text-[#0f1417]  p-3 rounded mb-8">
              Key differences of PERCEPTION vs other AI research tools are:
            </p>
            <div className="overflow-x-auto border rounded shadow-sm flex-1">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-[#d00] text-white">
                    <th className="px-4 py-2 font-semibold text-left">
                      <span className="sr-only">Attribute</span>
                    </th>
                    <th className="text-left px-4 py-2 font-semibold">SMLs</th>
                    <th className="text-left px-4 py-2 font-semibold">PERCEPTION</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(row => (
                    <tr key={row.label} className="odd:bg-gray-50">
                      <th scope="row" className="px-4 py-2 font-semibold text-[#222] align-top w-40">{row.label}</th>
                      <td className="px-4 py-2 text-[#444] w-40">{row.sml}</td>
                      <td className="px-4 py-2 text-[#0f4d63] font-medium">{row.perception}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/perception#unstructured-perception" className="inline-block">
                <button
                  className="text-white px-6 py-3 rounded font-semibold transition text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
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
          <div className="md:w-1/2 pt- flex-shrink-0">
            <Image
              src="/perception/uns.png"
              alt="Unstructured data visualization"
              width={660}
              height={340}
              className="w-full h-auto object-contain rounded"
              priority
            />
             <Image
              src="/perception/uns2.png"
              alt="Unstructured data visualization"
              width={660}
              height={340}
              className="w-full pt-4 h-auto object-contain rounded"
              priority
            />
          </div>
        </div>

        {/* Structured Data - show second with image on left */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="md:w-1/2 flex flex-col">
              <h2 id="structured-heading" className="text-3xl font-extrabold font-raleway mb-6 uppercase text-[#0f1417]">Structured Data</h2>
            <div className="space-y-6 text-[#303030] leading-relaxed text-lg">
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
            <ol className="mt-6 grid sm:grid-cols-2 gap-4 bg-[#6bb7d4] text-white p-6 rounded shadow-inner text-sm md:text-base font-medium">
              {issues.map((issue, i) => (
                <li key={issue} className="flex items-start gap-2">
                  <span className="font-semibold w-5 shrink-0">{i + 1}.</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 font-semibold text-[#1d2d3a] font-raleway">
              PERCEPTION AI technology augments established market research methodologies at every stage of the research process.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/perception/structured" className="inline-block">
                <button
                  className="text-white px-6 py-3 rounded font-semibold transition text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
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
          <div className="md:w-1/2 pt-40 flex-shrink-0">
            <Image
              src="/perception/struct.png"
              alt="Structured data visualization"
              width={960}
              height={640}
              className="w-full h-auto object-contain rounded"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StructuredUnstructuredSection;
