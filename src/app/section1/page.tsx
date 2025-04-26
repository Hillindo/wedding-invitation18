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

  return (
    <>
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
              className="w-1/3 md:w-1/4 lg:w-1/5" 
              alt="Logo Pasti Nikah" 
              rel="preload" 
              fetchPriority="high" 
            />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-center space-y-4"
          >
            <div className="text-center font-quicksand tracking-[3px] text-[17px] opacity-80 md:text-lg xl:text-[15px] text-black">
              THE WEDDING OF
            </div>
            <div className="text-center tracking-[3.7px] text-[42px] font-medium font-cinzel text-black opacity-95"> 
              {nameAliasLeft ? nameAliasLeft : nameLeft ? nameLeft: " "} & {nameAliasRight ? nameAliasRight : nameRight ? nameRight : " "}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}