
import React from 'react';
import { FaLinkedin, FaChevronRight, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  return (
  <footer className="text-white py-8 px-4 " style={{ background: 'var(--primary)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
        {/* Company Info */}
        <div className="flex-1 min-w-[220px]">
          <h2 className="font-bold text-lg leading-tight mb-2">Converse Global Consulting FZE.</h2>
          <p className="mb-2 text-sm">Al Barsha First<br />Dubai, U.A.E.</p>
          <p className="mb-1 text-sm font-semibold">Phone: <span className="font-normal">+971 4 395 1294</span></p>
          <p className="mb-1 text-sm font-semibold">Email: <span className="font-normal">kray@converseglobal.com</span></p>
          <a
            href="https://www.linkedin.com/company/converse-global-consulting/"
            className="inline-block mt-2 rounded-full p-2 transition"
            style={{ background: 'rgba(255,255,255,0.12)' }}
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
        {/* Useful Links */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="font-bold mb-2">Useful Links</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><a href="#" className="hover:underline">Home</a></li>
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><a href="#" className="hover:underline">Services</a></li>
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><a href="#" className="hover:underline">Clients</a></li>
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><a href="#" className="hover:underline">About Converse</a></li>
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><a href="#" className="hover:underline">Contact us</a></li>
          </ul>
        </div>
        {/* Our Services */}
        <div className="flex-1 min-w-[220px]">
          <h3 className="font-bold mb-2">Our Services</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><span>Global Marketing</span></li>
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><span>Business Consulting</span></li>
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><span>AI Powered Consumer Analytics</span></li>
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><span>AI Powered Business Analytics</span></li>
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><span>Smart - Fintech Platform</span></li>
          </ul>
        </div>
        {/* Case Studies */}
        <div className="flex-1 min-w-[220px]">
          <h3 className="font-bold mb-2">Case Studies</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><span>Category Study in Snacks</span></li>
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><span>Fan Engagement in Football</span></li>
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><span>Automobile in India</span></li>
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><span>Banking in Saudi Arabia</span></li>
            <li className="flex items-center gap-2"><FaChevronRight size={14} /><span>AI in Financial Services</span></li>
          </ul>
        </div>
      </div>
      <div
        className="border-t mt-8 pt-4 text-xs flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-2 relative"
        style={{ borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)' }}
      >
        <span className="w-full text-center">&copy; Copyright <span className="font-bold">Converse Global Consulting</span>. All Rights Reserved</span>
        <a
          href="#"
          className="inline-block bg-slate-500 rounded p-1 hover:bg-slate-400 transition md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:mr-4"
          aria-label="Back to top"
          style={{ right: 0 }}
        >
          <FaArrowUp size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
