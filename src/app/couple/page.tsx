"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Observer from "next@js/app/component/observer/observer-up";
import Observer2 from "next@js/app/component/observer/observer-moveLeft";
import Observer3 from "next@js/app/component/observer/observer-moveRight";
import Observer4 from "next@js/app/component/observer/observer-zoomIn";

export default function Couple({data}:any) {
const [socmedLeft, setSocmedLeft] = useState<any>([]);
    const [socmedRight, setSocmedRight] = useState<any>([]);
        const [defaultCaption2, setdefaultCaption2] = useState("");
        const [caption2, setCaption2] = useState("");
        useEffect(() => {
        const fetchData = async () => {
        try {
            // Validasi data.captions sebelum mapping
            if (Array.isArray(data?.captions)) {
                data.captions.forEach((res: any) => {
                    if (res.category_type === 2) {
                        setCaption2(res.description);
                    }
                });
            }
            
            // Validasi data.defaultCaption sebelum mapping
            if (Array.isArray(data?.defaultCaption)) {
                data.defaultCaption.forEach((res: any) => {
                    if (res.category_type === 2 && res.is_default === 1) {
                        setdefaultCaption2(res.description);
                    }
                });
            }
            
            // Validasi data.socmed sebelum filter
            if (Array.isArray(data?.socmed)) {
                const leftSocmed = data.socmed.filter((res:any) => res.position === 'left');
                setSocmedLeft(leftSocmed.length > 0 ? leftSocmed[0] : {});
                
                const rightSocmed = data.socmed.filter((res:any) => res.position === 'right');
                setSocmedRight(rightSocmed.length > 0 ? rightSocmed[0] : {});
            }
        } catch (error) {
            console.log("Error in Couple component:", error);
        }
        };
        fetchData();
        }, [data]);

        // Validasi socmed sebelum mengakses properti
        const leftClassNames = socmedLeft?.platform === 'Instagram' ? 'fa-instagram' : 
                              socmedLeft?.platform === 'Facebook' ? 'fa-facebook' : 'fa-twitter';
        const rightClassNames = socmedRight?.platform === 'Instagram' ? 'fa-instagram' : 
                               socmedRight?.platform === 'Facebook' ? 'fa-facebook' : 'fa-twitter';        return (
        <>
            <div className="min-h-screen bg-cover text-white bg-center py-8 px-5 lg:max-w-4xl mx-auto" id="couple"
                style={{ backgroundImage:'url(/img/bg-2.jpg)' }}>
                <div className="w-full h-full text-center font-quicksand py-8 px-5">
                    <Observer3>
                        <h1 className="text-4xl text-[#D4AF37] capitalize pb-8" style={{ fontFamily: `${data?.fontTitle ? data?.fontTitle?.font_title : "romantic"}` }}>
                            Kedua Mempelai
                        </h1>
                    </Observer3>
                    <div className="text-center text-xl mb-12 text-[#D4AF37] w-full" style={{ fontFamily: `${data?.fontContent ? data?.fontContent?.font_content : "Redressed"}` }}>
                        <div className="mx-5">
                            <Observer>
                                <p>
                                    {caption2 ? caption2 : defaultCaption2}
                                </p>
                            </Observer>
                        </div>
                    </div>

                    {/* Layout baru vertikal sesuai referensi */}
                    <div className="flex flex-col items-center gap-16 px-4 max-w-3xl mx-auto">
                        {/* Pengantin Wanita */}
                        <Observer2>
                            <div className="flex flex-col items-center w-full max-w-md">                                <div className="mb-8 relative">                                    {/* Container utama dengan posisi relative */}
                                    <div className="w-[400px] h-[450px] relative ml-[-30px]">
                                        {/* Komponen foto pengantin (independent) */}
                                        <div className="absolute top-[10%] left-[15%] w-[70%] h-[80%] z-0" style={{ zIndex: 0 }}>
                                            {/* Container oval untuk foto */}
                                            <div className="w-full h-full overflow-hidden rounded-[100px]" style={{ borderRadius: '100px / 140px' }}>
                                                <img 
                                                    src={`${data?.brideGroomLeft && data.brideGroomLeft.length > 0 
                                                        ? (data.brideGroomLeft[0].image_female || data.brideGroomLeft[0].image_male) 
                                                        : '' }`}
                                                    className="w-full h-full object-cover object-center md:object-[50%_40%] lg:object-[50%_35%]"
                                                    alt="Pengantin Wanita" 
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Komponen bingkai dekoratif (independent) */}
                                        <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 10 }}>
                                            <img 
                                                src="/img/LeftImagesBride.png" 
                                                className="w-full h-full" 
                                                alt="Frame Dekoratif Wanita"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-[#D4AF37] font-bloverly text-4xl mb-2">
                                        {data?.brideGroomLeft && data.brideGroomLeft.length > 0 
                                        ? (data.brideGroomLeft[0].name_female || data.brideGroomLeft[0].name_male) 
                                        : ''}
                                    </h3>
                                    <div className="text-[#D4AF37] font-redressed text-lg mb-4">
                                        Putri dari
                                        <br />Bapak {data?.brideGroomLeft && data.brideGroomLeft.length > 0 
                                        ? (data.brideGroomLeft[0].father_female || data.brideGroomLeft[0].father_male) 
                                        : ''}
                                        <br />dan Ibu {data?.brideGroomLeft && data.brideGroomLeft.length > 0 
                                        ? (data.brideGroomLeft[0].mother_female || data.brideGroomLeft[0].mother_male) 
                                        : ''}
                                    </div>
                                    <div className="my-2">
                                        <a href={socmedLeft?.url}
                                            className="inline-block bg-transparent hover:bg-[#D4AF37]/20 rounded-full p-2 text-[#D4AF37]"
                                            target="_blank">
                                            <span>
                                                <i className={`fa-brands ${leftClassNames} mr-1`}></i>
                                                {socmedLeft?.username}
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Observer2>

                        {/* Simbol & di tengah */}
                        <div className="text-[#D4AF37] text-6xl font-romantic my-4">&</div>

                        {/* Pengantin Pria */}
                        <Observer3>
                            <div className="flex flex-col items-center w-full max-w-md">                               
                                 <div className="mb-8 relative">
                                    <div className="w-[400px] h-[450px] relative mr-[-30px]">
                                        {/* Komponen foto pengantin (independent) */}
                                        <div className="absolute top-[10%] left-[15%] w-[70%] h-[80%] z-0" style={{ zIndex: 0 }}>
                                            {/* Container oval untuk foto */}
                                            <div className="w-full h-full overflow-hidden rounded-[100px]" style={{ borderRadius: '100px / 140px' }}>
                                                <img 
                                                    src={`${data?.brideGroomRight && data.brideGroomRight.length > 0 
                                                        ? (data.brideGroomRight[0].image_male || data.brideGroomRight[0].image_female) 
                                                        : '' }`}
                                                    className="w-full h-full object-cover object-center md:object-[50%_40%] lg:object-[45%_35%]"
                                                    alt="Pengantin Pria" 
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Komponen bingkai dekoratif (independent) */}
                                        <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 10 }}>
                                            <img 
                                                src="/img/RightImagesBride.png" 
                                                className="w-full h-full" 
                                                alt="Frame Dekoratif Pria"
                                            />
                                    </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-[#D4AF37] font-bloverly text-4xl mb-2">
                                        {data?.brideGroomRight && data.brideGroomRight.length > 0 
                                        ? (data.brideGroomRight[0].name_male || data.brideGroomRight[0].name_female) 
                                        : ''}
                                    </h3>
                                    <div className="text-center font-redressed text-[#D4AF37] text-lg mb-4">
                                        Putra dari
                                        <br />Bapak {data?.brideGroomRight && data.brideGroomRight.length > 0 
                                        ? (data.brideGroomRight[0].father_male || data.brideGroomRight[0].father_female) 
                                        : ''}
                                        <br />dan Ibu {data?.brideGroomRight && data.brideGroomRight.length > 0 
                                        ? (data.brideGroomRight[0].mother_male || data.brideGroomRight[0].mother_female) 
                                        : ''}
                                    </div>
                                    <div className="my-2">
                                        <a href={socmedRight?.url}
                                            className="inline-block bg-transparent hover:bg-[#D4AF37]/20 rounded-full p-2 text-[#D4AF37]"
                                            target="_blank">
                                            <span>
                                                <i className={`fa-brands ${rightClassNames} mr-1`}></i>
                                                {socmedRight?.username}
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Observer3>
                    </div>
                </div>
            </div>
        </>
        )
        }