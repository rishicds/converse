import React from 'react';
import Image from 'next/image';
import Button from '../../ui/Button';

import { ReactNode } from 'react';

interface ServiceCardProps {
  image: string;
  title: string | ReactNode;
  description: string;
  buttonText?: string;
  isLogo?: boolean;
  targetId?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  image, 
  title, 
  description, 
  buttonText = 'Know more',
  isLogo = false,
  targetId
}) => {
  // Ensure alt is always a string
  const altText = typeof title === 'string' ? title : '';
  const handleClick = () => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      <div className="relative w-full aspect-square">
        <Image 
          src={image} 
          alt={altText}
          fill
          className="object-fit"
        />
      </div>
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-bold text-gray-900 mb-3 font-raleway">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 font-open-sans leading-relaxed flex-grow">
          {description}
        </p>
        <Button variant="primary" className="w-auto mx-auto self-start" onClick={handleClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
