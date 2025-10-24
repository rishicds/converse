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
        <VideoEmbed videoUrl="https://cgassets.s3.us-west-2.amazonaws.com/assets/Perception+final+video+(1).mp4" />
      </div>
      {/* Debug button - remove after testing */}
      {/* <div className="text-center mb-4">
        <button 
          onClick={() => {
            const event = new CustomEvent('test-video-overlay');
            window.dispatchEvent(event);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Test Overlay (Debug)
        </button>
      </div> */}
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
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [overlayImageLoaded, setOverlayImageLoaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  // Preload the overlay image when component mounts
  useEffect(() => {
    const img = new window.Image();
    img.src = '/image.png';
    img.onload = () => setOverlayImageLoaded(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      console.log('Video ended - showing overlay');
      setEnded(true);
      setShowOverlay(true);
      setLoading(false);
    };

    const handlePlay = () => {
      console.log('Video playing');
      setEnded(false);
      setShowOverlay(false);
    };

    const handleWaiting = () => {
      setLoading(true);
    };

    const handleCanPlay = () => {
      setLoading(false);
    };

    const handlePlaying = () => {
      setLoading(false);
    };

    const handleTimeUpdate = () => {
      // Check if video is near the end (last 4 seconds for smooth fade-in animation)
      if (video.currentTime >= video.duration - 4 && video.duration > 0) {
        if (!showOverlay) {
          console.log('Video in last 4 seconds, showing overlay with fade-in');
          setShowOverlay(true);
        }
      }
    };  

    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Polling fallback to detect video end
    const checkInterval = setInterval(() => {
      if (video.ended && !showOverlay) {
        console.log('Video detected as ended via polling');
        setEnded(true);
        setShowOverlay(true);
        setLoading(false);
      }
      // Also check if we're in last 4 seconds
      if (video.duration > 0 && video.currentTime >= video.duration - 4 && !showOverlay) {
        console.log('Video in last 4 seconds via polling');
        setShowOverlay(true);
      }
    }, 100);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      clearInterval(checkInterval);
    };
  }, [ended, showOverlay]);

  // Auto-play video when playing state becomes true
  useEffect(() => {
    if (playing && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error('Error playing video:', err);
      });
    }
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
    <div className="relative w-full h-full aspect-video rounded-sm overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(/image.png)' }}>
      {!playing ? (
        <button
          type="button"
          onClick={() => {
            setEnded(false);
            setShowOverlay(false);
            setPlaying(true);
          }}
          className="w-full h-full relative flex items-center justify-center focus:outline-none"
          aria-label="Play video"
        >
          <Image
            src="/image.png"
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
        <div className="w-full h-full relative bg-cover bg-center" style={{ backgroundImage: 'url(/image.png)' }}>
          <video
            ref={videoRef}
            src={videoUrl}
            className={`w-full h-full object-contain transition-opacity duration-[2000ms] ease-in-out ${showOverlay ? 'opacity-0' : 'opacity-100'}`}
            controls
            autoPlay
            playsInline
            preload="auto"
            controlsList="nodownload nofullscreen"
            disablePictureInPicture
            onEnded={() => {
              console.log('Video onEnded callback fired');
              setEnded(true);
              setShowOverlay(true);
              setLoading(false);
            }}
          />

          {/* Loading spinner overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 pointer-events-none">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {/* Get demo overlay shown in last 4 seconds of video with fade-in animation */}
          {showOverlay && (
            <div 
              className="absolute inset-0 z-20 flex items-center justify-center bg-cover bg-center animate-in fade-in duration-[2000ms]" 
              style={{ backgroundImage: 'url(/image.png)' }}
            >
              {/* dim overlay on top of image */}
              <div className="absolute inset-0 bg-black/10" />

              {/* content above the background */}
              <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
               

                <div className="flex mt-16 md:mt-38 flex-wrap justify-center items-center gap-3">
                  <button
                    type="button"
                    onClick={navigateToContact}
                    className={
                      "relative  inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold text-[#063a52] sm:px-8 sm:py-3 sm:text-base " +
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
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                      }
                      setEnded(false);
                      setShowOverlay(false);
                    }}
                    className="rounded-full px-3 py-1 text-xs sm:px-5 sm:py-2 sm:text-sm font-medium text-white bg-white/10 border border-white/25 hover:bg-white/20 transition focus-visible:ring-2 focus-visible:ring-white"
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
