"use client";

import { useEffect, useState } from "react";
import Observer from "next@js/app/component/observer/observer-up";
import Observer2 from "next@js/app/component/observer/observer-moveLeft";
import Observer3 from "next@js/app/component/observer/observer-moveRight";
import Observer4 from "next@js/app/component/observer/observer-zoomIn";

export default function Location({data}:any) {
    const [event, setEvent] = useState<any>([]);
  const [allEvent, setAllEvent] = useState<any>([]);
  const [startEvent, setStartEvent] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [endEvent, setEndEvent] = useState("");
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
        setAllEvent(data.allEvents);
        setStartEvent(data.timeEvent?.start_event);
        setEndEvent(data.timeEvent?.end_event);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [data]);


  useEffect(() => {
    if (event?.length > 0) {
      const date = new Date(event[0]?.date);
      setFormattedDate(
        date.toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
},[event])

 

  const start = startEvent?.substr(0, 5).replace(":", "-");
  const end = endEvent?.substr(0, 5).replace(":", "-");
  

  const events =
    allEvent?.length > 0 &&
    allEvent.map((res: any, index: any) => {
      const formatGoogleCalendarDateTime = (dateTime: string) => {
        const formattedDateTime = dateTime.replace(/[-: ]/g, '');
        return formattedDateTime;
    };

    const addToCalendar = () => {
        if (res.date && res.start_event && res.end_event) {
            const startDate = res.date.split(' ')[0]; // Ambil tanggal dari date
            const startTime = formatGoogleCalendarDateTime(startDate + 'T' + res.start_event);
            const endTime = formatGoogleCalendarDateTime(startDate + 'T' + res.end_event);

            const eventUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(res.name)}&dates=${encodeURIComponent(startTime + '/' + endTime)}&location=${encodeURIComponent(res.address)}`;

            window.open(eventUrl, '_blank');
        }
    };
    const formattedDate = res.date.replace(' ', 'T') + '.000000Z';
    
      return (
            <Observer4 key={res.id}>
        <div className="bg-[#FFFFFF91] p-5 my-5 max-w-xs w-full rounded-3xl text-black" id="date">
                <div className="p-2 w-full">
                    <div className="mb-5 text-left mt-2 font-semibold text-black tracking-[4px] text-base italic font-timesnr">
                        {res.name}
                    </div>
                    <div className="mb-5 capitalize font-semibold text-left mt-2 text-black text-xl font-garaigit">
                    {new Date(formattedDate).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              })}
                    </div>
                    <div className="mb-5 w-full border-t border-black"/>
                    <div className="w-full mb-5 flex items-center">
                        <i className="fa-solid fa-clock pr-5"></i>
                        <div className="text-sm"> {`${res.start_event
              .substr(0, 5)
              .replace(":", "-")} ~ ${res.end_event
              .substr(0, 5)
              .replace(":", "-")}`}{" "}
              {res.time_zone}</div>
                    </div>
                    <div className="mb-5 w-full flex items-center">
                    <i className="fa-solid fa-location-dot pr-5"></i>
                    <div className=" font-newsreader text-sm italic">
                    <p>{res.location}</p>
                    </div>
                    </div>
                    <div className="flex justify-center">
            <button className="MobileButton self-stretch bg-black rounded-sm justify-center items-center gap-4  text-white text-xs py-2 px-5 font-sans" onClick={addToCalendar}>
                <span>
               Save the Date
               <i className="fas fa-arrow-right-long ml-2"></i>
                </span>
            </button>
            </div>
                </div>
            </div>
            </Observer4>
        
      )
      });
    //   console.log(data, "data");
      
  return (
    <section className="relative w-full h-full bg-fixed bg-top bg-cover bg-opacity-50" style={{backgroundImage: `url('/img/bg-7.jpg')`}}>
        <div className="bg-white opacity-50 absolute w-full h-full"/>
        <div className="bg-[#9B899A00] p-5 flex flex-wrap justify-center z-20 relative gap-4">
            {events}
        </div>
    </section>
    )
}
