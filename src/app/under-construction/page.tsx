import React from 'react';

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-light text-white italic font-serif animate-pulse">
          Coming Soon
        </h1>
        
        
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-8 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Under Construction — Converse',
  description: 'This page is under construction. Come back soon.',
};