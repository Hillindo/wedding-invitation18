"use client";
import { useState, useEffect } from "react";
import Observer4 from "../component/observer/observer-zoomIn";

export default function Location({ data }: any) {
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

    function parseDate(str: any) {
        const [dateparts, timeparts] = str.split(" ");
        const [year, month, day] = dateparts.split("-");
        const [hours = 0, minutes = 0, seconds = 0] = timeparts?.split(":") ?? [];
        // Treats the string as UTC, but you can remove the `Date.UTC` part and use
        // `new Date` directly to treat the string as local time
        return new Date(
            Date.UTC(+year, +month - 1, +day, +hours, +minutes, +seconds)
        );
    }

    useEffect(() => {
        if (event?.length > 0) {
            const dateString = event[0]?.date;
            const d = parseDate(dateString);
            const calculateCountdown = () => {
                const targetDate = d.getTime();
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
            const dateString = event[0]?.date;
            const d = parseDate(dateString);
            setFormattedDate(
                d.toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
            );
        }
    }, [event]);

    const start = startEvent?.substr(0, 5).replace(":", "-");
    const end = endEvent?.substr(0, 5).replace(":", "-");

    const akadEvent = allEvent?.find((event: any) => event.name?.toLowerCase().includes("akad"));
    const resepsiEvent = allEvent?.find((event: any) => event.name?.toLowerCase().includes("resepsi"));

    const renderEventDetails = (eventData: any, eventTitleForCalendar: string) => {
        if (!eventData) return null;
        const d = parseDate(eventData.date);

        const formatGoogleCalendarDateTime = (dateTime: string) => {
            // Ensures time part is correctly formatted (e.g., HHMMSS)
            const [datePart, timePart] = dateTime.split("T");
            const cleanedTimePart = timePart ? timePart.replace(/:/g, "") + "00".substring(0, 6 - timePart.replace(/:/g, "").length) : "000000"; // Pad to HHMMSS
            return datePart.replace(/-/g, "") + "T" + cleanedTimePart;
        };
        
        const addToCalendar = () => {
            if (eventData.date && eventData.start_event && eventData.end_event) {
                const startDate = eventData.date.split(" ")[0]; // Get date part
                
                // Ensure start_event and end_event are just times like "HH:MM:SS" or "HH:MM"
                const startTimeStr = eventData.start_event.split(" ")[0]; // In case it has date too
                const endTimeStr = eventData.end_event.split(" ")[0];

                const startTime = formatGoogleCalendarDateTime(startDate + "T" + startTimeStr);
                const endTime = formatGoogleCalendarDateTime(startDate + "T" + endTimeStr);

                const eventUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                    eventTitleForCalendar // Use the specific title for the calendar event
                )}&dates=${encodeURIComponent(
                    startTime + "/" + endTime
                )}&location=${encodeURIComponent(eventData.address || eventData.location || '')}`;
                window.open(eventUrl, "_blank");
            }
        };

        return (
            <Observer4>
                <div className="text-center text-white">
                    <div className="mb-3 capitalize font-semibold text-lg" style={{fontFamily: data?.fontContent?.font_content || 'Garaigit, serif'}}>
                        {d.toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                    <div className="mb-3 w-full border-t border-gray-400 opacity-30" />
                    <div className="w-full mb-3 flex items-center justify-center">
                        <i className="fa-solid fa-clock pr-3 text-sm"></i>
                        <div className="text-sm" style={{fontFamily: data?.fontContent?.font_content || 'sans-serif'}}>
                            {`${eventData.start_event.substr(0, 5).replace(":", ".")} - ${eventData.end_event.substr(0, 5).replace(":", ".")}`} {eventData.time_zone}
                        </div>
                    </div>
                    <div className="mb-5 w-full flex items-center justify-center text-center">
                        <i className="fa-solid fa-location-dot pr-3 text-sm"></i>
                        <div className="text-sm italic" style={{fontFamily: data?.fontContent?.font_content || 'Newsreader, serif'}}>
                            <p>{eventData.location || eventData.address}</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs py-2.5 px-6 rounded-lg font-semibold tracking-wide"
                            onClick={addToCalendar}
                            style={{fontFamily: data?.fontContent?.font_content || 'sans-serif'}}
                        >
                            <span>
                                Save the Date
                                <i className="fas fa-arrow-right-long ml-2"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </Observer4>
        );
    };

    return (
        <section
          className="relative w-full py-16 px-4 bg-gray-100" // Updated section style
          id="location"
        >
            <div className="flex flex-col items-center gap-10 max-w-lg mx-auto"> {/* Increased gap */}
              {akadEvent && (
                <div
                  className="w-full p-8 rounded-2xl shadow-xl text-white bg-center bg-cover" // Increased padding
                  style={{ backgroundImage: `url('/img/bg-event.png')` }}
                >
                  <h2 className="text-4xl font-bold text-yellow-400 text-center mb-6" style={{fontFamily: data?.fontTitle?.font_title || 'Cinzel, serif'}}>
                    AKAD NIKAH
                  </h2>
                  {renderEventDetails(akadEvent, "Akad Nikah")}
                </div>
              )}
              {resepsiEvent && (
                <div
                  className="w-full p-8 rounded-2xl shadow-xl text-white bg-center bg-cover" // Increased padding
                  style={{ backgroundImage: `url('/img/bg-event.png')` }}
                >
                  <h2 className="text-4xl font-bold text-yellow-400 text-center mb-6" style={{fontFamily: data?.fontTitle?.font_title || 'Cinzel, serif'}}>
                    RESEPSI
                  </h2>
                  {renderEventDetails(resepsiEvent, "Resepsi")}
                </div>
              )}
              {!akadEvent && !resepsiEvent && allEvent && allEvent.length > 0 && (
                <p className="text-center text-gray-700 mt-4">Detail acara akan segera diperbarui.</p>
              )}
               {(!allEvent || allEvent.length === 0) && (
                <p className="text-center text-gray-700 mt-4">Informasi acara tidak tersedia.</p>
              )}
            </div>
        </section>
    );
}
