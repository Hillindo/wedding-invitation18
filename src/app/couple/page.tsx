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
            <div className="h-fit bg-cover text-white bg-center py-8 px-5 lg:max-w-4xl mx-auto" id="couple"
                style={{ backgroundImage:'url(/img/bg-2.jpg)' }}>
                <div className="w-full h-full text-center font-quicksand py-8 px-5">
                    <Observer3>
                        <h1 className="text-4xl text-[#D4AF37] capitalize pb-8" style={{ fontFamily: `${data?.fontTitle ? data?.fontTitle?.font_title : "romantic"}` }}>
                            Kedua Mempelai
                        </h1>
                    </Observer3>
                    <div className="text-center text-xl mb-8 text-[#D4AF37] w-full" style={{ fontFamily: `${data?.fontContent ? data?.fontContent?.font_content : "Redressed"}` }}>
                        <div className="mx-5">
                            <Observer>
                                <p>
                                    {caption2 ? caption2 : defaultCaption2}
                                </p>
                            </Observer>
                        </div>
                    </div>

                    {/* Layout baru dengan dua kolom (flex) */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-4">
                        {/* Kolom kiri - Pengantin Wanita */}
                        <div className="w-full md:w-[45%]">
                            <Observer2>
                                <div className="mb-5 flex justify-center">
                                    <img src={`${data?.brideGroomLeft && data.brideGroomLeft.length > 0 
                                        ? (data.brideGroomLeft[0].image_female || data.brideGroomLeft[0].image_male) 
                                        : '' }`}
                                        className="border-solid border-2 border-[#D4AF37] rounded-[1000px] w-[60%] sm:w-[50%] md:w-[60%] bg-white h-[250px] min-[400px]:h-[250px] sm:h-[250px] md:h-[250px] object-cover"
                                        alt="Pengantin Wanita" />
                                </div>
                                <div className="mb-5 w-full">
                                    <div className="flex items-center justify-center flex-col flex-nowrap w-full">
                                        <h3 className="text-[#D4AF37] mb-1 text-center text-3xl font-bloverly">
                                            {data?.brideGroomLeft && data.brideGroomLeft.length > 0 
                                            ? (data.brideGroomLeft[0].name_female || data.brideGroomLeft[0].name_male) 
                                            : ''}
                                        </h3>
                                        <div className="text-[#D4AF37] font-redressed text-center text-lg">
                                            {data?.brideGroomLeft && data.brideGroomLeft.length > 0 
                                            ? (data.brideGroomLeft[0].name_female ? "Putri" : "Putra") 
                                            : ''} dari Bapak {data?.brideGroomLeft && data.brideGroomLeft.length > 0 
                                            ? (data.brideGroomLeft[0].father_female || data.brideGroomLeft[0].father_male) 
                                            : ''}
                                            <br /> dan Ibu {data?.brideGroomLeft && data.brideGroomLeft.length > 0 
                                            ? (data.brideGroomLeft[0].mother_female || data.brideGroomLeft[0].mother_male) 
                                            : ''}
                                        </div>
                                        <div className="my-4">
                                            <a href={socmedLeft?.url}
                                                className="bg-transparent hover:bg-[#D4AF37]/20 rounded-full p-3 text-[#D4AF37]"
                                                target="_blank">
                                                <span>
                                                    <i className={`fa-brands ${leftClassNames} mr-2`}></i>
                                                    {socmedLeft?.username}
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Observer2>
                        </div>

                        {/* Simbol & di tengah */}
                        <div className="text-[#D4AF37] text-5xl font-romantic mx-4">&</div>

                        {/* Kolom kanan - Pengantin Pria */}
                        <div className="w-full md:w-[45%]">
                            <Observer3>
                                <div className="mb-5 flex justify-center">
                                    <img src={`${data?.brideGroomRight && data.brideGroomRight.length > 0 
                                        ? (data.brideGroomRight[0].image_male || data.brideGroomRight[0].image_female) 
                                        : '' }`}
                                        className="border-solid border-2 border-[#D4AF37] rounded-[1000px] w-[60%] sm:w-[50%] md:w-[60%] bg-white h-[250px] min-[400px]:h-[250px] sm:h-[250px] md:h-[250px] object-cover"
                                        alt="Pengantin Pria" />
                                </div>
                                <div className="mb-5 w-full">
                                    <div className="flex items-center justify-center flex-col flex-nowrap w-full">
                                        <h3 className="text-[#D4AF37] mb-1 text-center text-3xl font-bloverly">
                                            {data?.brideGroomRight && data.brideGroomRight.length > 0 
                                            ? (data.brideGroomRight[0].name_male || data.brideGroomRight[0].name_female) 
                                            : ''}
                                        </h3>
                                        <div className="text-center font-redressed text-[#D4AF37] text-lg">
                                            {data?.brideGroomRight && data.brideGroomRight.length > 0 
                                            ? (data.brideGroomRight[0].name_male ? "Putra" : "Putri") 
                                            : ''} dari Bapak {data?.brideGroomRight && data.brideGroomRight.length > 0 
                                            ? (data.brideGroomRight[0].father_male || data.brideGroomRight[0].father_female) 
                                            : ''}
                                            <br /> dan Ibu {data?.brideGroomRight && data.brideGroomRight.length > 0 
                                            ? (data.brideGroomRight[0].mother_male || data.brideGroomRight[0].mother_female) 
                                            : ''}
                                        </div>
                                        <div className="my-4">
                                            <a href={socmedRight?.url}
                                                className="bg-transparent hover:bg-[#D4AF37]/20 p-3 rounded-full text-[#D4AF37]"
                                                target="_blank">
                                                <span>
                                                    <i className={`fa-brands ${rightClassNames} mr-2`}></i>
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
            </div>
        </>
        )
        }