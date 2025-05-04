"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GateAnimation from "../component/gate/GateAnimation";

export default function Front({data, guestName, onOpenInvitation}:any) {
    const [nameLeft, setNameLeft] = useState("");
    const [nameRight, setNameRight] = useState("");
    const [nameAliasLeft, setNameAliasLeft] = useState("");
    const [nameAliasRight, setNameAliasRight] = useState("");
    const [newGuestName, setNewGuestName] = useState("");
    const [isGateOpen, setIsGateOpen] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        setIsGateOpen(true);
    }, []);

    useEffect(() => {
        if (guestName) {
            setNewGuestName(guestName.split('#') ? guestName.split('#')[0] : guestName);
        }
    }, [guestName]);
      
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Tambahkan pengecekan untuk data sebelum mengakses propertinya
                if (data && data.brideGroomLeft && data.brideGroomRight) {
                    const nameLeft = data?.brideGroomLeft[0] && (data?.brideGroomLeft[0].name_male ? data.brideGroomLeft[0].name_male : data.brideGroomLeft[0].name_female)?.split(" ");
                    const nameRight = data?.brideGroomRight[0] && (data?.brideGroomRight[0].name_male ? data.brideGroomRight[0].name_male : data.brideGroomRight[0].name_female)?.split(" ");
                    setNameLeft(nameLeft ? nameLeft[0] : "");
                    setNameRight(nameRight ? nameRight[0] : "");
                    setNameAliasLeft(data?.brideGroomLeft[0]?.name_alias || "");
                    setNameAliasRight(data?.brideGroomRight[0]?.name_alias || "");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [data]);

    const handleOpenInvitation = () => {
        setIsLeaving(true);
        setTimeout(() => {
            if (onOpenInvitation) {
                onOpenInvitation();
            }
        }, 300);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isLeaving ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <GateAnimation 
                    isOpen={isGateOpen} 
                    onAnimationComplete={() => {}}
                    leftColor="#8D7B68"
                    rightColor="#A4907C"
                >
                    <section 
                        className='relative w-full min-h-screen bg-transparent bg-cover bg-center bg-no-repeat lg:max-w-md mx-auto' 
                        style={{ backgroundColor: '#001530' }}
                        // Original background image implementation
                        // style={{ backgroundImage: 'url(/img/bg-1.jpg)' }}
                    >
                        {/* <div className="w-full min-h-screen opacity-50 bg-black top-0 left-0 absolute"></div> */}
                        
                        {/* Flower decorations - LEFT */}
                        <div className="absolute left-0 top-1/4 z-10" style={{ transform: 'rotate(-15deg) translateX(-20px)' }}>
                            <img src="/img/flower-front/Bunga1.png" alt="Flower decoration" className="w-32 md:w-40" />
                        </div>
                        <div className="absolute left-0 bottom-1/3 z-10" style={{ transform: 'rotate(10deg) translateX(-15px)' }}>
                            <img src="/img/flower-front/Bunga3.png" alt="Flower decoration" className="w-28 md:w-36" />
                        </div>
                        
                        {/* Flower decorations - RIGHT */}
                        <div className="absolute right-0 top-1/3 z-10" style={{ transform: 'rotate(15deg) translateX(10px)' }}>
                            <img src="/img/flower-front/Bunga2.png" alt="Flower decoration" className="w-32 md:w-40" />
                        </div>
                        <div className="absolute right-0 bottom-1/4 z-10" style={{ transform: 'rotate(-10deg) translateX(15px)' }}>
                            <img src="/img/flower-front/Bunga4.png" alt="Flower decoration" className="w-28 md:w-36" />
                        </div>
                        
                        {/* Flower decorations - BOTTOM */}
                        <div className="absolute left-0 bottom-0 z-10 w-full">
                            <div className="relative h-40 overflow-hidden">
                                {/* Mengubah teknik styling untuk overflow bunga - lebih kompatibel dengan Vercel */}
                                <img src="/img/flower-front/Bunga5.png" alt="Flower decoration" 
                                    className="absolute left-0 w-32 md:w-40" 
                                    style={{ 
                                        transform: 'rotate(-5deg) translateY(40%)', 
                                        bottom: '0'
                                    }} />
                                <img src="/img/flower-front/Bunga6.png" alt="Flower decoration" 
                                    className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-40 md:w-48" />
                                <img src="/img/flower-front/Bunga7.png" alt="Flower decoration" 
                                    className="absolute right-0 bottom-0 w-32 md:w-40" 
                                    style={{ transform: 'rotate(5deg)' }} />
                            </div>
                        </div>
                        
                        <div className="absolute w-full h-full bottom-0 z-20 py-28 mt-auto">
                            <div className="w-full h-full flex flex-col justify-center text-white">
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="w-full h-auto"
                            >
                                <img 
                                    src="/img/rumah-gadang.png" 
                                    alt="Rumah Gadang" 
                                    loading="lazy" 
                                    style={{ maxWidth: "65%", margin: "0 auto", display: "block" }}
                                />
                            </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="space-y-4"
                                >
                                    <div className="w-auto h-auto text-center font-quicksand tracking-[1px] text-[15px] opacity-80 md:text-2xl lg:text-[15px]" 
                                    style={{ color: '#e1ba60' }}>
                                        THE WEDDING OF
                                    </div>
                                    <div className="w-auto h-auto text-center tracking-[3.7px] font-qageto text-[30px] md:text-6xl lg:text-[40px] opacity-95"
                                    style={{ color: '#e1ba60' }}> 
                                        {nameAliasLeft ? nameAliasLeft : nameLeft ? nameLeft: " "} & {nameAliasRight ? nameAliasRight : nameRight ? nameRight : " "}
                                    </div>
                                    <div className="w-auto h-auto text-center text-[10px] opacity-95 md:text-2xl lg:text-[15px] md:mt-4 xl:mt-0"
                                    style={{ color: '#e1ba60' }}>
                                        Kepada Yth :
                                    </div>
                                    <div className="w-auto h-auto text-center text-[24px] mt-2 font-newsreader opacity-95 md:text-5xl lg:text-[26px] md:mt-4 xl:mt-2"
                                    style={{ color: '#e1ba60' }}>
                                        {newGuestName ? newGuestName : ""}
                                    </div>
                                </motion.div>
                                <motion.a 
                                    className="mt-8 text-center w-full h-auto cursor-pointer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2 }}
                                    onClick={handleOpenInvitation}
                                >
                                    <button className="border hover:border-black border-solid tracking-[1px] bg-black hover:bg-white rounded-xl p-2 text-[13px] font-quicksand opacity-95 text-white font-semibold hover:text-black md:text-2xl lg:text-[13px]"
                                    style={{ borderColor: '#e1ba60' }}>
                                        <span>
                                            <i className="fa fa-envelope-open mr-2 z-20"></i>
                                        </span>
                                        Open Invitation
                                    </button>
                                </motion.a>
                            </div>
                        </div>
                    </section>
                </GateAnimation>
            </motion.div>
        </AnimatePresence>
    );
}
