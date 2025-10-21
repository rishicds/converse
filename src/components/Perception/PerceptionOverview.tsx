"use client"

interface YTPlayerOptions {
  width?: string | number;
  height?: string | number;
  videoId: string;
  playerVars?: Record<string, unknown>;
  events?: Record<string, (event: { data: number }) => void>;
}

interface YTPlayer {
  getPlayerState(): number;
  destroy(): void;
  seekTo(seconds: number): void;
  playVideo(): void;
}

interface YTPlayerConstructor {
  new (element: HTMLElement | string, options: YTPlayerOptions): YTPlayer;
}

declare global {
  interface Window {
    YT?: {
      Player: YTPlayerConstructor;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PerceptionOverview: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl uppercase font-extrabold tracking-tight text-center text-[#3b3f42] mb-8 md:mb-12 font-raleway px-4 sm:px-0">
        AI Powered Advanced Analytics
      </h1>
      <div className="w-full mb-8 md:mb-12 lg:mb-16">
        <VideoEmbed videoId="pKGYXlf_BCo" />
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
  videoId: string;
};

const VideoEmbed: React.FC<VideoEmbedProps> = ({ videoId }) => {
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const playerRef = useRef<YTPlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!playing) return;

    let mounted = true;

    type YTEvent = { data: number };
    const createPlayer = () => {
      if (!mounted) return;
      const YT = window.YT;
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
          onStateChange: (event: YTEvent) => {
            if (event.data === 0) {
              setEnded(true);
            }
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

    let pollInterval: ReturnType<typeof setInterval> | null = null;

    if (window.YT && window.YT.Player) {
      createPlayer();
      pollInterval = setInterval(() => {
        try {
          const st = playerRef.current?.getPlayerState?.();
          if (st === 0) setEnded(true);
          if (st === 1 || st === 2 || st === 3) setEnded(false);
        } catch {
          // ignore
        }
      }, 1000);

      return () => {
        mounted = false;
        if (pollInterval) clearInterval(pollInterval);
        playerRef.current?.destroy?.();
      };
    }

    const scriptId = 'youtube-iframe-api';
    if (!document.getElementById(scriptId)) {
      const tag = document.createElement('script');
      tag.id = scriptId;
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      createPlayer();
      pollInterval = setInterval(() => {
        try {
          const st = playerRef.current?.getPlayerState?.();
          if (st === 0) setEnded(true);
          if (st === 1 || st === 2 || st === 3) setEnded(false);
        } catch {
          // ignore
        }
      }, 1000);
    };

    return () => {
      mounted = false;
      if (pollInterval) clearInterval(pollInterval);
      window.onYouTubeIframeAPIReady = previous;
      try {
        playerRef.current?.destroy?.();
      } catch {
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
        <div className="w-full h-full relative">
          {/* player container will be replaced by YT iframe */}
          <div ref={playerContainerRef} className="w-full h-full z-10" />

          {/* Get demo overlay shown when video ends */}
          {ended && (
            <div className="absolute inset-0 z-50 flex items-center justify-center">
              {/* full-bleed background image (video thumbnail) */}
              <Image
                src="/image.png"
                alt="Video thumbnail background"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />

              {/* dim/blur overlay on top of image */}
              <div  />

              {/* content above the background */}
              <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
                

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
                      // attempt to seek to start and play again
                      try {
                        (playerRef.current as YTPlayer)?.seekTo?.(0);
                        (playerRef.current as YTPlayer)?.playVideo?.();
                      } catch {
                        // fallback: destroy and re-create by toggling playing state
                        try {
                          playerRef.current?.destroy?.();
                          setPlaying(false);
                          setTimeout(() => setPlaying(true), 50);
                        } catch {
                          // ignore
                        }
                      }
                      setEnded(false);
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
