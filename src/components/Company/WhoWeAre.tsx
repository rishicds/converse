"use client";
import React from 'react';
import Image from 'next/image';

interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string; // placeholder if later we want icons
  linkLabel?: string;
}

const pillars: Pillar[] = [
  {
    id: 'verb',
    title: 'Converse',
    subtitle: '(Verb)',
    description: 'Conversation is central to our approach. We come in with a neutral perspective and an open mind.',
    image: '/company/verb.png'
  },
  {
    id: 'noun',
    title: 'Converse',
    subtitle: '(Noun/Adjective)',
    description: 'Our approach often involves practices that are contrary to those of standard business consultancies.',
    image: '/company/noun.png'
  },
  {
    id: 'conversion',
    title: '... resulting in',
    subtitle: 'Conversion',
    description: 'We are a results driven company. A one-stop shop for our clients\' needs.',
    image: '/company/conversion.png'
  }
];

const WhoWeAre: React.FC = () => {
  return (
    <>
      <section className="py-8 bg-white" id="who-we-are">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-10">Who we are</h2>
          <p className="text-center text-gray-700 max-w-4xl mx-auto text-lg mb-16">As the name Converse indicates, our approach is guided by the diverse meanings of the word.</p>
          <div className="grid md:grid-cols-3 gap-12">
            {pillars.map(p => (
              <div key={p.id} className="flex flex-col items-center text-center">
                <div className="mb-6 relative w-40 h-40 md:w-44 md:h-44">
                  <Image src={p.image} alt={p.title} fill className="object-contain" />
                </div>
                <h3 className="text-base font-semibold text-blue-900 underline decoration-blue-700/60 mb-4">
                  {p.title} <span className="font-normal">{p.subtitle}</span>
                </h3>
                <p className="text-gray-700 leading-relaxed italic first-letter:not-italic not-italic:font-normal">
                  {p.id === 'verb' && <span className="not-italic font-semibold block mb-2">To engage in conversation:</span>}
                  {p.id === 'noun' && <span className="not-italic font-semibold block mb-2">Opposite or contrary:</span>}
                  {p.id === 'conversion' && <span className="not-italic font-semibold block mb-2">We are a results driven company.</span>}
                  <span className="not-italic font-normal">{p.description}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Added image below existing content */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <img
          src="/company/whoweare.png"
          alt="Business meeting illustration"
          style={{ maxWidth: '1600px', width: '100%', borderRadius: '16px', }}
        />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 my-10">How we operate</h2>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <img
          src="/company/howweoperate.png"
          alt="Business meeting illustration"
          style={{ maxWidth: '1600px', width: '100%', borderRadius: '16px',  }}
        />
      </div>
       <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 my-10">Area of expertise</h2>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <img
          src="/company/areaofexpertise.png"
          alt="Business meeting illustration"
          style={{ maxWidth: '1600px', width: '100%', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
        />
      </div>
      <h1 className='text-2xl md:text-3xl font-bold text-center text-blue-900 my-10'>Safeguarding your data, ensuring confidentiality</h1>
      <div style={{ marginTop: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
        <img
          src="/company/partnerwithus.png"
          alt="Business meeting illustration"
          style={{ maxWidth: '1600px', width: '100%', borderRadius: '16px', boxShadow: '' }}
        />
      </div>
    </>
  );
};

export default WhoWeAre;