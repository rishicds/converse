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
                            <li><Link href="/services/business-development" className="hover:text-blue-200 transition-colors block py-1">Business Development</Link></li>
                            <li><Link href="/services/brand-strategy" className="hover:text-blue-200 transition-colors block py-1">Brand Strategy</Link></li>
                            <li><Link href="/services/driving-growth" className="hover:text-blue-200 transition-colors block py-1">Driving Growth</Link></li>
                            <li><Link href="/services/financial-planning" className="hover:text-blue-200 transition-colors block py-1">Financial Planning</Link></li>
<li><Link href="/services/route-to-market" className="hover:text-blue-200 transition-colors block py-1">Route-to-market</Link></li>
                            <li><Link href="/services/supply-chain-logistics" className="hover:text-blue-200 transition-colors block py-1">Supply Chain & Logistics</Link></li>
                            
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* PERCEPTION Link (no dropdown) */}
              <Link 
                href="/perception" 
                className="text-gray-700 hover:text-primary transition-colors font-open-sans text-lg flex items-center py-2"
              >
                PERCEPTION
              </Link>

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
                      <Link href="/services/business-development" className="block hover:text-primary">Business Development</Link>
                      <Link href="/services/brand-strategy" className="block hover:text-primary">Brand Strategy</Link>
<Link href="/services/driving-growth" className="block hover:text-primary">Driving Growth</Link>
                      <Link href="/services/financial-planning" className="block hover:text-primary">Financial Planning</Link>
<Link href="/services/route-to-market" className="block hover:text-primary">Route-to-market</Link>
                      
                      <Link href="/services/supply-chain-logistics" className="block hover:text-primary">Supply Chain & Logistics</Link>
                      
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mobile PERCEPTION Link (no dropdown) */}
              <Link href="/perception" className="block text-gray-700 hover:text-primary transition-colors font-open-sans text-lg">
                PERCEPTION
              </Link>
              <Link href="/company" className="block text-gray-700 hover:text-primary transition-colors font-open-sans text-lg">
                Company
              </Link>
              <Link href="/#contact" className="block text-gray-700 hover:text-primary transition-colors font-open-sans text-lg">
                Contact us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
