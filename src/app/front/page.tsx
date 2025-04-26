"use client";
import { useState, useEffect } from "react";
import GateAnimation from "../component/gate/GateAnimation";

export default function Front({data, guestName, onOpenNextSections}:any) {
    const [nameLeft, setNameLeft] = useState("");
    const [nameRight, setNameRight] = useState("");
    const [nameAliasLeft, setNameAliasLeft] = useState("");
    const [nameAliasRight, setNameAliasRight] = useState("");
    const [newGuestName, setNewGuestName] = useState("");
    const [isGateOpen, setIsGateOpen] = useState(false);

    // Handle gate opening
    const handleOpenGate = () => {
        setIsGateOpen(true);
    };

    // Handle when gate animation is complete
    const handleGateAnimationComplete = () => {
        // This can be empty as we'll keep showing the content
    };

    useEffect(() => {
        if (guestName) {
            setNewGuestName(guestName.split('#') ? guestName.split('#')[0] : guestName);
        }
    }, [guestName]);
      
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

    // Function to handle opening next sections after clicking "Open Invitation"
    const handleOpenInvitation = () => {
        if (isGateOpen) {
            onOpenNextSections();
        } else {
            handleOpenGate();
        }
    };

    return (
        <GateAnimation 
            isOpen={isGateOpen} 
            onAnimationComplete={handleGateAnimationComplete}
            leftColor="#8D7B68"  // A warm brown tone for the left gate
            rightColor="#A4907C"  // A slightly lighter brown for the right gate
        >
            <section 
                className='relative w-full min-h-screen bg-transparent bg-cover bg-center bg-no-repeat' 
                style={{ backgroundImage: 'url(/img/bg-1.jpg)' }}
                onClick={!isGateOpen ? handleOpenGate : undefined}  // Click anywhere to open the gates initially
            >
                <div className="w-full min-h-screen opacity-50 bg-black top-0 left-0"></div>
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
                        <a className="mt-8 text-center w-full h-auto" onClick={handleOpenInvitation}>
                            <button className="border hover:border-black border-solid tracking-[1px] bg-black hover:bg-white rounded-xl p-2 text-[13px] font-quicksand opacity-95 text-white font-semibold hover:text-black md:text-2xl lg:text-[13px]">
                                <span>
                                    <i className="fa fa-envelope-open mr-2 z-20"></i>
                                </span>
                                {isGateOpen ? "Open Invitation" : "Tap to Open"}
                            </button>
                        </a>
                    </div>
                </div>
            </section>
        </GateAnimation>
    );
}
