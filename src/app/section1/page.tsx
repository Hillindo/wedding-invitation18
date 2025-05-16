"use client";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Snowfalls from '../component/snowfalls/SnowfallComponent';

export default function Section1({data}:any) {
  const [event, setEvent] = useState<any>([]);
  const [nameLeft, setNameLeft] = useState("");
  const [nameRight, setNameRight] = useState("");
  const [nameAliasLeft, setNameAliasLeft] = useState("");
  const [nameAliasRight, setNameAliasRight] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nameLeft = data?.brideGroomLeft && (data.brideGroomLeft[0].name_male ? data.brideGroomLeft[0].name_male : data.brideGroomLeft[0].name_female)?.split(" ");
        const nameRight = data?.brideGroomRight && (data.brideGroomRight[0].name_male ? data.brideGroomRight[0].name_male : data.brideGroomRight[0].name_female)?.split(" ");
        setNameLeft(nameLeft ? nameLeft[0] : "");
        setNameRight(nameRight ? nameRight[0] : "");
        setNameAliasLeft(data?.brideGroomLeft[0]?.name_alias);
        setNameAliasRight(data?.brideGroomRight[0]?.name_alias);
        setEvent(data.event)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [data]);

  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date('2025-07-06 00:00:00').getTime();
      const now = new Date().getTime();
      const diff = Math.max(targetDate - now, 0);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown({ days, hours, minutes, seconds });
    };
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden z-[100]">
        <img
          src="/img/goldrain.png"
          className="w-full h-full object-cover"
          alt="Gold rain effect"
        />
      </div>
      <Snowfalls/>
      <div className="w-full min-h-screen flex flex-wrap justify-center items-center content-center relative overflow-hidden">
        <motion.div
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'linear' }}
          className="absolute inset-0 overflow-hidden z-30"
        >
          <div 
            className="w-full h-full bg-cover bg-no-repeat mix-blend-multiply bg-center bg-blend-multiply z-30 inset-0 absolute" 
            style={{backgroundImage: `url('/img/bg-2.jpg')`}}
          />
          <div 
            className="bg-center bg-no-repeat bg-cover bg-blend-multiply mix-blend-multiply bg-transparent h-full w-full absolute z-30" 
            style={{backgroundImage: `url('/img/birds.gif')`}}
          />
        </motion.div>

        <div className="flex flex-wrap justify-center items-center content-center flex-grow flex-shrink flex-col gap-2 w-full h-full text-center py-8 z-50">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full max-w-full flex justify-center mb-8"
          >
            <img
              src="/logo/logo-hill-nay.png"
              className="w-4/5 md:w-3/5 lg:w-2/5"
              alt="Logo Pasti Nikah" 
              rel="preload" 
              fetchPriority="high" 
            />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-center space-y-6 px-4" // Increased spacing for better visual hierarchy
          >
            {/* THE WEDDING OF */}
            <div 
              className="font-quicksand tracking-[1px] text-[15px] opacity-80" 
              style={{ color: '#e1ba60' }}
            >
              THE WEDDING OF
            </div>

            {/* Names */}
            <div 
              className="font-qageto text-4xl lg:text-5xl tracking-[3px] opacity-95" 
              style={{ color: '#e1ba60' }}
            > 
              {nameAliasLeft ? nameAliasLeft : nameLeft ? nameLeft: " "} & {nameAliasRight ? nameAliasRight : nameRight ? nameRight : " "}
            </div>

            {/* Date */}
            <div 
              className="font-quicksand text-[15px] opacity-90"
              style={{ color: '#e1ba60' }}
            >
              Minggu, 06 Juli 2025
            </div>

            {/* Countdown Boxes */}
            <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4">
              <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] rounded-md flex flex-col items-center justify-center" style={{backgroundColor: '#e1ba60'}}>
                <div className="text-lg font-bold">{countdown.days}</div>
                <div className="text-xs">Days</div>
              </div>
              <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] rounded-md flex flex-col items-center justify-center" style={{backgroundColor: '#e1ba60'}}>
                <div className="text-lg font-bold">{countdown.hours}</div>
                <div className="text-xs">Hours</div>
              </div>
              <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] rounded-md flex flex-col items-center justify-center" style={{backgroundColor: '#e1ba60'}}>
                <div className="text-lg font-bold">{countdown.minutes}</div>
                <div className="text-xs">Minutes</div>
              </div>
              <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] rounded-md flex flex-col items-center justify-center" style={{backgroundColor: '#e1ba60'}}>
                <div className="text-lg font-bold">{countdown.seconds}</div>
                <div className="text-xs">Seconds</div>
              </div>
            </div>

            {/* Simpan Tanggal Button */}
             {event?.length > 0 && (
                  <div className="w-full flex justify-center mb-8">
                      <button
                           className="font-quicksand font-semibold py-2.5 px-5 rounded-lg text-sm flex items-center justify-center mx-auto"
                          style={{ backgroundColor: '#e1ba60', color: '#001530' }} // Using dark blue for text, similar to front page background
                          onClick={() => {
                              if (event[0].date && event[0].start_event && event[0].end_event) {
                                  const startDate = event[0].date.split(" ")[0];
                                  const startTime = startDate + "T" + event[0].start_event.replace(":", "");
                                  const endTime = startDate + "T" + event[0].end_event.replace(":", "");
                                  const eventUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                                      event[0].name
                                  )}&dates=${encodeURIComponent(
                                      startTime + "/" + endTime
                                  )}&location=${encodeURIComponent(event[0].address)}`;
                                  window.open(eventUrl, "_blank");
                              }
                          }}
                      >
                          <span>
                              Simpan Tanggal
                              <i className="fas fa-arrow-right-long ml-2"></i>
                          </span>
                      </button>
                  </div>
              )}
          </motion.div>
        </div>
      </div>
    </>
  )
}