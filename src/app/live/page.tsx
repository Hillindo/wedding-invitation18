"use client";
import { log } from "console";
import { useEffect, useState } from "react";
import Observer from "next@js/app/component/observer/observer-up";
import Observer2 from "next@js/app/component/observer/observer-moveLeft";
import Observer3 from "next@js/app/component/observer/observer-moveRight";
import Observer4 from "next@js/app/component/observer/observer-zoomIn";

export default function Live(data:any) {
    const [liveStream, setLiveStream] = useState<any>([]);
    const [caption4, setcaption4] = useState("");
    const [defaultcaption4, setdefaultcaption4] = useState("");
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLiveStream(data?.data?.liveStream);
                data?.data?.captions?.map((res: any, index: any) => {
                  if (res.category_type == 4) {
                    setcaption4(res.description);
                  }
                });
                data?.defaultCaption?.map((res: any) => {
                  if (res.category_type == 4 && res.is_default == 4) {
                    setdefaultcaption4(res.description);
                  } 
                });
          } catch (error) {
            console.error('Error fetching data:', error);
          
          }
        };
    
        fetchData();
    }, [data]);
    console.log(data.data.liveStream);
    
  return (
    <section>
         {liveStream && liveStream.length > 0 ? (
            <Observer4>
          <div className="bg-[#9B899A00] p-5 flex flex-wrap justify-center z-20 relative">
            <div className="bg-[#FFFFFF91] p-5 my-5 w-full rounded-3xl">
                <div className="p-2 flex flex-wrap w-full justify-center">
                    <div className="mb-5 text-center mt-2 text-black text-4xl font-saignh">
                        Live Streaming
                    </div>
                    <div className="mb-5 w-full flex items-center">
                    <div className=" font-quicksand text-base text-center">
                    <p>{caption4 ? caption4 : defaultcaption4}</p>
                    </div>
                    </div>
                    <div className="flex gap-4 flex-wrap justify-center">
                    {liveStream?.map((res: any, index: any) => (
            <button className="MobileButton self-stretch bg-black rounded-sm justify-center items-center gap-4  text-white text-xs py-2 px-5 font-sans" onClick={res.url} key={index}>
                <span>
               Live {res.platform == "Youtube" ? "Youtube" : res.platform === "Instagram"
                                ? "Instagram" : "Zoom"}
               <i className="fas fa-arrow-right-long ml-2"></i>
                </span>
            </button>
                    ))}
            </div>
                </div>
            </div>
        </div>
        </Observer4>
        ) : null}
    </section>
  )
}
