"use client";


import React, { useEffect, useRef, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { PiStopCircleFill } from "react-icons/pi";
import { MdStopCircle } from "react-icons/md";

const BackgroundMusic = ({ src }: any) => {
  const audioRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<any>(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.autoplay = true;
      audioRef.current.loop = true;
    }
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
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
          <div className="text-4xl bg-slate-100 text-[#051E31]  rounded-full">
            <AiFillPlayCircle />
          </div>
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;
