"use client";

import React from "react";
import Image from "next/image";

export const StructuredKnowMore: React.FC = () => {
	return (
		<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
			<div className="text-center">
				<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight mb-6 sm:mb-8 md:mb-10 lg:mb-14 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto leading-tight">
					Deeper understanding of our end-to-end AI augmentation of
					<span className="block mt-1 sm:mt-2">Structured Data (qualitative and quantitative research)</span>
				</h2>
			</div>
			
			{/* Display the deeper understanding image with enhanced responsiveness */}
			<div className="flex justify-center items-center px-2 sm:px-4 md:px-6">
				<div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
					<Image
						src="/perception/deeper.png"
						alt="Deeper understanding of AI augmentation for structured data research"
						width={1200}
						height={800}
						className="w-full h-auto object-contain rounded-lg shadow-lg"
						priority
						sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 60vw"
					/>
				</div>
			</div>
		</section>
	);
};

export default StructuredKnowMore;

