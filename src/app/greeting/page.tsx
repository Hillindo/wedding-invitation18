"use client";
import React from 'react'
import axios from "next@js/lib/axios";
import { setCookie, getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import Observer from "next@js/app/component/observer/observer-up";
import Observer2 from "next@js/app/component/observer/observer-moveLeft";
import Observer3 from "next@js/app/component/observer/observer-moveRight";
import Observer4 from "next@js/app/component/observer/observer-zoomIn";

export default function Greeting({data}:any) {
const [greetings, setGreetings] = useState<any>([]);
    const [nameGuest, setNameGuest] = useState("");
    const [greetingWord, setGreetingWord] = useState("");
    const [presence, setpresence] = useState("1");
    const [loading, setLoading] = useState(false);
    const [presenceError, setPresenceError] = useState("");

    const getLastModifiedTimestamp = () => {
    const lastModified = localStorage.getItem("lastModified");
    return lastModified ? new Date(lastModified) : null;
    };

    const fetchInvitationData = async () => {
    try {
    const res = await axios.get(`/api/getmessages/${getCookie("subDomain")}`);
    setGreetings(res.data.greetings);
    const lastModified = res.headers["last-modified"];
    localStorage.setItem("lastModified", lastModified);
    } catch (error) {
    console.log(error);
    }
    };

    const checkForUpdates = async () => {
    try {
    const res = await axios.head(`/api/invitation/${getCookie("subDomain")}`);
    const lastModified = res.headers["last-modified"];
    if (lastModified !== getLastModifiedTimestamp()) {
    fetchInvitationData();
    }
    } catch (error) {
    console.log(error);
    }
    };

    useEffect(() => {
    fetchInvitationData();
    }, []);

    useEffect(() => {
    const interval = setInterval(() => {
    checkForUpdates();
    }, 1000);

    return () => {
    clearInterval(interval);
    };
    });

    const sendGreeting = async (e: any) => {
    e.preventDefault();
    if (!presence) {
        setPresenceError("Tolong Isi Daftar Kehadiran");
        setTimeout(() => {
          setPresenceError("");
        }, 3000);
        return; // Prevent sending the greeting if presence is not provided
      }
    setLoading(true);
    try {
    await axios.post(`/api/sendgreeting/${getCookie('subDomain')}`, {
    name_guest: nameGuest,
    greeting_word: greetingWord,
    presence: presence,
    });
    } catch (error) {
    console.log(error);
    }
    // fetchInvitationData();
    setNameGuest("");
    setGreetingWord("");
    setpresence("");
    setLoading(false);
    };
    console.log(presence, "pres");
      return (
    <section className='px-5 sm:mx-12 lg:px-5 lg:max-w-md mx-auto' id='greeting'>
        <Observer>
        <section
            className="bg-[#051E31] z-50 w-full rounded-3xl shadow-slate-200 shadow-md relative mt-12 text-white"
            style={{
                backgroundImage: "url('/img/bg-2.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
            <div className="w-full flex flex-wrap mx-auto py-12">
                <div className="text-center mb-5 w-full font-youkiss text-4xl">RSVP
                </div>

                <div className="text-center  font-saignh text-md mb-5 mx-6">Please kindly help us prepare everything
                    better by confirming your attendance to our wedding event with the following RSVP form:
                </div>
                <div className="mb-5 w-full">
                    <div className="p-5">

                        <div className=" pb-3">
                            <div className=" font-saignh text-sm mb-2">Name*</div>
                            <textarea
                                className="w-full rounded-xl border border-white py-1 px-4 text-xs font-romantic text-black"
                                value={nameGuest} onChange={(e)=> setNameGuest(e.target.value)}>
                                </textarea>
                        </div>
                        {/* <div className=" pb-3">
                            <div className=" font-saignh text-sm mb-2">Attendance Confirmation*</div>
                            <div className="Frame40 justify-start items-start gap-[22px] inline-flex  font-saignh">
                                <div className="Frame38 justify-start items-center gap-2 flex ">
                                    <label className="CheckboxBase w-5 h-5 relative">
                                        <input value="1" checked={presence=="1" } onChange={(e)=>
                                        setpresence(e.target.value)}
                                        className="w-5 h-5 left-0 top-0 absolute"
                                        type="radio"
                                        name="radio"
                                        id="radio-two"
                                        />
                                    </label>
                                    <div className="Hadir  text-[14px] font-normal leading-normal">
                                        Hadir
                                    </div>
                                </div>
                                <div className="Frame39 justify-start items-center gap-2 flex">
                                    <label className="CheckboxBase w-5 h-5 relative">
                                        <input value="2" checked={presence=="2" } onChange={(e)=>
                                        setpresence(e.target.value)}
                                        className="w-5 h-5 left-0 top-0 absolute"
                                        type="radio"
                                        name="radio"
                                        id="radio-three"
                                        />
                                    </label>
                                    <div className="Tidak  text-[14px] font-normal leading-normal">
                                        Tidak
                                    </div>
                                </div>
                            </div>
                            {presenceError && (
            <div className="text-white rounded-lg text-lg bg-red-500 text-center">{presenceError}</div>)}
                        </div> */}
                        <div className=" pb-3">
                            <div className=" font-saignh text-sm mb-2">Give prayers and greetings to the bride and groom
                            </div>
                            <textarea className="w-full rounded-xl border border-white p-5 text-xs font-romantic text-black"
                                value={greetingWord} onChange={(e)=> setGreetingWord(e.target.value)}>
                                </textarea>
                        </div>
                        <button
                            className="MobileButton self-stretch h-12 bg-[#183A51] rounded-lg justify-center items-center gap-4 inline-flex w-full"
                            onClick={sendGreeting}>
                            <div className={`Text text-white text-sm font-normal leading-normal ${loading
                                && "cursor-not-allowed" }`}>
                                Submit
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div id="kolom-2" className="w-full overflow-y-auto h-52 p-5 mb-7">
                {greetings?.length > 0 ? (
                greetings.map((res: any, index: any) => (
                <div key={index} className=" gap-2 w-full h-fit px-3 p-5 shadow-slate-200 shadow-md mb-5 rounded-xl">
                    <div className="text-white font-romantic text-base">
                        {res?.greeting_word}
                    </div>
                    <div className="text-white font-romantic text-base font-semibold">
                        {res.name_guest}
                    </div>
                    {/* <div className="text-white text-base font-romantic">
                        {res.presence == 1 ? "Hadir" : "Tidak Hadir"}
                    </div> */}
                    <div className="Line2 w-full border-t border-white"></div>
                </div>
                ))
                ) : (
                <div className=" gap-2 w-full h-fit px-3 p-5 shadow-slate-200 shadow-md mb-5 rounded-xl">
                    <div className="text-white font-romantic text-base">
                        Ayo Kirim Pesan Sekarang, Kamu Akan Jadi Yang Pertama
                    </div>
                    <div className="text-white font-romantic text-base font-semibold">
                        Nama Kamu
                    </div>
                    <div className="text-white text-base font-romantic">
                        Kehadiran
                    </div>
                    <div className="Line2 w-full border-t border-white"></div>
                </div>
                )}
            </div>
        </section>
        </Observer>
    </section>
)
}