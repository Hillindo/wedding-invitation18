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
        data?.captions?.map((res: any, index: any) => {
        if (res.category_type == 2) {
        setCaption2(res.description);
        }
        });
        data?.defaultCaption?.map((res: any) => {
        if (res.category_type == 2 && res.is_default == 1) {
        setdefaultCaption2(res.description);}});
        const socmedLeft = data?.socmed.filter((res:any) => res.position == 'left')
        setSocmedLeft(socmedLeft ? socmedLeft[0] : [])
        const socmedRight = data?.socmed.filter((res:any) => res.position == 'right')
        setSocmedRight(socmedRight ? socmedRight[0] : [])

        } catch (error) {
        console.log(error);
        }
        };
        fetchData();
        }, [data]);

        const leftClassNames = socmedLeft?.platform === 'Instagram' ? 'fa-instagram' : socmedLeft?.platform ===
        'Facebook' ? 'fa-facebook' : 'fa-twitter';
        const rightClassNames = socmedRight?.platform === 'Instagram' ? 'fa-instagram' : socmedRight?.platform ===
        'Facebook' ? 'fa-facebook' : 'fa-twitter';
        return (
        <>
            <div className=" h-fit bg-cover text-white bg-center py-8 px-5" id="couple"
                style={{ backgroundImage:'url(/img/bg-6.jpg)' }}>
                <div className="w-full h-full bg-[#FDFDFDAD] text-center font-quicksand py-8 px-5 ">
                    <Observer3>
                        <h1 className=" text-4xl text-[#051E31] capitalize pb-12" style={{ fontFamily: `${data?.fontTitle ? data?.fontTitle?.font_title : "romantic"}` }}>
                            Pengantin
                        </h1>
                    </Observer3>
                    <div className="text-center text-xl mb-5 text-black w-full" style={{ fontFamily: `${data?.fontContent ? data?.fontContent?.font_content : "Redressed"}` }}>
                        <div className=" mx-5">
                            <Observer>
                                <p>
                                    {caption2 ? caption2 : defaultCaption2}
                                </p>
                            </Observer>
                        </div>
                    </div>
                    <Observer4>
                        <div className=" mb-5 w-full relative flex justify-center">
                            <img src={`${data?.brideGroomLeft ? (data.brideGroomLeft[0].image_male ?
                                data.brideGroomLeft[0].image_male : data.brideGroomLeft[0].image_female) : '' }`}
                                className="border-solid border-2 border-white rounded-[1000px] w-[70%] sm:w-1/2 md:w-1/2 lg:w-[70%] bg-white h-[300px] min-[400px]:h-[400px] sm:h-[400px] md:h-[500px] lg:h-[400px] object-cover"
                                alt="" />
                        </div>
                    </Observer4>
                    <Observer4>
                        <div className="mb-5 w-full ">
                            <div className="flex items-center justify-center flex-col flex-nowrap w-full">
                                <h3 className=" text-black mb-1 text-center text-3xl font-bloverly">
                                    {data?.brideGroomLeft ? (data.brideGroomLeft[0].name_male ?
                                    data.brideGroomLeft[0].name_male : data.brideGroomLeft[0].name_female) : ''}
                                </h3>
                                <div className=" text-black font-redressed text-center text-lg">
                                    {data?.brideGroomLeft ? (data.brideGroomLeft[0].name_male ? "Putra" : "Putri") : ''} dari Bapak {data?.brideGroomLeft ? (data.brideGroomLeft[0].father_male ?
                                    data.brideGroomLeft[0].father_male : data.brideGroomLeft[0].father_female) : ''}
                                    <br /> dan Ibu {data?.brideGroomLeft ? (data.brideGroomLeft[0].mother_male ?
                                    data.brideGroomLeft[0].mother_male : data.brideGroomLeft[0].mother_female) : ''}
                                </div>
                                <div className="my-6 ">
                                    <a href={socmedLeft?.url}
                                        className=" bg-transparent hover:bg-white rounded-full p-4 text-black"
                                        target="_blank">
                                        <span>
                                            <i className={`fa-brands ${leftClassNames} mr-2`}>
                                            </i>
                                            {socmedLeft?.username}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Observer4>
                    <Observer4>
                        <div className=" mb-5 w-full relative flex justify-center">
                            <img src={`${data?.brideGroomRight ? (data.brideGroomRight[0].image_male ?
                                data.brideGroomRight[0].image_male : data.brideGroomRight[0].image_female) : '' }`}
                                className="border-solid border-2 bg-white border-white rounded-[1000px] w-[70%] sm:w-1/2 md:w-1/2 lg:w-[70%] h-[300px] min-[400px]:h-[400px] sm:h-[400px] md:h-[500px] lg:h-[400px] object-cover"
                                alt="" />
                        </div>
                    </Observer4>
                    <Observer4>
                        <div className="mb-5 w-full ">
                            <div className="flex items-center justify-center flex-col flex-nowrap w-full">
                                <h3 className=" mb-1 text-center text-3xl text-black font-bloverly">
                                    {data?.brideGroomRight ? (data.brideGroomRight[0].name_male ?
                                    data.brideGroomRight[0].name_male : data.brideGroomRight[0].name_female) : ''}
                                </h3>
                                <div className="text-center font-redressed text-black text-lg">
                                    {data?.brideGroomRight ? (data.brideGroomRight[0].name_male ? "Putra" : "Putri") :
                                    ''} dari Bapak {data?.brideGroomRight ? (data.brideGroomRight[0].father_male ?
                                    data.brideGroomRight[0].father_male : data.brideGroomRight[0].father_female) : ''}
                                    <br /> dan Ibu {data?.brideGroomRight ? (data.brideGroomRight[0].mother_male ?
                                    data.brideGroomRight[0].mother_male : data.brideGroomRight[0].mother_female) : ''}
                                </div>
                                <div className="my-6 ">
                                    <a href={socmedRight?.url}
                                        className=" bg-transparent hover:bg-white p-4 rounded-full text-black"
                                        target="_blank">

                                        <span>
                                            <i className={`fa-brands ${rightClassNames} mr-2`}></i>
                                            {socmedRight?.username}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Observer4>
                </div>
            </div>
        </>
        )
        }