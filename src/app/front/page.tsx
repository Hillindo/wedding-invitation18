"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GateAnimation from "../component/gate/GateAnimation";

export default function Front({data, guestName, onOpenInvitation}:any) {
    const [nameLeft, setNameLeft] = useState("Nazhira"); // Statis: nama mempelai pria
    const [nameRight, setNameRight] = useState("Hillga"); // Statis: nama mempelai wanita
    const [nameAliasLeft, setNameAliasLeft] = useState("Nazhira"); // Statis: nama alias mempelai pria
    const [nameAliasRight, setNameAliasRight] = useState("Hillga"); // Statis: nama alias mempelai wanita
    const [newGuestName, setNewGuestName] = useState("Tamu Undangan"); // Statis: nama tamu
    const [isGateOpen, setIsGateOpen] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    // Animasi keyframes untuk bunga
    const flowerAnimationLeft = {
        animate: {
            x: [0, -5, 0, -2, 0],
            rotate: [-5, -3, -5, -7, -5],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const flowerAnimationRight = {
        animate: {
            x: [0, 5, 0, 2, 0],
            rotate: [5, 3, 5, 7, 5],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

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
                if (data && data.brideGroomLeft && data.brideGroomRight) {
                    const nameLeft = data?.brideGroomLeft[0] && (data?.brideGroomLeft[0].name_male ? data.brideGroomLeft[0].name_male : data.brideGroomLeft[0].name_female)?.split(" ");
                    const nameRight = data?.brideGroomRight[0] && (data?.brideGroomRight[0].name_male ? data?.brideGroomRight[0].name_male : data?.brideGroomRight[0].name_female)?.split(" ");
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
                        className='relative w-full h-screen bg-transparent bg-cover bg-center bg-no-repeat lg:max-w-md mx-auto no-scroll overflow-hidden'
                        style={{ backgroundImage: `url('/img/bg-2.jpg')` }}
                    >
                        {/* Corner ornaments - TOP RIGHT */}
                        <div className="absolute top-0 right-0 w-[37.5%] h-auto z-10">
                            <img 
                                src="/img/bg-10.png" 
                                alt="Corner decoration" 
                                className="w-full h-auto"
                            />
                        </div>
                        
                        {/* Corner ornaments - TOP LEFT */}
                        <div className="absolute top-0 left-0 w-[37.5%] h-auto z-10 transform scale-x-[-1]">
                            <img 
                                src="/img/bg-10.png" 
                                alt="Corner decoration" 
                                className="w-full h-auto"
                            />
                        </div>
                        
                        {/* Flower decorations - LEFT - Using viewport units for responsive positioning */}
                        <motion.div
                                className="w-full h-auto top-[600px] absolute left-[-100px]"
                                // style={{ top: '75vh' }}
                                animate={{
                                    x: [0, 9, 0, -4, 0],
                                    transition: {
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5
                                    }
                                }}
                            >
                                <img src="/img/flower-front/Bunga7.png" alt="Flower decoration" 
                                    className="w-32 md:w-40 " style={{ transform: 'rotate(35deg)' }}
                                        />
                        </motion.div>
                       <motion.div 
                                className="w-full h-auto top-[500px] absolute left-[-100px]"
                                animate={{
                                    x: [0, 10, 0, -5, 0],
                                    transition: {
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.3
                                    }
                                }}
                            >
                                <img src="/img/flower-front/Bunga1.png" alt="Flower decoration" 
                                    className="w-32 md:w-40 " style={{ transform: 'rotate(35deg)' }}
                                        />
                        </motion.div>
                        <motion.div 
                                className="w-full h-auto top-[350px] absolute left-[-100px]"
                                animate={{
                                    x: [0, 10, 0, -5, 0],
                                    transition: {
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.3
                                    }
                                }}
                            >
                                <img src="/img/flower-front/Bunga4.png" alt="Flower decoration" 
                                    className="w-32 md:w-40 " style={{ transform: 'rotate(35deg)' }}
                                        />
                        </motion.div>
                        <motion.div 
                                className="w-full h-auto top-[300px] absolute left-[-100px]"
                                animate={{
                                    x: [0, 10, 0, -5, 0],
                                    transition: {
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.3
                                    }
                                }}
                            >
                                <img src="/img/flower-front/Bunga6.png" alt="Flower decoration" 
                                    className="w-32 md:w-40 " style={{ transform: 'rotate(35deg)' }}
                                        />
                        </motion.div>
                        
                        {/* Flower decorations - RIGHT */}
                       
                        <motion.div 
                                className="top-[300px] absolute right-[-80px]"
                                animate={{
                                    x: [0, 10, 0, -5, 0],
                                    transition: {
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.3
                                    }
                                }}
                            >
                                <img src="/img/flower-front/Bunga2.png" alt="Flower decoration" 
                                    className="w-32 md:w-40 " style={{ transform: 'rotate(340deg)' }}
                                        />
                        </motion.div>
                        <motion.div 
                            className="top-[450px] absolute right-[-80px]"
                            style={{ transformOrigin: "right center" }}
                            animate={flowerAnimationRight.animate}
                        >
                            <img src="/img/flower-front/Bunga1.png" alt="Flower decoration" className="w-32 md:w-40 " style={{ transform: 'rotate(340deg)' }} />
                        </motion.div>
                        <motion.div 
                            className="top-[550px] absolute right-[-80px]" 
                            style={{ transformOrigin: "right center" }}
                            animate={{
                                x: [0, 3, 0, 5, 0],
                                rotate: [-10, -8, -10, -12, -10],
                                transition: {
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1
                                }
                            }}
                        >
                            <img src="/img/flower-front/Bunga5.png" alt="Flower decoration" className="w-32 md:w-40 " style={{ transform: 'rotate(340deg)' }} />
                        </motion.div>
                        
                        {/* Flower decorations - BOTTOM dengan gambar dirotasi horizontal */}
                        <div className="absolute left-0 bottom-[-95px] z-10 w-full">
                            <div className="relative h-40">
                                <motion.div 
                                    className="absolute left-[-30px] bottom-[10px]"
                                    animate={{
                                        x: [0, -10, 0, -4, 0],
                                        y: [0, 1, 0],
                                        transition: {
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                >
                                    <img src="/img/flower-front/Bunga2.png" alt="Flower decoration" 
                                        className="w-32 md:w-40" 
                                        style={{ transform: 'rotate(30deg)' }} />
                                </motion.div>

                                <motion.div 
                                    className="absolute left-[40px] bottom-[-20px]"
                                    animate={{
                                        x: [0, 10, 0, 3, 0],
                                        y: [0, -1, 0],
                                        transition: {
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 0.2
                                        }
                                    }}
                                >
                                    <img src="/img/flower-front/Bunga7.png" alt="Flower decoration" 
                                        className="w-32 md:w-40" 
                                        style={{ transform: 'rotate(10deg)' }}
                                       />
                                </motion.div>

                                <motion.div 
                                    className="absolute left-1/2 bottom-0 left-[120px] bottom-[-80px]"
                                    animate={{
                                        y: [0, -2, 0, -3, 0],
                                        transition: {
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                >
                                    <img src="/img/flower-front/Bunga3.png" alt="Flower decoration" 
                                        className="w-40 md:w-48"
                                         />
                                </motion.div>

                                <motion.div 
                                    className="absolute right-[50px] bottom-[10px]"
                                    animate={{
                                        x: [0, 10, 0, 3, 0],
                                        transition: {
                                            duration: 7,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 0.6
                                        }
                                    }}
                                >
                                    <img src="/img/flower-front/Bunga6.png" alt="Flower decoration" 
                                        className="w-32 md:w-40"
                                         />
                                </motion.div>

                                <motion.div 
                                    className="absolute right-[-40px] bottom-10"
                                    animate={{
                                        x: [0, 10, 0, -5, 0],
                                        transition: {
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 0.3
                                        }
                                    }}
                                >
                                    <img src="/img/flower-front/Bunga1.png" alt="Flower decoration" 
                                        className="w-32 md:w-40" style={{ transform: 'rotate(-30deg)' }}
                                         />
                                </motion.div>
                            </div>
                        </div>
                        
                        {/* Frame Border */}
                        <div className="absolute inset-0 flex items-center justify-center z-10 px-8 py-12">
                            <img 
                                src="/img/Asset1.png" 
                                alt="Frame decoration" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                        
                        {/* Main content container with consistent positioning across all screen sizes */}
                        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4" style={{ paddingBottom: '8vh' }}>
                            <div className="w-full flex flex-col items-center text-white max-w-sm mx-auto">
                                {/* Rumah Gadang with consistent proportional sizing */}
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="w-full h-auto mt-[3vh]"
                                >
                                    <img
                                        src="/img/rumah-gadang.png"
                                        alt="Rumah Gadang"
                                        loading="lazy"
                                        className="mx-auto block w-[45%] max-w-[180px]"
                                    />
                                </motion.div>
                                
                                {/* Text content with responsive sizing */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-auto h-auto text-center font-quicksand tracking-[1px] opacity-80"
                                    style={{ 
                                        color: '#e1ba60',
                                        fontSize: 'clamp(12px, 3vw, 14px)'
                                    }}>
                                        THE WEDDING OF
                                    </div>
                                    <div className="w-auto h-auto text-center tracking-[3.7px] font-roxborough-cf opacity-95 mt-2"
                                    style={{ 
                                        color: '#e1ba60',
                                        fontSize: 'clamp(24px, 7vw, 33px)'
                                    }}>
                                        {(nameAliasLeft ? nameAliasLeft : nameLeft ? nameLeft : " ").toUpperCase()} <br/> 
                                        & <br/>
                                        {(nameAliasRight ? nameAliasRight : nameRight ? nameRight : " ").toUpperCase()} 
                                    </div>
                                    <div className="mt-[2vh]">
                                        <div className="w-auto h-auto text-center opacity-95"
                                        style={{ 
                                            color: '#e1ba60',
                                            fontSize: 'clamp(10px, 2.5vw, 12px)'
                                        }}>
                                            Kepada Yth :
                                        </div>
                                        <div className="w-auto h-auto text-center opacity-95"
                                        style={{ 
                                            color: '#e1ba60',
                                            fontSize: 'clamp(10px, 2.5vw, 12px)'
                                        }}>
                                            Bapak/Ibu/Saudara/i
                                        </div>
                                    </div>
                                    <div className="w-auto h-auto text-center mt-[1vh] font-newsreader opacity-95"
                                    style={{ 
                                        color: '#e1ba60',
                                        fontSize: 'clamp(18px, 5vw, 24px)'
                                    }}>
                                        {newGuestName ? newGuestName : ""}
                                    </div>
                                    <div className="mt-[1vh]">
                                        <div className="w-auto text-center opacity-95"
                                        style={{ 
                                            color: '#e1ba60',
                                            fontSize: 'clamp(10px, 2.5vw, 12px)'
                                        }}>
                                            mohon maaf jika ada kesalahan
                                        </div>
                                        <div className="w-auto text-center opacity-95"
                                        style={{ 
                                            color: '#e1ba60',
                                            fontSize: 'clamp(10px, 2.5vw, 12px)'
                                        }}>
                                           dalam penulisan nama / gelar
                                        </div>
                                    </div>
                                </motion.div>
                                
                                {/* Button with consistent positioning */}
                                <motion.a
                                    className="text-center w-full h-auto cursor-pointer"
                                    style={{ marginTop: '2vh' }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2 }}
                                    onClick={handleOpenInvitation}
                                >
                                    <button className="border hover:border-black border-solid tracking-[1px] bg-black hover:bg-white rounded-xl font-quicksand opacity-95 text-white font-semibold hover:text-black"
                                    style={{
                                        padding: 'clamp(6px, 2vw, 8px) clamp(12px, 4vw, 16px)',
                                        fontSize: 'clamp(12px, 3vw, 14px)'
                                    }}>
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