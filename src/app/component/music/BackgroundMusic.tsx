"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { MdStopCircle } from "react-icons/md";

// Simple interface untuk props
interface BackgroundMusicProps {
  src: string;
  isEnabled?: boolean;
}

/**
 * Komponen BackgroundMusic
 * - Memainkan audio background dengan kontrol play/pause
 * - Auto play saat undangan dibuka (isEnabled)
 * - Otomatis pause saat tab tidak aktif, resume jika kembali
 * - User bisa play/pause manual
 */
const BackgroundMusic = ({ src, isEnabled = false }: BackgroundMusicProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState<boolean>(false);

  // Sinkronisasi auto play dengan isEnabled
  useEffect(() => {
    if (isEnabled && audioRef.current && !isPlaying && !isManuallyPaused) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
          });
      }
    }
  }, [isEnabled, isPlaying, isManuallyPaused]);

  useEffect(() => {
    // Set audio loop
    if (audioRef.current) {
      audioRef.current.loop = true;
    }
  }, []);

  /**
   * Handler play/pause manual dari user
   */
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsManuallyPaused(true);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setIsManuallyPaused(false);
            })
            .catch((error) => {
              console.error("Audio playback failed:", error);
            });
        }
      }
    }
  };

  /**
   * Pause audio saat tab tidak aktif, resume jika kembali
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current && isPlaying) {
        audioRef.current.pause();
      } else if (!document.hidden && audioRef.current && isEnabled && !isManuallyPaused) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => setIsPlaying(true)).catch(() => {});
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying, isEnabled, isManuallyPaused]);

  return (
    <div className="fixed top-3 right-1 z-50">
      <audio ref={audioRef} src={src} />
      <button
        className={`${isPlaying ? "animate-spin" : ""}`}
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <div className="text-4xl bg-[#051E31] text-slate-100 rounded-full">
            <MdStopCircle />
          </div>
        ) : (
          <div className="text-4xl bg-slate-100 text-[#051E31] rounded-full">
            <AiFillPlayCircle />
          </div>
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;
