"use client";
import { useEffect, useState } from "react";
import Observer from "next@js/app/component/observer/observer-up";
import Observer2 from "next@js/app/component/observer/observer-moveLeft";
import Observer3 from "next@js/app/component/observer/observer-moveRight";
import Observer4 from "next@js/app/component/observer/observer-zoomIn";


export default function LoveStory({ data }: any) {
const [story, setStory] = useState<any>([]);

    useEffect(() => {
    const fetchData = async () => {
    try {
    setStory(data?.loveStory)
    } catch (error) {
    console.error('Error fetching data:', error);

    }
    };

    fetchData();
    }, [data]);


    return (
    <>
        {data?.loveStory?.length > 0 ? (
        <div className="h-fit bg-cover text-white bg-center relative lg:max-w-md mx-auto" style={{ backgroundImage:'url(/img/bg-8.png)' }}>
            <div className='mix-blend-multiply bg-[#051E31] top-0 bg-center h-full w-full absolute'
                style={{backgroundImage: `url('/img/bg-8.png')`}}></div>
            <div className="w-full h-full text-center font-quicksand py-8 px-5 z-20 relative">
                <Observer>
                    <h1 className=" text-4xl capitalize pb-12" style={{ fontFamily: `${data?.fontTitle ? data?.fontTitle?.font_title : "romantic"}` }}>
                        love story
                    </h1>
                </Observer>
                <Observer>
                    <div id="kolom-2" className="overflow-y-scroll max-h-[80vh]">
                        {story?.length > 0 &&
                        story.map((res: any, index: any) => (
                        <div className="mb-8" key={index}>
                            <div className="w-56 h-40  rounded-lg mx-auto mb-2 overflow-hidden">
                                <Observer4>
                                    <img src={res?.images } alt="" className="object-cover w-full h-full object-top" />
                                </Observer4>

                            </div>
                            <Observer4>
                                <h1 className="font-bold capitalize mb-2">
                                    {res?.name }
                                </h1>
                            </Observer4>
                            <Observer4>
                                <p className="text-sm">
                                    {res?.caption}
                                </p>
                            </Observer4>
                        </div>
                        ))}

                    </div>
                </Observer>

            </div>
        </div>
        ):null}
    </>
    )
    }