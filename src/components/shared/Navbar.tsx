import React from 'react';
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center" passHref>
            <Image src="/logo.png" alt="Converse Global Consulting Logo" width={150} height={50} priority />
          </Link>
          {/* Logo */}
          

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-open-sans">
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-open-sans">
              PERCEPTION
            </a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-open-sans">
              Company
            </a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-open-sans">
              Contact us
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
