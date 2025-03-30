"use client";
import { useState, useEffect } from "react";

export default function Front({data, guestName, onOpenNextSections}:any) {
    const [nameLeft, setNameLeft] = useState("");
    const [nameRight, setNameRight] = useState("");
    const [nameAliasLeft, setNameAliasLeft] = useState("");
    const [nameAliasRight, setNameAliasRight] = useState("");
    const [newGuestName, setNewGuestName] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
         if (guestName) {
             setNewGuestName(guestName.split('#') ? guestName.split('#')[0] : guestName);
         }
     }, [guestName])              
      
    useEffect(() => {
        const fetchData = async () => {
            try {
                const nameLeft = data?.brideGroomLeft && (data.brideGroomLeft[0].name_male ? data.brideGroomLeft[0].name_male : data.brideGroomLeft[0].name_female)?.split(" ");
                const nameRight = data?.brideGroomRight && (data.brideGroomRight[0].name_male ? data.brideGroomRight[0].name_male : data.brideGroomRight[0].name_female)?.split(" ");
                setNameLeft(nameLeft ? nameLeft[0] : "");
                setNameRight(nameRight ? nameRight[0] : "");
                setNameAliasLeft(data?.brideGroomLeft[0]?.name_alias);
                setNameAliasRight(data?.brideGroomRight[0]?.name_alias);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
      
        fetchData();
    }, [data]);

    const handleOpenInvitation = () => {
        setIsAnimating(true);
        setTimeout(() => {
            onOpenNextSections();
        }, 2000);
    };

    return (
        <section className='relative w-full min-h-screen bg-transparent bg-cover bg-center bg-no-repeat translate overflow-hidden' style={{ backgroundImage: 'url(/img/bg-1.jpg)' }}>
            <div className="w-full min-h-screen opacity-50 bg-black top-0 left-0 absolute"></div>
            
            {/* Left gate - Javanese style */}
            <div className={`absolute top-0 left-0 w-1/2 h-full bg-[#2E1A1E] z-30 transition-transform duration-[1.8s] ease-in-out ${isAnimating ? '-translate-x-full' : 'translate-x-0'}`}>
                <div className="absolute inset-0 border-r-4 border-[#D4AF37]"></div>
                <div className="absolute inset-0 opacity-30" style={{ 
                    backgroundImage: 'url(/img/javanese-batik.png)', 
                    backgroundSize: 'cover',
                    backgroundRepeat: 'repeat'
                }}></div>
                <div className="absolute bottom-20 right-20 w-48 h-48 opacity-70" style={{ 
                    backgroundImage: 'url(/img/wayang.png)', 
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-32 w-8">
                    <div className="w-full h-full bg-[#D4AF37] rounded-l-lg flex items-center justify-center">
                        <div className="w-2 h-16 bg-[#2E1A1E] rounded-full"></div>
                    </div>
                </div>
            </div>
            
            {/* Right gate - Padang/Minangkabau style */}
            <div className={`absolute top-0 right-0 w-1/2 h-full bg-[#2E1A1E] z-30 transition-transform duration-[1.8s] ease-in-out ${isAnimating ? 'translate-x-full' : 'translate-x-0'}`}>
                <div className="absolute inset-0 border-l-4 border-[#D4AF37]"></div>
                <div className="absolute inset-0 opacity-30" style={{ 
                    backgroundImage: 'url(/img/minang-pattern.png)', 
                    backgroundSize: 'cover',
                    backgroundRepeat: 'repeat'
                }}></div>
                <div className="absolute top-20 left-20 w-48 h-32 opacity-70" style={{ 
                    backgroundImage: 'url(/img/rumah-gadang.png)', 
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-32 w-8">
                    <div className="w-full h-full bg-[#D4AF37] rounded-r-lg flex items-center justify-center">
                        <div className="w-2 h-16 bg-[#2E1A1E] rounded-full"></div>
                    </div>
                </div>
            </div>
            
            {/* Gate top decoration - combines both cultures */}
            <div className="absolute top-0 left-0 w-full h-16 bg-[#D4AF37] z-31 flex items-center justify-center">
                <div className="text-[#2E1A1E] text-center font-serif tracking-widest">
                    ꧋ ꦱꦸꦒꦼꦁꦱꦸꦒꦼꦁꦥꦥꦁꦒꦶꦃꦲꦤ꧀ ꧋
                </div>
            </div>
            
            {/* Content section */}
            <div className="absolute w-full h-full bottom-0 z-20 py-28 mt-auto">
                <div className="w-full h-full flex flex-col justify-center text-white">
                    <div className="w-full h-auto">
                        <img src="https://invitingart.id/wp-content/uploads/2022/06/blank.png" alt="" loading="lazy" />
                    </div>
                    <div className="w-auto h-auto text-center font-quicksand tracking-[1px] text-[15px] opacity-80 md:text-2xl lg:text-[15px]">
                        THE WEDDING OF
                    </div>
                    <div className="w-auto h-auto text-center tracking-[3.7px] font-qageto text-[30px] md:text-6xl lg:text-[40px] text-white opacity-95"> 
                        {nameAliasLeft ? nameAliasLeft : nameLeft ? nameLeft: " "} & {nameAliasRight ? nameAliasRight : nameRight ? nameRight : " "}
                    </div>
                    <div className="w-auto h-auto text-center text-[10px] text-white opacity-95 md:text-2xl lg:text-[15px] md:mt-4 xl:mt-0">
                        Kepada Yth :
                    </div>
                    <div className="w-auto h-auto text-center text-[24px] mt-2 font-newsreader text-white opacity-95 md:text-5xl lg:text-[26px] md:mt-4 xl:mt-2">
                        {newGuestName ? newGuestName : ""}
                    </div>
                    <a className="mt-8 text-center w-full h-auto cursor-pointer" onClick={handleOpenInvitation}>
                        <button className="border hover:border-[#D4AF37] border-solid tracking-[1px] bg-black hover:bg-[#2E1A1E] rounded-xl p-2 text-[13px] font-quicksand opacity-95 text-white font-semibold hover:text-[#D4AF37] transition-all duration-300 md:text-2xl lg:text-[13px]">
                            <span>
                                <i className="fa fa-envelope-open mr-2 z-20"></i>
                            </span>
                            Open Invitation
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
}
