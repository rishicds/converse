"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PerceptionOverview: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl uppercase font-extrabold tracking-tight text-center text-[#3b3f42] mb-8 md:mb-12 font-raleway px-4 sm:px-0">
        AI Powered Advanced Analytics
      </h1>
      <div className="w-[80%] mx-auto mb-8 md:mb-12 lg:mb-16">
        <VideoEmbed videoUrl="https://cgassets.s3.us-west-2.amazonaws.com/WhatsApp+Video+2025-11-07+at+21.09.01_37655882.mp4" />
      </div>
      <div className="text-base sm:text-lg lg:text-xl leading-relaxed font-inter text-[#303030] space-y-6 md:space-y-8 lg:space-y-10 max-w-5xl mx-auto">
        <p>
          AI uses neural networks to learn like the human brain – connecting inputs to outputs without being manually programmed. Through deep learning, it trains itself by processing data repeatedly, improving its ability to analyze and make decisions.
        </p>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 font-raleway">Why AI?</h2>
          <p>
            In today&apos;s rapidly evolving world, asking questions isn&apos;t enough—real insights live in the unstructured noise (data) you&apos;re ignoring.
          </p>
        </div>
        <p className="font-semibold font-raleway text-[#1d2d3a]">
          At CGC we augment traditional research with NextGen technology.
        </p>
      </div>
    </>
  );
};

export default PerceptionOverview;

type VideoEmbedProps = {
  videoUrl: string;
};

const VideoEmbed: React.FC<VideoEmbedProps> = ({ videoUrl }) => {
  const [playing, setPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!playing || !videoRef.current) return;

    const video = videoRef.current;
    let timeCheckInterval: ReturnType<typeof setInterval> | null = null;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      if (duration > 0 && currentTime >= duration - 2) {
        setShowOverlay(true);
      }
    };

    const handleEnded = () => {
      setShowOverlay(true);
    };

    const handlePlay = () => {
      setShowOverlay(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);

    // Fallback polling for time check (in case timeupdate doesn't fire frequently enough)
    timeCheckInterval = setInterval(() => {
      try {
        const currentTime = video.currentTime;
        const duration = video.duration;
        if (duration > 0 && currentTime >= duration - 2) {
          setShowOverlay(true);
        }
      } catch {
        // ignore
      }
    }, 200);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      if (timeCheckInterval) clearInterval(timeCheckInterval);
    };
  }, [playing]);

  const openContactForm = () => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(
      new CustomEvent('open-contact-form', {
        detail: { interestedIn: 'perception-demo' },
      })
    );
  };

  const navigateToContact = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const target = document.querySelector('#contact');

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(openContactForm, 300);
      return;
    }

    router.push('/#contact');
    setTimeout(openContactForm, 300);
  };

  return (
    <div className="relative w-full h-full aspect-video rounded-sm overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(/image.png?v=2)' }}>
      {!playing ? (
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            setShowOverlay(false);
          }}
          className="w-full h-full relative flex items-center justify-center focus:outline-none"
          aria-label="Play video"
        >
          <Image
            src="/image.png?v=2"
            alt="Video thumbnail"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

          <span className="absolute inset-0 bg-black/40" aria-hidden="true" />

          <svg
            className="w-20 h-20 text-white drop-shadow-lg"
            viewBox="0 0 84 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="42" cy="42" r="42" fill="rgba(0,0,0,0.6)" />
            <path d="M34 28L58 42L34 56V28Z" fill="white" />
          </svg>
        </button>
      ) : (
        <div className="w-full h-full relative bg-cover bg-center" style={{ backgroundImage: 'url(/image.png?v=2)' }}>
          {/* HTML5 video player */}
          <video
            ref={videoRef}
            src={videoUrl}
            className={`w-full h-full object-cover z-10 transition-opacity duration-[2000ms] ease-in-out ${showOverlay ? 'opacity-0' : 'opacity-100'}`}
            autoPlay
            playsInline
            controls
            controlsList="nofullscreen"
          />

          {/* Get demo overlay shown 2 seconds before video ends */}
          {showOverlay && (
            <div className="absolute inset-0 z-20 flex items-center justify-center animate-in fade-in duration-[2000ms]">
              {/* full-bleed background image (video thumbnail) */}
              <Image
                src="/image.png?v=2"
                alt="Video thumbnail background"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />

              {/* dim overlay on top of image */}
              <div className="absolute inset-0 bg-black/10" />

              {/* content above the background */}
              <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4 md:mt-16">
                

                <div className="flex pt-30 items-center gap-3">
                  <button
                    type="button"
                    onClick={navigateToContact}
                    className={
                      "relative inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-semibold text-[#063a52] " +
                      "bg-gradient-to-b from-[#dff7ff] to-[#bfeeff] shadow-[0_10px_25px_rgba(6,58,82,0.18)] ring-1 ring-white/40 transition-colors " +
                      "hover:from-[#d5f3ff] hover:to-[#aeeaff] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                    }
                    aria-label="Request a free demo"
                  >
                    {/* glossy highlight */}
                    <span
                      aria-hidden="true"
                      className="absolute -top-1 left-6 right-6 h-6 rounded-full bg-white/60 opacity-80 blur-sm pointer-events-none"
                    />
                    <span className="relative">Free Demo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      // seek to start and play again
                      try {
                        if (videoRef.current) {
                          videoRef.current.currentTime = 0;
                          videoRef.current.play();
                        }
                      } catch {
                        // fallback: reset playing state
                        setPlaying(false);
                        setTimeout(() => setPlaying(true), 50);
                      }
                      setShowOverlay(false);
                    }}
                    className="rounded-full px-5 py-2 text-sm font-medium text-white bg-white/10 border border-white/25 hover:bg-white/20 transition focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Play video again"
                  >
                    Play again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};