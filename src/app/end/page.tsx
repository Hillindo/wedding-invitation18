"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Observer from "next@js/app/component/observer/observer-up";
import Observer2 from "next@js/app/component/observer/observer-moveLeft";
import Observer3 from "next@js/app/component/observer/observer-moveRight";
import Observer4 from "next@js/app/component/observer/observer-zoomIn";

export default function Last({data}:any) {
  const [frontPage, setFrontPage] = useState<any>([]);
  const [nameLeft, setNameLeft] = useState("");
        const [nameRight, setNameRight] = useState("");
        const [nameAliasLeft, setNameAliasLeft] = useState("");
        const [nameAliasRight, setNameAliasRight] = useState("");
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

    return (
        <div className="bg-cover bg-center bg-no-repeat text-black relative lg:max-w-md mx-auto min-h-screen" style={{backgroundImage: "url('/img/bg-11.png')"}}>
<Observer>
            <div className="px-6 relative min-h-screen">
          <div className="w-full text-center flex flex-col justify-center items-center min-h-screen">
            <div className="w-10/12">
                  <Observer4>
            <p
              className="text-sm md:text-xl lg:text-sm font-quicksand my-2">
                 Merupakan Suatu Kebahagiaan Dan Kehormatan Bagi Kami Apabila Bapak/Ibu/Saudara/i Berkenan Hadir Untuk Memberikan Doa Restu Kepada Kami. Atas Kehadiran Dan Doa Restunya Kami Ucapkan Terima Kasih.
            </p>
            <h1
              className="font-roserri text-3xl md:text-4xl lg:text-3xl capitalize mt-8">
            {nameAliasLeft ? nameAliasLeft : nameLeft ? nameLeft: " "} & {nameAliasRight ? nameAliasRight : nameRight ? nameRight : " "}
            </h1>
                  </Observer4>
            </div>
          </div>
          
            </div>
</Observer>
        </div>
    )
}