"use client";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import Snowfalls from '../component/snowfalls/SnowfallComponent';
import Image from "next/image";

export default function Section1({data}:any) {
  const [event, setEvent] = useState<any>([]);
  const [nameMale, setNameMale] = useState("");
  const [nameFemale, setNameFemale] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
        try {
        const nameMale = data.nameMale?.name_male?.split(" ");
        const nameFemale = data.nameFemale?.name_female?.split(" ");
        setNameMale(nameMale ? nameMale[0] : "");
        setNameFemale(nameFemale ? nameFemale[0] : "");
        setEvent(data.event)
      } catch (error) {
        console.error('Error fetching data:', error);
      
      }
    };

    fetchData();
}, [data]);

useEffect(() => {
  if (event?.length > 0) {
    const date = new Date(event[0]?.date);
    setFormattedDate(
      date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }
},[event])

  return (
    <>
      <Snowfalls/>
    <div className="w-full flex flex-wrap justify-center items-center content-center h-full relative overflow-hidden">
      <motion.div
initial={{ scale: 1.5 }}
animate={{ scale: 1 }}
transition={{ duration: 10, ease: 'linear',  }}
className="absolute inset-0 overflow-hidden z-30"
style={
{animationDelay: '2s'}
}
>
<div className="w-full items-center content-center h-full bg-cover bg-no-repeat mix-blend-multiply bg-bottom bg-blend-multiply z-30 inset-0 absolute" style={{backgroundImage: `url('/img/bg-2.jpg')`}}></div>
<div className="bg-center bg-no-repeat bg-cover bg-blend-multiply mix-blend-multiply bg-transparent h-full w-full absolute z-30" style={{backgroundImage: `url('/img/birds.gif')`}}></div>
</motion.div>
    <div className="flex flex-wrap justify-center items-center content-center flex-grow flex-shrink flex-col gap-2 w-full h-full text-center py-40 pb-96 sm:pb-[600px] z-50">

        <div className="h-full max-w-full flex justify-center mb-4 animate-moveDown-1">
        </div>
        <motion.div
initial={{ rotate: -3 }} // Initial rotation degree for top and bottom
animate={{ rotate: 3 }} // Final rotation degree for top and bottom
transition={{
duration: 2,
delay: 2, // Control the speed of the animation
ease: 'easeInOut', // Easing function for smooth in-out animation
repeat: Infinity, // Repeat the animation infinitely
repeatType: 'reverse', // Reverse the animation on each repeat
}}
className="relative "
style={{
transformOrigin: 'center', // Rotate around the center
}}
>
        <div className="h-full max-w-full flex justify-center mb-4">
            <Image src="/logo/iconpastinikah.svg" className=" w-2/5 animate-moveDown-1" alt="" rel="preload" fetchPriority="high" />
        </div>
</motion.div>
        <div className="w-full h-auto text-center font-quicksand tracking-[3px] text-[13px] opacity-80 md:text-lg xl:text-[13px] text-black animate-moveDown-1">
            THE WEDDING OF
        </div>
        <div className="w-full h-auto text-center tracking-[3.7px] text-[42px] font-medium animate-moveDown-1 font-cinzel text-[#474747]"> 
        {nameMale ? nameMale: " "} & {nameFemale ? nameFemale : " "}
        </div>
    </div>
</div>
    </>
  )
}
