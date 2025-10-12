"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isPerceptionOpen, setIsPerceptionOpen] = useState<string | null>(null);
  const [isPerceptionDropdownOpen, setIsPerceptionDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePerceptionOpen, setIsMobilePerceptionOpen] = useState(false);
  
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const perceptionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const perceptionDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  const handlePerceptionDropdownMouseEnter = () => {
    if (perceptionDropdownTimeoutRef.current) {
      clearTimeout(perceptionDropdownTimeoutRef.current);
    }
    setIsPerceptionDropdownOpen(true);
  };

  const handlePerceptionDropdownMouseLeave = () => {
    perceptionDropdownTimeoutRef.current = setTimeout(() => {
      setIsPerceptionDropdownOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current);
      }
      if (perceptionTimeoutRef.current) {
        clearTimeout(perceptionTimeoutRef.current);
      }
      if (perceptionDropdownTimeoutRef.current) {
        clearTimeout(perceptionDropdownTimeoutRef.current);
      }
    };
  }, []);
  return (
    <nav className="bg-white border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center" passHref>
          <Image src="/logo.png" alt="Converse Global Consulting Logo" width={200} height={67} priority />
          </Link>
          {/* Logo */}
          

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8 relative">
              {/* Services Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <Link 
                  href="#" 
                  className="text-gray-700 hover:text-primary transition-colors font-open-sans text-lg flex items-center py-2"
                >
                  Services
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                
                {/* Services Dropdown Menu */}
                {isServicesOpen && (
                  <div className={`absolute top-full left-1/2 -translate-x-1/4 pt-2 w-[520px] z-50 ${isPerceptionOpen ? 'bg-white' : 'bg-transparent'}`}
                    onMouseLeave={() => setIsPerceptionOpen(null)}
                  >
                    <div className="  rounded-lg overflow-hidden flex">
                      {/* Left Column: Main menu */}
                      <div className="min-w-[220px] w-[240px] bg-[#002B5C] text-white flex flex-col divide-y divide-blue-800">
                        <div
                          className={`p-6 cursor-pointer transition-colors flex items-center ${
                            isPerceptionOpen === 'research' ? 'bg-blue-800' : 'hover:bg-blue-700'
                          }`}
                          onMouseEnter={() => { setIsPerceptionOpen('research'); }}
                        >
                          <span className="font-bold text-base leading-tight">Research & Analytics</span>
                          <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <div
                          className={`p-6 cursor-pointer transition-colors flex items-center ${
                            isPerceptionOpen === 'business' ? 'bg-blue-800' : 'hover:bg-blue-700'
                          }`}
                          onMouseEnter={() => { setIsPerceptionOpen('business'); }}
                        >
                          <span className="font-bold text-base leading-tight break-words whitespace-normal">Business/Marketing</span>
                          <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      {/* Right Columns: Show on hover of either left item */}
                      {isPerceptionOpen === 'research' && (
                        <div className="w-3/4 bg-gray-50 p-6 border-l border-gray-200 flex flex-col justify-center">
                          <div className="mb-3">
                            <Image src="/perception.png" alt="PERCEPTION logo" width={180} height={40} className="object-contain" />
                          </div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <Link href="/perception#structured-heading" className="hover:text-primary transition-colors">Structured Data Analysis</Link>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <Link href="/perception#unstructured-heading" className="hover:text-primary transition-colors">Unstructured Data Analysis</Link>
                            </li>
                          </ul>
                        </div>
                      )}
                      {isPerceptionOpen === 'business' && (
                        <div className="w-3/4 p-6 flex flex-col justify-center">
                          <div className="grid grid-cols-2 gap-x-8">
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <Link href="/services/business-development" className="hover:text-primary transition-colors">Business Development</Link>
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <Link href="/services/brand-strategy" className="hover:text-primary transition-colors">Brand Strategy</Link>
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <Link href="/services/financial-planning" className="hover:text-primary transition-colors">Financial Planning</Link>
                              </li>
                            </ul>
                            <ul className="space-y-2 text-sm text-gray-700">
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <Link href="/services/driving-growth" className="hover:text-primary transition-colors">Driving Growth</Link>
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <Link href="/services/supply-chain-logistics" className="hover:text-primary transition-colors">Supply Chain & Logistics</Link>
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <Link href="/services/route-to-market" className="hover:text-primary transition-colors">Route-to-market</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* PERCEPTION Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={handlePerceptionDropdownMouseEnter}
                onMouseLeave={handlePerceptionDropdownMouseLeave}
              >
                <Link 
                  href="/perception" 
                  className="text-gray-700 hover:text-primary transition-colors font-open-sans text-lg flex items-center py-2"
                >
                  PERCEPTION
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                
                {/* PERCEPTION Dropdown Menu */}
                {isPerceptionDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/4 pt-2 w-[520px] z-50">
                    <div className="rounded-lg overflow-hidden flex">
                      {/* Left Column: Main menu */}
                      <div className="min-w-[220px] w-[240px] bg-[#002B5C] text-white flex flex-col divide-y divide-blue-800">
                        <Link
                          href="/perception/structured"
                          className="p-6 hover:bg-blue-700 transition-colors flex items-center group"
                        >
                          <span className="font-bold text-base leading-tight">Structured Data</span>
                          <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link
                          href="/perception/unstructured"
                          className="p-6 hover:bg-blue-700 transition-colors flex items-center group"
                        >
                          <span className="font-bold text-base leading-tight">Unstructured Data</span>
                          <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                      {/* Right Column: Description */}
                      <div className="w-3/4 bg-gray-50 p-6 border-l border-gray-200 flex flex-col justify-center">
                        <div className="mb-4">
                          <Image src="/perception.png" alt="PERCEPTION logo" width={180} height={40} className="object-contain" />
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed mb-4">
                          AI-powered advanced analytics platform for comprehensive market research and consumer insights.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Quantitative & Qualitative Research</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Social Media & Digital Analysis</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Consumer Behavior Insights</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/company" className="text-gray-700 hover:text-primary transition-colors font-open-sans text-lg">
                Company
              </Link>
              <Link href="/#contact" className="text-gray-700 hover:text-primary transition-colors font-open-sans text-lg">
                Contact us
              </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-gray-700 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
              <div className="py-2">
                {/* Mobile Services */}
                <div>
                  <button 
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors font-open-sans text-lg flex items-center justify-between"
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                  >
                    Services
                    <svg className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isServicesOpen && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      <div className="py-2">
                        <div className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100">
                          Business/Marketing
                        </div>
                        <div className="space-y-1">
                          <Link href="/services/business-development" className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors">
                            Business Development
                          </Link>
                          <Link href="/services/brand-strategy" className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors">
                            Brand Strategy
                          </Link>
                          <Link href="/services/driving-growth" className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors">
                            Driving Growth
                          </Link>
                          <Link href="/services/financial-planning" className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors">
                            Financial Planning
                          </Link>
                          <Link href="/services/route-to-market" className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors">
                            Route-to-market
                          </Link>
                          <Link href="/services/supply-chain-logistics" className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors">
                            Supply Chain & Logistics
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              
                {/* Mobile PERCEPTION Dropdown */}
                <div>
                  <button 
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors font-open-sans text-lg flex items-center justify-between"
                    onClick={() => setIsMobilePerceptionOpen(!isMobilePerceptionOpen)}
                  >
                    PERCEPTION
                    <svg className={`w-4 h-4 transition-transform ${isMobilePerceptionOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isMobilePerceptionOpen && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      <div className="py-2">
                        <div className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100">
                          AI-Powered Analytics
                        </div>
                        <div className="space-y-1">
                          <Link href="/perception/structured" className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors">
                            Structured Data Analysis
                          </Link>
                          <Link href="/perception/unstructured" className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors">
                            Unstructured Data Analysis
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Company Link */}
                <Link href="/company" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors font-open-sans text-lg">
                  Company
                </Link>

                {/* Mobile Contact Link */}
                <Link href="/#contact" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors font-open-sans text-lg">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
