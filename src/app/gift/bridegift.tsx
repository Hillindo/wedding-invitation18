"use client";
import { Button, Modal } from "antd";
import { useState, useEffect } from 'react';
import CopyButton from "next@js/app/component/copybutton/page";
import Observer from "next@js/app/component/observer/observer-up";
import Observer2 from "next@js/app/component/observer/observer-moveLeft";
import Observer3 from "next@js/app/component/observer/observer-moveRight";
import Observer4 from "next@js/app/component/observer/observer-zoomIn";

export default function BrideGift ({data}:any) {
  const [brideGift, setBrideGift] = useState<any>("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setBrideGift(data?.brideGift);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [data]);

    return (
      <>
      {brideGift != null ? (
    <Observer4>
   <section className="w-full pt-28 pb-40 lg:max-w-md mx-auto">
     <div className="bg-[#051E31] rounded-3xl shadow-slate-800 shadow-md relative w-3/4 mx-auto lg:px-5 border-white flex z-20 border">
     <div className=" rounded-3xl left-0 bg-bottom bg-no-repeat bg-cover bg-blend-multiply h-full w-full absolute z-10 bg-[#051E31]" style={{backgroundImage: `url('/img/bg-2.jpg')`}}></div>
     <div className="w-full flex flex-wrap justify-center items-center text-center py-5 z-50">
        <div className="w-full">
            <div className="font-amiri text-2xl text-white mb-5 text-center">
                Send Gift
            </div>
            <div className="text-left flex gap-2 text-white font-quicksand text-lg font-semibold mx-5">
                Alamat
                <CopyButton text={`${brideGift?.address}`} color={"white"} hovercolor={"[#051E31]"} warn={"Alamat"} />
            </div>
            <div className="text-left font-quicksand text-base mb-5 mx-5 text-white">    
            {brideGift?.address}			
            </div>
            <div className="text-left text-white font-quicksand flex gap-2 text-lg font-semibold mx-5">
                Nama Penerima
                <CopyButton text={`${brideGift?.receive_name}`} color={"white"} hovercolor={"[#051E31]"} warn={"Nama Penerima"}/>
            </div>
            <div className="text-left font-quicksand text-base mb-5 mx-5 text-white">    
            {brideGift?.receive_name}			
            </div>
        </div>
        </div>
     </div>
   </section>
    </Observer4>
   ):null}
   </>
        )
}