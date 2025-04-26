"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { MdStopCircle } from "react-icons/md";

// Simple interface untuk props
interface BackgroundMusicProps {
  src: string;
  isEnabled?: boolean;
}

const BackgroundMusic = ({ src, isEnabled = false }: BackgroundMusicProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Efek untuk memulai pemutaran musik saat isEnabled berubah menjadi true
  useEffect(() => {
    if (isEnabled && audioRef.current && !isPlaying) {
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
  }, [isEnabled, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
    }
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
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
    }
  };

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
