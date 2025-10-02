import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

interface InsightItem {
	title: string;
	description: string;
	image: string;
	imageAlt: string;
}

const insightItems: InsightItem[] = [
	{
		title: 'Brand Health Assessment',
		description:
			"Brand health tracking, measures how your brand is performing on awareness, trial usage and brand positioning KPIs. You’ll get a clear picture of your brand’s perception and will understand what aspects of the brand funnel need improvement.",
		image: '/perception/unstructured/bha.png',
		imageAlt: 'Dashboard analytics',
	},
	{
		title: 'Influencer Impact',
		description:
			"Influencers have taken social media by storm. Should they be part of your media plan? How do you choose the right ones for your brand? Is it through impressions, reach, engagement, referral traffic, conversion or growth of followers? Which influencers connect passionately with your TG ? We’ll help you make sense of it all.",
		image: '/perception/unstructured/influencer.png',
		imageAlt: 'Influencer marketing concept',
	},
	{
		title: 'Campaign Evaluation & Media optimization',
		description:
			"Are customers aware of your campaign? Do they understand what you intended to communicate or are they getting a different message? Is further optimization of your creative or your media mix required? We’ll get clear answers for you without any bias.",
		image: '/perception/unstructured/campaign.png',
		imageAlt: 'Team working at laptops',
	},
	{
		title: 'Customer Experience',
		description:
			"Is customer experience one of your brand’s KPIs? How do your customers feel about your product or service? With our AI capability we are equipped to analyze internal data (open text and voice calls) as well as external data (online conversations) for a comprehensive insights analysis.",
		image: '/perception/unstructured/customer.png',
		imageAlt: 'Customer service operations',
	},
	{
		title: 'Brand Communication & Analysis',
		description:
			'Analyze unbiased data for a full understanding of your audience, category and your brand. Leverage authentic game-changing insights and emerging trends to form your marketing strategy.',
		image: '/perception/unstructured/brandanalysis.png',
		imageAlt: 'Digital communication icons',
	},
	{
		title: 'Competitive Intelligence',
		description:
			"Understand and learn about what's happening in the world outside your business. Evaluate your key competitors without bias, identify competitive risks and challenges. Discover new opportunities that can help your brand grow faster.",
		image: '/perception/unstructured/compintelligence.png',
		imageAlt: 'Competitive strategy chess pieces',
	},
	{
		title: 'Post Launch Assessment',
		description:
			'Post product launch is often the most underestimated phase in new product development. Post launch is not just celebrating your achievement but also understanding how well your product is accepted and whether adjustments are required.',
		image: '/perception/unstructured/postlaunch.png',
		imageAlt: 'New product celebration graphic',
	},
	{
		title: 'Consumer Switching Analysis',
		description:
			'What are customers’ key motivations for choosing a brand? What are the main factors influencing switching behavior? What triggered your customer to switch to your competitor? What do you need to do to retain your customers? Gain authentic insights through us.',
		image: '/perception/unstructured/consumerswitching.png',
		imageAlt: 'Consumers analyzing data',
	},
];

const Section: React.FC<{ item: InsightItem; reverse?: boolean }> = ({ item, reverse }) => {
	return (
		<div className={`flex flex-col md:flex-row gap-4 md:gap-6 ${reverse ? 'md:flex-row-reverse' : ''}`}>      
			<div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-[4/3] flex-shrink-0 rounded-sm overflow-hidden border border-neutral-200 bg-neutral-50">
				<Image
					src={item.image}
					alt={item.imageAlt}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
				/>
			</div>
			<div className="flex-1 md:flex-1">
				<h3 className="text-lg md:text-xl font-semibold tracking-tight mb-2">{item.title}</h3>
				<p className="text-sm leading-relaxed text-neutral-700 whitespace-pre-line">{item.description}</p>
			</div>
		</div>
	);
};

export default function UnstructuredPerceptionPage() {
		return (
			<main className="px-4 md:px-8 lg:px-14 py-12 md:py-20 max-w-7xl mx-auto">
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
					{insightItems.map((item, idx) => (
						<Section key={item.title} item={item} reverse={idx % 2 === 1} />
					))}
				</div>
				
			</main>
		);
}

