"use client";

import React from "react";

// Data model so content is easy to tweak without touching layout markup
const stages: Array<{
	title: string;
	from: string[];
	to: string[];
	color: string; // ring + accent
	icon: React.ReactNode;
}> = [
	{
		title: "Research Design",
		from: [
			"manual created",
			"questionnaires and",
			"discussion guides",
		],
		to: [
			"AI tech assisted survey",
			"builders with predictive",
			"analytics determing",
			"variables that most likely",
			"will impact outcomes",
		],
		color: "from-[#e35d29] to-[#f08a3a]",
		icon: (
			<svg
				viewBox="0 0 48 48"
				aria-hidden="true"
				className="h-12 w-12 text-[#e35d29]"
			>
				<circle
					cx="24"
					cy="24"
					r="20"
					fill="none"
					stroke="currentColor"
					strokeWidth="4"
					className="opacity-70"
				/>
				<path
					d="M20 18h8M20 24h8M20 30h5"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<circle cx="14" cy="20" r="2.5" fill="currentColor" />
				<circle cx="14" cy="26" r="2.5" fill="currentColor" />
				<circle cx="14" cy="32" r="2.5" fill="currentColor" />
			</svg>
		),
	},
	{
		title: "Data Collection",
		from: [
			"manual recruitment",
			"of participants and paper-",
			"based / online surveys / in-",
			"person focus groups",
		],
		to: [
			"Mobile-first surveys with",
			"responsive design and voice",
			"input, Conversational AI to",
			"simulate real interview",
			"environs. Sensor-based",
			"data like eye-tracking.",
		],
		color: "from-[#e39a00] to-[#f2b826]",
		icon: (
			<svg
				viewBox="0 0 48 48"
				aria-hidden="true"
				className="h-12 w-12 text-[#e39a00]"
			>
				<rect
					x="14"
					y="8"
					width="20"
					height="32"
					rx="4"
					ry="4"
					fill="none"
					stroke="currentColor"
					strokeWidth="4"
				/>
				<circle cx="24" cy="34" r="3" fill="currentColor" />
				<rect x="20" y="12" width="8" height="2.5" rx="1" fill="currentColor" />
			</svg>
		),
	},
	{
		title: "Data Processing",
		from: [
			"manual data entry,",
			"cleaning, and formatting",
			"Risk of human error and",
			"time delays",
		],
		to: [
			"Automated data",
			"cleaning using AI scripts.",
			"Integration with other data",
			"sources for enriched",
			"context. NLP to process",
			"open-ended responses.",
		],
		color: "from-[#3d8a4e] to-[#66b374]",
		icon: (
			<svg
				viewBox="0 0 48 48"
				aria-hidden="true"
				className="h-12 w-12 text-[#3d8a4e]"
			>
				<path
					d="M10 34V14a2 2 0 0 1 2-2h9l5 5h10a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2Z"
					fill="none"
					stroke="currentColor"
					strokeWidth="4"
					strokeLinejoin="round"
				/>
				<path
					d="M17 27h14M17 21h8"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</svg>
		),
	},
	{
		title: "Data Analysis",
		from: [
			"Manual statistical",
			"analysis using Excel, etc.",
			"Subjective interpretation of",
			"qualitative data",
		],
		to: [
			"Sentiment analysis of",
			"text, audio, or video",
			"responses. Machine",
			"learning identifies patterns",
			"and predicts behavior",
		],
		color: "from-[#0db3d6] to-[#45ccea]",
		icon: (
			<svg
				viewBox="0 0 48 48"
				aria-hidden="true"
				className="h-12 w-12 text-[#0db3d6]"
			>
				<path
					d="M10 34V14a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v20"
					fill="none"
					stroke="currentColor"
					strokeWidth="4"
				/>
				<path
					d="M16 30V22m8 8V18m8 12v-6"
					stroke="currentColor"
					strokeWidth="4"
					strokeLinecap="round"
				/>
			</svg>
		),
	},
	{
		title: "Insight Reporting",
		from: [
			"PowerPoint reports",
			"and static PDFs, Insights",
			"depend heavily on",
			"researcher interpretation",
		],
		to: [
			"Dynamic dashboards",
			"with real-time data updates,",
			"Automated insight",
			"summaries using AI",
		],
		color: "from-[#0f2a55] to-[#1f4a8c]",
		icon: (
			<svg
				viewBox="0 0 48 48"
				aria-hidden="true"
				className="h-12 w-12 text-[#0f2a55]"
			>
				<circle
					cx="24"
					cy="24"
					r="18"
					fill="none"
					stroke="currentColor"
					strokeWidth="4"
				/>
				<path
					d="M24 14v10l6 6"
					stroke="currentColor"
					strokeWidth="4"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
];

function Arrow() {
	return (
		<div className="hidden xl:flex items-center" aria-hidden="true">
			<svg
				viewBox="0 0 60 24"
				className="h-10 w-16 text-gray-400"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
			>
				<path d="M0 12h54" />
				<path d="M46 4l8 8-8 8" fill="currentColor" stroke="none" />
			</svg>
		</div>
	);
}

export const StructuredKnowMore: React.FC = () => {
	return (
		<section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12 md:py-16">
			<h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-center mb-10 md:mb-14 max-w-4xl mx-auto">
				Deeper understanding of our end-to-end AI augmentation of
				<span className="block mt-2">Structured Data (qualitative and quantitative research)</span>
			</h2>
			{/* Mobile / small screen horizontal scroll cards */}
			<div className="xl:hidden -mx-4  flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-thin">
				{stages.map((s) => (
					<div
						key={s.title}
						className="min-w-[80%] xs:min-w-[70%] sm:min-w-[55%] bg-white/60 backdrop-blur border border-gray-200 rounded-2xl p-6 snap-start shadow-sm flex flex-col items-center text-center"
					>
						<div
							className={`relative inline-flex h-32 w-32 sm:h-36 sm:w-36 items-center justify-center rounded-full bg-gradient-to-br ${s.color} mb-5`}
						>
							<div className="absolute inset-3 rounded-full bg-white flex items-center justify-center shadow-inner">
								{s.icon}
							</div>
						</div>
						<h3 className="text-base sm:text-lg font-semibold mb-3">{s.title}</h3>
						<div className="text-[13px] sm:text-sm leading-relaxed whitespace-normal">
							<p className="uppercase tracking-wide text-[10px] sm:text-[11px] font-medium text-gray-600 mb-2">Augmenting</p>
							<div className="text-gray-700 mb-3">
								<span className="font-semibold block mb-1">FROM</span>
								{s.from.map((line, i) => (
									<span key={i} className="block">{line}</span>
								))}
							</div>
							<div className="text-gray-700">
								<span className="font-semibold block mb-1">TO</span>
								{s.to.map((line, i) => (
									<span key={i} className="block">{line}</span>
								))}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Desktop / large layout with arrows */}
			<div className="hidden xl:flex flex-col gap-14">
				<div className="flex gap-10 items-stretch justify-between">
					{stages.map((s, idx) => (
						<React.Fragment key={s.title}>
							<div className="flex-1 flex flex-col items-center text-center xl:text-left">
								<div
									className={`relative inline-flex h-40 w-40 2xl:h-44 2xl:w-44 items-center justify-center rounded-full bg-gradient-to-br ${s.color} mb-6`}
								>
									<div className="absolute inset-4 rounded-full bg-white flex items-center justify-center shadow-inner">
										{s.icon}
									</div>
								</div>
								<h3 className="text-lg 2xl:text-xl font-semibold mb-3">{s.title}</h3>
								<div className="text-sm 2xl:text-[15px] leading-relaxed max-w-xs whitespace-normal">
									<p className="uppercase tracking-wide text-xs font-medium text-gray-600 mb-2">Augmenting</p>
									<div className="text-gray-700 mb-3">
										<span className="font-semibold block mb-1">FROM</span>
										{s.from.map((line, i) => (
											<span key={i} className="block">{line}</span>
										))}
									</div>
									<div className="text-gray-700">
										<span className="font-semibold block mb-1">TO</span>
										{s.to.map((line, i) => (
											<span key={i} className="block">{line}</span>
										))}
									</div>
								</div>
							</div>
							{idx < stages.length - 1 && <Arrow />}
						</React.Fragment>
					))}
				</div>
			</div>
		</section>
	);
};

export default StructuredKnowMore;

