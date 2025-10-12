"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const StructuredKnowMore: React.FC = () => {
		return (
			<section className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
				<div className="text-center">
					<h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight mb-3 sm:mb-4 md:mb-6 lg:mb-8 w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto leading-tight break-words hyphens-auto">
						Deeper understanding of our end-to-end AI augmentation of{" "}
						<span className="inline sm:block mt-0 sm:mt-1 md:mt-2">Structured Data (qualitative and quantitative research)</span>
					</h2>
				</div>
				{/* Display the deeper understanding image with enhanced responsiveness */}
				<div className="flex justify-center items-center px-1 sm:px-2 md:px-4 lg:px-6 overflow-hidden">
					<div className="w-full max-w-[95vw] sm:max-w-sm md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
						<Image
							src="/perception/deeper.png"
							alt="Deeper understanding of AI augmentation for structured data research"
							width={1200}
							height={800}
							className="w-full h-auto object-contain rounded-md sm:rounded-lg shadow-md sm:shadow-lg max-w-full"
							priority
							sizes="(max-width: 640px) 95vw, (max-width: 768px) 85vw, (max-width: 1024px) 75vw, (max-width: 1280px) 65vw, 55vw"
						/>
					</div>
				</div>
				<div className="flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 mb-2 sm:mb-4">
					<Link href="/perception">
						<button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-md bg-neutral-800 text-white font-semibold hover:bg-neutral-700 transition-colors shadow-md">
							&larr; Back to Perception
						</button>
					</Link>
				</div>
			</section>
		);
};

export default StructuredKnowMore;

