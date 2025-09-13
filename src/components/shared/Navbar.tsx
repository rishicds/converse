"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isPerceptionOpen, setIsPerceptionOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const perceptionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handlePerceptionMouseEnter = () => {
    if (perceptionTimeoutRef.current) {
      clearTimeout(perceptionTimeoutRef.current);
    }
    setIsPerceptionOpen(true);
  };

  const handlePerceptionMouseLeave = () => {
    perceptionTimeoutRef.current = setTimeout(() => {
      setIsPerceptionOpen(false);
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
                  <div className="absolute top-full left-0 pt-1 w-96 z-50">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                      <div className="grid grid-cols-1 gap-0">
                        {/* Business/Marketing */}
                        <div className="p-6 bg-blue-900 text-white rounded-lg">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-blue-700 rounded mr-3 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                              </svg>
                            </div>
                            <h3 className="font-semibold text-lg">Business/ Marketing</h3>
                          </div>
                          <ul className="space-y-2 text-sm">
                            <li><a href="/services/business-development" className="hover:text-blue-200 transition-colors block py-1">Business Development</a></li>
                            <li><a href="/services/brand-strategy" className="hover:text-blue-200 transition-colors block py-1">Brand Strategy</a></li>
                            <li><a href="/services/financial-planning" className="hover:text-blue-200 transition-colors block py-1">Financial Planning</a></li>
                            <li><a href="/services/driving-growth" className="hover:text-blue-200 transition-colors block py-1">Driving Growth</a></li>
                            <li><a href="/services/supply-chain-logistics" className="hover:text-blue-200 transition-colors block py-1">Supply Chain & Logistics</a></li>
                            <li><a href="/services/route-to-market" className="hover:text-blue-200 transition-colors block py-1">Route-to-market</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* PERCEPTION Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={handlePerceptionMouseEnter}
                onMouseLeave={handlePerceptionMouseLeave}
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
                {isPerceptionOpen && (
                  <div className="absolute top-full left-0 pt-1 w-80 z-50">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                      <div className="p-6 bg-blue-900 text-white rounded-lg">
                        <div className="text-center mb-4">
                          <Image src="/perception.png" alt="PERCEPTION Logo" width={60} height={60} className="mx-auto mb-2" />
                          
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="cursor-pointer hover:text-blue-200 transition-colors py-1">• Structured Data Analysis</li>
                          <li className="cursor-pointer hover:text-blue-200 transition-colors py-1">• Unstructured Data Analysis</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <a href="#" className="text-gray-700 hover:text-primary transition-colors font-open-sans text-lg">
                Company
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors font-open-sans text-lg">
                Contact us
              </a>
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
          <div className="md:hidden mt-4 border-t border-gray-200 pt-4">
            <div className="space-y-4">
              {/* Mobile Services */}
              <div>
                <button 
                  className="text-gray-700 hover:text-primary transition-colors font-open-sans text-lg w-full text-left flex items-center justify-between"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  Services
                  <svg className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isServicesOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <div className="text-sm font-semibold text-blue-900">Business/Marketing</div>
                    <div className="ml-4 space-y-1 text-sm text-gray-600">
                      <div>Business Development</div>
                      <div>Brand Strategy</div>
                      <div>Financial Planning</div>
                      <div>Driving Growth</div>
                      <div>Supply Chain & Logistics</div>
                      <div>Route-to-market</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mobile PERCEPTION */}
              <div>
                <button 
                  className="text-gray-700 hover:text-primary transition-colors font-open-sans text-lg w-full text-left flex items-center justify-between"
                  onClick={() => setIsPerceptionOpen(!isPerceptionOpen)}
                >
                  PERCEPTION
                  <svg className={`w-4 h-4 transition-transform ${isPerceptionOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isPerceptionOpen && (
                  <div className="mt-2 ml-4 space-y-2 text-sm text-gray-600">
                    <div>• Market Research</div>
                    <div>• Data Analysis</div>
                    <div>• Customer Journey Testing</div>
                    <div>• Structured Data Analysis</div>
                    <div>• Unstructured Data Analysis</div>
                  </div>
                )}
              </div>
              
              <a href="#" className="block text-gray-700 hover:text-primary transition-colors font-open-sans text-lg">
                Company
              </a>
              <a href="#" className="block text-gray-700 hover:text-primary transition-colors font-open-sans text-lg">
                Contact us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
