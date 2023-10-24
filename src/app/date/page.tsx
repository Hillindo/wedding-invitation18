"use client";
import { useState, useEffect } from "react";
import Observer from "next@js/app/component/observer/observer-up";
import Observer2 from "next@js/app/component/observer/observer-moveLeft";
import Observer3 from "next@js/app/component/observer/observer-moveRight";
import Observer4 from "next@js/app/component/observer/observer-zoomIn";

export default function CountdownDate({data}:any) {
    const [event, setEvent] = useState<any>([]);
    const [url, seturl] = useState<any>([]);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });

      useEffect(() => {
        if (event?.length > 0) {
          
          const calculateCountdown = () => {
            const targetDate = new Date(event[0]?.date).getTime();
            const now = new Date().getTime();
    
            const diff = Math.max(targetDate - now, 0);
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
            setCountdown({ days, hours, minutes, seconds });
          };
    
          const interval = setInterval(calculateCountdown, 1000);
    
          return () => {
            clearInterval(interval);
          };
        }
      }, [event]);

    useEffect(() => {
      const getData = async () => {
        try {
          setEvent(data.event);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }, [data]); 
  return (
    <section className='py-[10%] bg-[#051E31] w-full relative' id="location">
        <div className='m-2 p-3 w-full flex flex-wrap'>
                <div className="absolute top-0 left-[-70px] ml-auto h-auto w-4/5 sm:w-1/2 lg:w-4/5">
            <Observer3>
            <img src="/img/bg-4.png" className='w-full h-auto' alt="" />
            </Observer3>
                </div>
                <div className="absolute  opacity-50 top-1/3 mr-auto right-[-70px] h-auto w-4/5 sm:w-1/2 lg:w-4/5">
            <Observer2>
            <img src="/img/bg-3.png" className='w-full h-auto' alt="" />
            </Observer2>
                </div>
            <div className='mt-8 z-[1] w-full flex flex-wrap sm:flex-nowrap lg:flex-wrap mx-auto justify-center '>
                <Observer>
                <div className='w-full flex justify-center'>
                    <div className='p-3 flex justify-center bg-white rounded-3xl w-[250px] sm:w-[350px] md:w-[400px] lg:w-[300px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[300px]'>
                    <iframe src={`${event?.length > 0 ? event[0]?.url : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.8250149254054!2d106.9285380738836!3d-6.668593765190272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69b75158a75fb7%3A0x4783f70c2ac389f5!2sBromelia%20Sport%20Center!5e0!3m2!1sid!2sid!4v1689038709719!5m2!1sid!2sid"}`} loading="lazy" className="rounded-3xl w-full h-full"></iframe>
                    </div>
                </div>
                </Observer>
                <div className='w-full flex flex-nowrap flex-col items-center justify-center text-white mx-5 mt-5'>
                    <Observer>
                    <div className='mb-2 text-center'>
                        <div className=' text-4xl text-white font-saignh'>
                            Save the Date
                        </div>
                    </div>
                    </Observer>
                    <Observer4>
                    <div className='grid sm:grid-rows-2 justify-center items-center gap-4 sm:gap-8 lg:gap-4'>
                        <div className='m-2 row-start-1 flex flex-col flex-nowrap text-center justify-center w-10 h-[60px]'>
                            <div className=' text-2xl'> {countdown.days ? countdown.days : "0"}</div>
                            <div className='text-sm font-fredericka'>Days</div>
                        </div>
                        <div className='m-2 row-start-1 flex flex-col flex-nowrap text-center justify-center w-10 h-[60px]'>
                            <div className=' text-2xl'> {countdown.hours ? countdown.hours : "0"}</div>
                            <div className='text-sm font-fredericka'>Hours</div>
                        </div>
                        <div className='m-2 row-start-1 sm:row-start-2 lg:row-start-1 flex flex-col flex-nowrap text-center justify-center w-10 h-[60px]'>
                            <div className=' text-2xl'>{countdown.minutes ? countdown.minutes : "0"}</div>
                            <div className='text-sm font-fredericka'>Minutes</div>
                        </div>
                        <div className='m-2 row-start-1 sm:row-start-2 lg:row-start-1 flex flex-col flex-nowrap text-center justify-center w-10 h-[60px]'>
                            <div className=' text-2xl'> {countdown.seconds ? countdown.seconds : "0"}</div>
                            <div className='text-sm font-fredericka'>Seconds</div>
                        </div>
                    </div>
                    </Observer4>
                </div>
            </div>
        </div>
    </section>
  )
}
