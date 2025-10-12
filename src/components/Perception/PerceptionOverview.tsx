"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PerceptionOverview: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl md:text-5xl uppercase font-extrabold tracking-tight text-center text-[#3b3f42] mb-12 font-raleway">
        AI Powered Advanced Analytics
      </h1>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="text-lg md:text-xl leading-relaxed font-inter text-[#303030] space-y-10">
          <p>
            AI uses neural networks to learn like the human brain – connecting inputs to outputs without being manually programmed. Through deep learning, it trains itself by processing data repeatedly, improving its ability to analyze and make decisions.
          </p>
          <div>
            <h2 className="text-2xl font-bold mb-4 font-raleway">Why AI?</h2>
            <p>
              In today’s rapidly evolving world, asking questions isn’t enough—real insights live in the unstructured noise (data) you’re ignoring.
            </p>
          </div>
          <p className="font-semibold font-raleway text-[#1d2d3a]">
            At CGC we augment traditional research with NextGen technology.
          </p>
        </div>
        <VideoEmbed videoId="pKGYXlf_BCo" />
      </div>
    </>
  );
};

export default PerceptionOverview;

type VideoEmbedProps = {
  videoId: string;
};

const VideoEmbed: React.FC<VideoEmbedProps> = ({ videoId }) => {
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!playing) return;

    let mounted = true;

    const createPlayer = () => {
      if (!mounted) return;
      const YT = (window as any).YT;
      if (!YT || !playerContainerRef.current) return;

      playerRef.current = new YT.Player(playerContainerRef.current, {
        width: '100%',
        height: '100%',
        videoId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: (event: any) => {
            // YT.PlayerState.ENDED === 0
            if (event.data === 0) {
              setEnded(true);
            }

            // YT.PlayerState.PLAYING === 1
            if (event.data === 1) {
              setEnded(false);
            }

            if (event.data === 2 || event.data === 3) {
              setEnded(false);
            }
          },
        },
      });
    };

    // polling fallback: check player state every 1s in case event isn't fired
    let pollInterval: any = null;

    // If API already loaded, create player immediately
    if ((window as any).YT && (window as any).YT.Player) {
      createPlayer();
      // start fallback poll
      pollInterval = setInterval(() => {
        try {
          const st = playerRef.current?.getPlayerState?.();
          // ended state === 0
          if (st === 0) setEnded(true);
          // playing states === 1 (playing), 2 (paused) or 3 (buffering)
          if (st === 1 || st === 2 || st === 3) setEnded(false);
        } catch (e) {
          // ignore
        }
      }, 1000);

      return () => {
        mounted = false;
        clearInterval(pollInterval);
        playerRef.current?.destroy?.();
      };
    }

    // Load the YouTube IFrame API if not already present
    const scriptId = 'youtube-iframe-api';
    if (!document.getElementById(scriptId)) {
      const tag = document.createElement('script');
      tag.id = scriptId;
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

    // Setup ready callback
    const previous = (window as any).onYouTubeIframeAPIReady;
    (window as any).onYouTubeIframeAPIReady = () => {
      previous?.();
      createPlayer();
      // start fallback poll
      pollInterval = setInterval(() => {
        try {
          const st = playerRef.current?.getPlayerState?.();
          if (st === 0) setEnded(true);
          if (st === 1 || st === 2 || st === 3) setEnded(false);
        } catch (e) {
          // ignore
        }
      }, 1000);
    };

    return () => {
      mounted = false;
      clearInterval(pollInterval);
      (window as any).onYouTubeIframeAPIReady = previous;
      try {
        playerRef.current?.destroy?.();
      } catch (e) {
        // ignore
      }
    };
  }, [playing, videoId]);

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
    <div className="relative w-full h-full aspect-video rounded-sm overflow-hidden bg-black">
      {!playing ? (
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            setEnded(false);
          }}
          className="w-full h-full relative flex items-center justify-center focus:outline-none"
          aria-label="Play video"
        >
          <Image
            src={thumbnail}
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
        <div className="w-full h-full relative">
          {/* player container will be replaced by YT iframe */}
          <div ref={playerContainerRef} className="w-full h-full z-10" />

          {/* Get demo overlay shown when video ends */}
          {ended && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-lg font-medium text-white max-w-sm">
                  Ready to see how our AI-powered analytics can transform your insights?
                </p>
                <button
                  type="button"
                  onClick={navigateToContact}
                  className="rounded-full bg-white px-7 py-3 text-base font-semibold text-[#1d2d3a] shadow-lg transition hover:bg-[#1d2d3a] hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1d2d3a]"
                  aria-label="Go to contact form to request a demo"
                >
                  Get demo
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
