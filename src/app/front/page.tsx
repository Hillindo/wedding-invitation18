"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Front({data, guestName, onOpenNextSections}:any) {
    const [nameMale, setNameMale] = useState("");
        const [nameFemale, setNameFemale] = useState("");
        const [newGuestName, setNewGuestName] = useState("")

  useEffect(() => {
         if (guestName) {
             setNewGuestName(guestName.split('#') ? guestName.split('#')[0] : guestName);
             
         }
     }, [guestName])              
      
        useEffect(() => {
          const fetchData = async () => {
              try {
              const nameMale = data.nameMale?.name_male?.split(" ");
              const nameFemale = data.nameFemale?.name_female?.split(" ");
              setNameMale(nameMale ? nameMale[0] : "");
              setNameFemale(nameFemale ? nameFemale[0] : "");
            } catch (error) {
              console.error('Error fetching data:', error);
            
            }
          };
      
          fetchData();
      }, [data]);
return (
<section className='relative w-full min-h-screen bg-transparent bg-cover bg-center bg-no-repeat translate' style={{ backgroundImage: 'url(/img/bg-1.jpg)' }}>
<div className="w-full min-h-screen opacity-50 bg-black top-0 left-0 "></div>
<div className="absolute w-full h-full bottom-0 z-20 py-28 mt-auto">
                    <div className="w-full h-full flex flex-col justify-center text-white">
                        <div className="w-full h-auto">
                            <Image src="https://invitingart.id/wp-content/uploads/2022/06/blank.png" alt="" loading="lazy" />
                        </div>
                        <div className="w-auto h-auto text-center font-quicksand tracking-[1px] text-[15px] opacity-80 md:text-2xl lg:text-[15px]">
                            THE WEDDING OF
                        </div>
                        <div className="w-auto h-auto text-center tracking-[3.7px] font-qageto text-[30px] md:text-6xl lg:text-[40px] text-white opacity-95"> 
                        {nameMale ? nameMale: " "} & {nameFemale ? nameFemale : " "}
                        </div>
                        <div className="w-auto h-auto text-center text-[10px] text-white opacity-95 md:text-2xl lg:text-[15px] md:mt-4 xl:mt-0">
                            Kepada Yth :
                        </div>
                        <div className="w-auto h-auto text-center text-[24px] mt-2 font-newsreader text-white opacity-95 md:text-5xl lg:text-[26px] md:mt-4 xl:mt-2">
                        {newGuestName ? newGuestName : ""}
                        </div>
                        <a className="mt-8 text-center w-full h-auto" onClick={onOpenNextSections}>
                            <button className=" border hover:border-black border-solid tracking-[1px] bg-black hover:bg-white rounded-xl p-2 text-[13px] font-quicksand opacity-95 text-white font-semibold hover:text-black md:text-2xl lg:text-[13px]">
                                <span>
                                    <i className="fa fa-envelope-open mr-2 z-20"></i>
                                </span>
                                Open Invitation
                            </button>
                        </a>
                    </div>

                </div>
</section> )
}