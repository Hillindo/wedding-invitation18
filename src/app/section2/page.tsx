"use client";
import { useState, useEffect } from "react";
import Observer from "next@js/app/component/observer/observer-up";
import Observer2 from "next@js/app/component/observer/observer-moveLeft";
import Observer3 from "next@js/app/component/observer/observer-moveRight";

export default function Section2({data}:any) {
    const [defaultCaption1, setdefaultCaption1] = useState("");
    const [caption1, setCaption1] = useState("");
    const [firstSectionImage, setFirstSectionImage] = useState<any>("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                data?.captions?.map((res: any, index: any) => {
                    if (res.category_type == 1) {
                      setCaption1(res.description);
                    }
                  });
                  data?.defaultCaption?.map((res: any) => {
                    if (res.category_type == 1 && res.is_default == 1) {
                      setdefaultCaption1(res.description);}});
        //   setFirstSectionImage(data?.firstSectionImage);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          
          }
        };
    
        fetchData();
    }, [data]);
  return (
    // <section className='bg-[#26819d] px-1 overflow-hidden w-full relative pt-5 pb-10'>
    <section className='bg-[#86bbb3] px-1 overflow-hidden w-full relative pt-5 pb-10'>
        <div className='relative w-full sm:w-3/4 mx-auto '>
            <div className='relative flex'>
                <div className='m-2 p-2 w-full flex relative min-[425px]:px-8 sm:px-0'>
                    <div className='flex justify-center p-5 relative w-full flex-nowrap'>
                        <img src="/img/bg-5.png" className='absolute w-full h-full z-10' alt="" />
                        <div className='top-3 sm:top-0 z-30 pt-3 min-h-[500px]'>
                            {/* <Observer>
                        <div className="flex justify-center mb-5">
                            <img src={firstSectionImage?.first_section_image} className="rounded-[200px] w-[70%] sm:w-3/5 md:w-1/2 lg:w-[70%] h-[250px] sm:h-[300px] md:h-[350px] object-cover" alt="" />
                        </div>
                            </Observer> */}
                            <Observer>
                        <div className=' w-5/6 mx-auto text-center text-xs sm:text-sm font-medium text-black' style={{ fontFamily: `${data?.fontContent ? data?.fontContent?.font_content : "Quicksand"}` }}>
                        {caption1 ? caption1 : defaultCaption1}
                        </div>
                            </Observer>
                        </div>
                    </div>
                    <div className='right-[-30%] top-1/3 z-20 absolute w-full'>
                    <Observer2>
                        <img src="/img/bg-3.png" className='h-auto w-full opacity-25' alt="" />
                    </Observer2>
                    </div>
                    <div className='left-[-30%] top-0 z-20 absolute w-full'>
                    <Observer3>
                        <img src="/img/bg-4.png" className='h-auto w-full opacity-25' alt="" />
                    </Observer3>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}
