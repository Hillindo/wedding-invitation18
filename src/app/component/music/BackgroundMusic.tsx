"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { MdStopCircle } from "react-icons/md";

// Interface untuk props
interface BackgroundMusicProps {
  src: string;
  isEnabled?: boolean;
}

/**
 * Komponen BackgroundMusic yang kompatibel dengan semua browser
 * - Memainkan audio background dengan kontrol play/pause
 * - Auto play saat undangan dibuka (isEnabled) setelah interaksi user
 * - Otomatis pause saat tab tidak aktif, resume jika kembali
 * - Multiple audio formats untuk kompatibilitas maksimal
 */
const BackgroundMusic = ({ src, isEnabled = false }: BackgroundMusicProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState<boolean>(false);
  const [audioLoaded, setAudioLoaded] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);
  
  // Normalisasi path audio untuk mencegah error dan handle url eksternal
  const normalizedSrc = src.startsWith('http') 
    ? src 
    : (src.startsWith('/') ? src : `/${src}`);
  
  // Deteksi apakah device adalah iOS untuk penanganan khusus
  const [isIOS] = useState(() => {
    if (typeof window !== "undefined") {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    }
    return false;
  });

  // Fungsi untuk verifikasi ketersediaan audio file
  const verifyAudioFile = async (audioSrc: string): Promise<boolean> => {
    // Jika src adalah URL eksternal, kita tidak bisa cek dengan fetch
    if (audioSrc.startsWith('http')) return true;
    
    try {
      // Untuk file lokal, kita coba fetch untuk verifikasi ketersediaan
      const response = await fetch(audioSrc, { method: 'HEAD' });
      return response.ok;
    } catch (e) {
      console.error("Audio file verification failed:", e);
      return false;
    }
  };

  // Cek ketersediaan file audio dan siapkan fallback
  useEffect(() => {
    let isMounted = true;
    const audio = new Audio();
    
    const checkAudio = async () => {
      // Verifikasi file tersedia
      const isAvailable = await verifyAudioFile(normalizedSrc);
      
      if (!isAvailable && isMounted) {
        console.warn("Audio file not found or not accessible:", normalizedSrc);
        setAudioError(true);
        return;
      }
      
      // Setup event listeners
      const handleCanPlayThrough = () => {
        if (isMounted) {
          setAudioLoaded(true);
          setAudioError(false);
        }
      };
      
      const handleError = (e: any) => {
        if (isMounted) {
          console.error("Audio loading error:", e);
          setAudioError(true);
          setAudioLoaded(false);
        }
      };
      
      audio.addEventListener('canplaythrough', handleCanPlayThrough);
      audio.addEventListener('error', handleError);
      
      // Load audio
      audio.preload = "auto";
      audio.src = normalizedSrc;
      
      // Try to load metadata only
      try {
        await audio.load();
      } catch (e) {
        if (isMounted) {
          console.error("Audio loading failed:", e);
          setAudioError(true);
        }
      }
    };
    
    checkAudio();
    
    return () => {
      isMounted = false;
      audio.removeEventListener('canplaythrough', () => {});
      audio.removeEventListener('error', () => {});
      audio.src = '';
    };
  }, [normalizedSrc]);

  // Sinkronisasi auto play dengan isEnabled setelah interaksi user
  useEffect(() => {
    if (isEnabled && audioRef.current && !isPlaying && !isManuallyPaused && audioLoaded) {
      // Delay sedikit untuk memastikan browser sudah siap
      const timer = setTimeout(() => {
        const playPromise = audioRef.current?.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Audio playback failed:", error);
              // Jika error karena belum ada interaksi user, tunggu interaksi
              setIsManuallyPaused(true);
            });
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isEnabled, isPlaying, isManuallyPaused, audioLoaded]);

  // Set loop dan event handlers
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      
      // Event handlers untuk menangani state playback
      const handleEnded = () => setIsPlaying(false);
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('play', handlePlay);
          audioRef.current.removeEventListener('pause', handlePause);
        }
      };
    }
  }, []);

  /**
   * Handler play/pause manual dari user
   * Menggunakan try/catch untuk menangani error di semua browser
   */
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsManuallyPaused(true);
      } else {
        // Untuk iOS, perlu reset src sebelum play
        if (isIOS) {
          audioRef.current.src = normalizedSrc;
          audioRef.current.load();
        }
        
        // Tangani promise play dengan baik
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setIsManuallyPaused(false);
            })
            .catch((error) => {
              console.error("Audio playback failed:", error);
              // Jika gagal dan device iOS, coba fallback method
              if (isIOS) {
                // Reset audio element dan coba lagi dengan delay
                audioRef.current!.currentTime = 0;
                setTimeout(() => {
                  audioRef.current?.play()
                    .then(() => {
                      setIsPlaying(true);
                      setIsManuallyPaused(false);
                    })
                    .catch(err => console.error("iOS fallback failed:", err));
                }, 300);
              }
            });
        }
      }
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

  /**
   * Pause audio saat tab tidak aktif, resume jika kembali
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;
      
      try {
        if (document.hidden && isPlaying) {
          audioRef.current.pause();
          // Tidak mengubah isPlaying karena hanya temporary pause
        } else if (!document.hidden && isEnabled && !isManuallyPaused && audioLoaded) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => setIsPlaying(true))
              .catch((e) => console.log("Auto resume failed", e));
          }
        }
      } catch (error) {
        console.error("Visibility change error:", error);
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying, isEnabled, isManuallyPaused, audioLoaded]);

  // Jika error loading audio, jangan tampilkan tombol
  if (audioError) return null;

  return (
    <div className="fixed top-3 right-1 z-50">
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
        muted={false}
        controls={false}
      >
        {/* Berikan multiple sources untuk kompatibilitas maksimum */}
        <source src={normalizedSrc} type="audio/mpeg" />
        {/* Tambahkan fallback untuk format ogg (beberapa browser bisa mendukung ini) */}
        {normalizedSrc.endsWith('.mp3') && (
          <source src={normalizedSrc.replace('.mp3', '.ogg')} type="audio/ogg" />
        )}
        {/* Fallback empty source jika format tidak didukung */}
        <source src="data:audio/mpeg;base64," type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <button
        className={`${isPlaying ? "animate-spin" : ""}`}
        onClick={handlePlayPause}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        disabled={audioError}
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
