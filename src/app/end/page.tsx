"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Observer from "next@js/app/component/observer/observer-up";
import Observer2 from "next@js/app/component/observer/observer-moveLeft";
import Observer3 from "next@js/app/component/observer/observer-moveRight";
import Observer4 from "next@js/app/component/observer/observer-zoomIn";

export default function Last({data}:any) {
  const [frontPage, setFrontPage] = useState<any>([]);
  const [nameMale, setNameMale] = useState("");
  const [nameFemale, setNameFemale] = useState("");
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
        setFrontPage(data.frontPage);
        const nameMale = data.nameMale?.name_male?.split(" ");
        const nameFemale = data.nameFemale?.name_female?.split(" ");
        setNameMale(nameMale ? nameMale[0] : "");
        setNameFemale(nameFemale ? nameFemale[0] : "");
       
      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };

    fetchData();
}, [data]);

    return (
        <div className=" bg-cover bg-bottom bg-fixed text-black relative">
<Observer>
            <div className="pb-16 px-6 relative">
          <div
            className="w-full md:w-3/4 lg:w-full mx-auto h-[620px] md:h-[800px] lg:h-[620px] bg-white/80 text text-center mt-24 rounded-t-full p-7 flex flex-col justify-between">
            <div
              className="h-3/4 md:h-4/5 lg:h-3/4 w-full  rounded-t-full overflow-hidden">
              <img src={frontPage?.front_page ? frontPage?.front_page : " "} alt="" className="w-full h-full object-cover object-center" />
            </div>
                  <Observer4>
            <p
              className="text-sm md:text-xl lg:text-sm font-quicksand my-2">
              Merupakan Suatu Kebahagiaan Dan Kehormatan Bagi Kami Apabila Bapak/Ibu/Saudara/i Berkenan Hadir Untuk Memberikan Doa Restu Kepada Kami. Atas Kehadiran Dan Doa Restunya Kami Ucapkan Terima Kasih.
            </p>
            <h1
              className="font-roserri text-3xl md:text-4xl lg:text-3xl capitalize">
            { nameFemale} & { nameMale}
            </h1>
                  </Observer4>
          </div>
          
            </div>
</Observer>
        </div>
    )
}