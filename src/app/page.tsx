"use client"
import { useState, useEffect } from 'react';
import { setCookie, getCookie } from "cookies-next";
import axios from "next@js/lib/axios";
import Front from "./front/page";
import Section1 from './section1/page'
import Section2 from './section2/page'
import Couple from './couple/page'
import Date from './date/page'
import Event from './event/page'
import Greeting from './greeting/page'
import Gift from './gift/page'
import BrideGift from './gift/bridegift'
import Love from './love/page'
import Live from './live/page'
import Gallery from './gallery/page'
import End from './end/page'
import Footer from './footer/page'
import LoadingScreen from "./component/loading/page";
import BackgroundMusic from './component/music/page';
import Navbar from './component/navbar/page'

export default function Home() {
  const [currentURL, setCurrentURL] = useState("");
  const [guestName, setGuestName] = useState("");
  const [data, setData] = useState([]);
  const [myCookie, setMyCookie] = useState<any>("");
  const [isItemNotPaid, setIsItemNotPaid] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [music, setMusic] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [frontVisible, setFrontVisible] = useState(true);
  const [mainContentVisible, setMainContentVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState("flex");
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const handleOpenInvitation = () => {
    setFrontVisible(false);
    setMainContentVisible(true);
    setTimeout(() => {
      setImageLoaded("hidden");
    }, 2000);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentURL(window.location.href);
    }
  }, []);

  if (currentURL) {
    const splitSlash = currentURL.split("https://");
    const domain = splitSlash[1]?.split(".")[0];
    setCookie("subDomain", domain);
  }

  useEffect(() => {
    const images = Array.from(document.images);
    const unloadedImages = images.filter((img) => !img.complete);

    if (unloadedImages.length > 0) {
      Promise.all(
        unloadedImages.map((img) => {
          return new Promise((resolve) => {
            img.onload = img.onerror = resolve;
          });
        })
      ).then(() => {
        setTimeout(() => {
          setAllImagesLoaded(true);
        }, 2000);
      });
    } else {
      setTimeout(() => {
        setAllImagesLoaded(true);
      }, 2000);
    }
  }, [data]);

  useEffect(() => {
    const domain = getCookie("subDomain");
    setMyCookie(domain);

    let splitGuest = currentURL.split("?to=")[1];
    splitGuest = splitGuest?.split("%20")
      ? splitGuest.replaceAll("%20", " ")
      : splitGuest;

    setGuestName(splitGuest);
  });

  const addFontsDynamically = (fonts:any) => {
    const style = document.createElement('style');
    fonts.forEach((font:any) => {
      style.appendChild(
        document.createTextNode(`
        @import url(${font?.font_url});
        `)
      );
    });
    document.head.appendChild(style);
  };

  useEffect(() => {
    if (myCookie) {
      const getData = async () => {
        try {
          setIsLoading(true);
          const res = await axios.get(
            `/api/invitation/${getCookie("subDomain")}`
          );
          setData(res.data);
          setMusic(res.data?.music?.path_music ?? res.data?.music?.embed_link);
          addFontsDynamically(res.data.font);

          if (res?.data?.isItemNotPaid.length > 0) {
            setIsItemNotPaid(true)
          } else {
            setIsItemNotPaid(false)
          }
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          setErrorMsg("Terjadi kesalahan saat memuat data.");
        }
      };
     
      getData();
    }
  }, [myCookie]);

  return (
    <div>
      {!allImagesLoaded ? (
        <LoadingScreen />
      ) : (
        <>
          {errorMsg ? (
            <div className="text-red-500 text-center h-screen">{errorMsg}</div>
          ) : (
            <>
              {isItemNotPaid && (
                <div className="w-full h-screen bg-[#000000d7] z-[9999] fixed flex items-center justify-center text-white text-2xl text-center font-dm-serif-text leading-loose">
                  Tambahan Item Belum Dikonfirmasi <br />
                  Silahkan Lakukan Pembayaran
                </div>
              )}
              <div className='mx-auto lg:max-w-md overflow-y-auto overflow-x-hidden relative scroll-smooth h-screen'>
                {frontVisible ? (
                  <Front data={data} guestName={guestName} onOpenInvitation={handleOpenInvitation}/>   
                ) : null}
                
                {mainContentVisible ? (
                  <>
                    <Section1 data={data}/>
                    <Section2 data={data}/>
                    <Couple data={data}/>
                    <Date data={data}/>
                    <Event data={data}/>
                    <section className='bg-white py-[10%] relative w-full z-40'>
                      <div className='bg-[#A5131300] mix-blend-multiply top-0 bg-center h-full w-full absolute'
                          style={{backgroundImage: `url('/img/bg-6.jpg')`}}></div>
                      <Greeting data={data}/>
                      <Gift data={data}/>
                      <BrideGift data={data}/>
                    </section>
                    <Love data={data} />
                    <Gallery data={data} />
                    <section className='bg-white py-[10%] relative w-full'>
                      <div className='bg-[#A5131300] mix-blend-multiply top-0 bg-bottom bg-cover h-full w-full absolute'
                          style={{backgroundImage: `url('/img/bg-6.jpg')`}}></div>
                      <Live data={data}/>
                      <End data={data}/>
                    </section>
                    <Footer />
                    <Navbar/>
                    <BackgroundMusic src={music ? music : "/testMusic.mp3"} />
                  </>
                ) : null}
              </div>
            </>
          )}    
        </>
      )}
    </div>
  )
}
