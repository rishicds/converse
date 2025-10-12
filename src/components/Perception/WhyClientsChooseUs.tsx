import React from 'react';
import {
  FaLightbulb,
  FaBolt,
  FaBalanceScale,
  FaHistory,
  FaLanguage,
  FaComments,
  FaSitemap,
  FaChartLine,
  FaToolbox,
  FaClock,
  FaRegClock
} from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { GrServices } from 'react-icons/gr';

type Reason = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const reasons: Reason[] = [
  {
    title: 'Insight driven + Tech centered',
    description:
      'Research tool built for uncovering deep insights from real conversations and complex data—fast, smart, and unbiased.',
    icon: <GrServices   className="w-7 h-7" />
  },
  {
    title: 'Faster turnaround time',
    description:
      'AI generated research can be turned around in days, not months as compared to traditional research methods.',
    icon: <FaRegClock className="w-7 h-7" />
  },
  {
    title: 'Unbiased, unfiltered, uncut data sources',
    description:
      'All contextually relevant data is analyzed. There is no keyword search, which means zero bias and hence access to full data and insights.',
    icon: <FaBalanceScale className="w-7 h-7" />
  },
  {
    title: 'Time Travel',
    description: 'Unique ability to study data in the past (up to 18 months).',
    icon: <FaHistory className="w-7 h-7" />
  },
  {
    title: 'LLM Capability',
    description:
      'Our tool understands and analyzes data in 79 languages using Large Language Models as opposed to other tools that rely on NLPs.',
    icon: <FaLanguage className="w-7 h-7" />
  },
  {
    title: 'Conversational reasoning tool',
    description:
      'Our chatbot “Genie” provides quick answers from analyzed data based on user queries.',
    icon: <FaComments className="w-7 h-7" />
  },
  {
    title: 'Multiple source analysis',
    description:
      'Integrates online and internal data—from social media to surveys, emails, and transcripts',
    icon: <FaSitemap className="w-7 h-7" />
  },
  {
    title: 'Actionable storytelling',
    description:
      'No more data dumps, our unique dashboard provides access to data cut in multiple formats as per client’s requirements.',
    icon: <FaChartLine className="w-7 h-7" />
  },
  {
    title: 'One-Stop-Shop',
    description:
      'As a results driven company we are a one-stop-shop for our clients business needs.',
    icon: <FaToolbox className="w-7 h-7" />
  }
];

const WhyClientsChooseUs = () => {
  return (
    <section className="relative mt-8">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-fuchsia-50" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-10">
          WHY CLIENTS CHOOSE TO WORK WITH US USING PERCEPTION
        </h2>
        <div className="grid gap-8 md:gap-10 md:grid-cols-3">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group rounded-xl bg-[#0064DA] pt-10 pb-6 px-6 flex flex-col items-center text-center relative shadow-[0_6px_18px_-4px_rgba(0,0,0,0.25)] hover:shadow-xl transition-shadow"
            >
              <div className="text-white mb-6 flex items-center justify-center w-14 h-14 rounded-full bg-[#0057C2] group-hover:scale-110 transition-transform">
                {r.icon}
              </div>
              <div className="w-full rounded-md bg-sky-100/90 p-5 flex-1 flex flex-col">
                <h3 className="font-semibold text-[#014487] text-sm md:text-base leading-snug mb-3">
                  {r.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  {r.description}
                </p>
              </div>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
};

export default WhyClientsChooseUs;
