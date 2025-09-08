'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';

interface ContactFormData {
  name: string;
  company: string;
  phone: string;
  workEmail: string;
  interestedIn: string;
  details: string;
}

const ContactSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    phone: '',
    workEmail: '',
    interestedIn: '',
    details: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
    setIsPopupOpen(false);
    // Reset form
    setFormData({
      name: '',
      company: '',
      phone: '',
      workEmail: '',
      interestedIn: '',
      details: ''
    });
  };

  return (
    <>
      {/* Contact Section */}
  <section className="py-16 relative overflow-hidden" style={{ background: 'var(--primary)' }}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 border border-[var(--foreground)] rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-[var(--foreground)] rounded-full"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-[var(--foreground)] rounded-full"></div>
        </div>

  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-[var(--background)]/80 rounded-lg p-8 backdrop-blur-sm border border-[var(--primary)]/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
              Get in touch with us
            </h2>
            <p className="text-[var(--foreground)] text-lg mb-8 max-w-2xl mx-auto opacity-80">
              Our team is ready to help you with your research & analytics as well as business related needs.
            </p>
            <Button
              onClick={() => setIsPopupOpen(true)}
              className="bg-[var(--button-primary)] text-white px-8 py-3 rounded-full border-2 border-[var(--button-primary)] hover:bg-[var(--button-primary-hover] hover:text-white transition-all duration-300 font-semibold"
            >
              GET IN TOUCH
            </Button>
          </div>
        </div>
        {/* Logo in bottom left */}
        <img
          src="/logo.png"
          alt="Converse Global Consulting Logo"
          className="absolute left-8 bottom-8 w-48 h-auto z-20 hidden md:block"
          style={{ maxWidth: '220px' }}
        />
      </section>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--background)] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>Get in Touch</h3>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="text-[var(--foreground)] hover:text-[var(--primary)] text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Left side text */}
              <div className="mb-6 p-4 bg-[var(--background)] rounded-lg border-l-4 border-[var(--primary)]">
                <p className="text-[var(--foreground)]">
                  Share these details to set up a meeting with us
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-[var(--primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-[var(--background)] text-[var(--foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                      Work email *
                    </label>
                    <input
                      type="email"
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-[var(--primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-[var(--background)] text-[var(--foreground)]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[var(--primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-[var(--background)] text-[var(--foreground)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                      Website
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[var(--primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-[var(--background)] text-[var(--foreground)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[var(--primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-[var(--background)] text-[var(--foreground)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Interested in
                  </label>
                  <select
                    name="interestedIn"
                    value={formData.interestedIn}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[var(--primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-[var(--background)] text-[var(--foreground)]"
                  >
                    <option value="">Select an option</option>
                    <option value="research-analytics">Research & Analytics</option>
                    <option value="business-consulting">Business Consulting</option>
                    <option value="both">Both Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                    Or share some details about your business and what you have in mind.
                  </label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-[var(--primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-vertical bg-[var(--background)] text-[var(--foreground)]"
                  />
                </div>

                <div className="text-sm mb-4" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                  I agree with Terms and Conditions, Privacy Policy and Cookie Policy
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-[var(--primary)] text-[var(--background)] px-6 py-2 rounded-md hover:bg-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-300"
                  >
                    Send message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSection;
