import React from 'react';
import Image from 'next/image';
import Button from '../../ui/Button';

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  buttonText?: string;
  isLogo?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  image, 
  title, 
  description, 
  buttonText = 'Know more',
  isLogo = false 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      <div className="relative h-64">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-bold text-gray-900 mb-3 font-raleway">
          {title} {isLogo && <span className="text-sm text-gray-500">(logo)</span>}
        </h3>
        <p className="text-gray-600 mb-6 font-open-sans leading-relaxed flex-grow">
          {description}
        </p>
        <Button variant="primary" className="w-auto self-start">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
