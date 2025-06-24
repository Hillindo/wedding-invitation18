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

  // Helper function to format date time for Google Calendar
  const formatGoogleCalendarDateTime = (dateTime: string) => {
    const [datePart, timePart] = dateTime.split("T");
    const cleanedTimePart = timePart ? timePart.replace(/:/g, "") + "00".substring(0, 6 - timePart.replace(/:/g, "").length) : "000000";
    return datePart.replace(/-/g, "") + "T" + cleanedTimePart;
  };

  // Function to add event to Google Calendar
  const addToCalendar = () => {
    if (event && event.length > 0 && event[0].date && event[0].start_event && event[0].end_event) {
      const eventData = event[0];
      const startDate = eventData.date.split(" ")[0];
      const startTimeStr = eventData.start_event.split(" ")[0];
      const endTimeStr = eventData.end_event.split(" ")[0];
      const startTime = formatGoogleCalendarDateTime(startDate + "T" + startTimeStr);
      const endTime = formatGoogleCalendarDateTime(startDate + "T" + endTimeStr);

      const eventUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        eventData.name || 'Wedding Event'
      )}&dates=${encodeURIComponent(
        startTime + "/" + endTime
      )}&location=${encodeURIComponent(eventData.address || eventData.location || '')}`;
      window.open(eventUrl, "_blank");
    } else {
      console.warn('Event data not available for calendar');
    }
  };

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
     
      <Snowfalls/>
       <div className="absolute top-0 left-0 w-full h-screen sm:h-screen md:h-screen lg:h-screen overflow-hidden pointer-events-none" style={{ zIndex: 999 }}>
        <img
          src="/img/goldrain.png"
          className="w-full h-full object-cover"
          alt="Gold rain effect"
          style={{ mixBlendMode: 'screen' }}
          fetchPriority="high"
        />
      </div>
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
        <div className="flex flex-wrap justify-center items-center content-center flex-grow flex-shrink flex-col gap-2 w-full h-full text-center py-8 z-50 mt-[-80px] sm:mt-[-85px] lg:mt-[-60px]">
          <div className="h-full max-w-full flex justify-center mb-8 -mt-10 md:-mt-40 lg:-mt-32">
            <img
              src="/logo/logo-hill-nay.png"
              className="w-3/5 md:w-3/5 lg:w-7/10"
              alt="Logo Pasti Nikah" 
              rel="preload" 
              fetchPriority="high" 
            />
          </div>

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
              className="font-roxborough-cf text-3xl lg:text-4xl tracking-[3px] opacity-95" 
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
            <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4 relative z-20">
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
            <button
              className="font-quicksand font-semibold py-2.5 px-5 rounded-lg text-sm flex items-center justify-center mx-auto relative z-20 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#e1ba60', color: '#001530' }}
              onClick={addToCalendar}
            >
              <i className="fa fa-calendar mr-2"></i>
              Simpan Tanggal
            </button>
            {/* Flower decorations - BOTTOM dengan gambar dirotasi horizontal */}
              <div className="absolute left-0 bottom-[-95px] -z-10 w-full">
                  <div className="relative h-40">
                      <motion.div 
                          className="absolute left-[-30px] bottom-[10px]"
                          animate={{
                              x: [0, -10, 0, -4, 0],
                              y: [0, 1, 0],
                              transition: {
                                  duration: 8,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                              }
                          }}
                      >
                          <img src="/img/flower-front/Bunga2.png" alt="Flower decoration" 
                              className="w-32 md:w-40" 
                              style={{ transform: 'rotate(30deg)' }} />
                      </motion.div>

                      <motion.div 
                          className="absolute left-[40px] bottom-[-20px]"
                          animate={{
                              x: [0, 10, 0, 3, 0],
                              y: [0, -1, 0],
                              transition: {
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: 0.2
                              }
                          }}
                      >
                          <img src="/img/flower-front/Bunga7.png" alt="Flower decoration" 
                              className="w-32 md:w-40" 
                              style={{ transform: 'rotate(10deg)' }}
                              />
                      </motion.div>

                      <motion.div 
                          className="absolute left-1/2 bottom-0 left-[120px] bottom-[-80px]"
                          animate={{
                              y: [0, -2, 0, -3, 0],
                              transition: {
                                  duration: 4,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                              }
                          }}
                      >
                          <img src="/img/flower-front/Bunga3.png" alt="Flower decoration" 
                              className="w-40 md:w-48"
                                />
                      </motion.div>

                      <motion.div 
                          className="absolute right-[50px] bottom-[10px]"
                          animate={{
                              x: [0, 10, 0, 3, 0],
                              transition: {
                                  duration: 7,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: 0.6
                              }
                          }}
                      >
                          <img src="/img/flower-front/Bunga6.png" alt="Flower decoration" 
                              className="w-32 md:w-40"
                                />
                      </motion.div>

                      <motion.div 
                          className="absolute right-[-40px] bottom-10"
                          animate={{
                              x: [0, 10, 0, -5, 0],
                              transition: {
                                  duration: 5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: 0.3
                              }
                          }}
                      >
                          <img src="/img/flower-front/Bunga1.png" alt="Flower decoration" 
                              className="w-32 md:w-40" style={{ transform: 'rotate(-30deg)' }}
                                />
                      </motion.div>
                  </div>
              </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}