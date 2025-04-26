"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import React, {useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";
import { Autoplay, Navigation} from 'swiper/modules';
import { motion, AnimatePresence } from "framer-motion";


export default function Gallery({ data }: any) {
   
    const [preweddingImage, setPreweddingImage] = useState<any>([]);
    const [preweddingVideo, setPreweddingVideo] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>(null);

    
    useEffect(() => {
        const fetchData = async () => {
          try {
            setPreweddingVideo(data.preweddingVideo);
                setPreweddingImage(data.preweddingPhoto);
               
          } catch (error) {
            console.error('Error fetching data:', error);
          
          }
        };
    
        fetchData();
      }, [data]);
      
      const itemA = {
        hidden: { scale: 0, y: 200 },
        show: { scale: 1, y:0},
    }
  
    const itemB = {
        hidden: { opacity:0},
        show: { opacity:1},
    }

    return (
        <div className="w-full h-full relative lg:max-w-md mx-auto" id='gallery'>
            <div className='mix-blend-multiply bg-[#051E31] top-0 bg-bottom h-full w-full absolute'
            style={{backgroundImage: `url('/img/bg-8.png')`}}></div>
            <div className="w-full h-full py-16 px-6 text-center z-20 relative">

                <motion.h1
                    initial={{ opacity: 0, x: "-50%" }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once:true }}
                    className="text-5xl text-white mb-8 capitalize"
                    style={{ fontFamily: `${data?.fontTitle ? data?.fontTitle?.font_title : "Saignh"}` }}>
                gallery
            </motion.h1>
            {/* <p className='px-2 text-sm font-quicksand py-10'>
                caption
            </p> */}
                {preweddingVideo && preweddingVideo?.length > 0 ? (
                        <motion.div
                            variants={itemA}
                            className="w-full aspect-video  rounded-xl overflow-hidden mb-8">

                                {preweddingVideo[0]?.url_video != "" ? (
                        <iframe className="w-full h-full" src={`${
                                  preweddingVideo[0]?.url_video}
                                `} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                                ) : (
                                 <video className='w-full h-full' src={`${
                                  preweddingVideo[0]?.video_name}`} preload='auto' autoPlay controls></video>
                                )}

                    </motion.div>

                ):null}
            <div>
            <Swiper
        slidesPerView={2} 
        spaceBetween={10}
     
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay ,Navigation]}
        className="mySwiper  h-full"
                    >
                        {preweddingImage?.map((res: any, index: any) => (
                            <SwiperSlide key={index}>
                               
                                    <div 
                                        
                                 onClick={() => {
                                    setSelectedImage(res);
                                    setShowModal(true);
                                }}
                                    className='w-full h-64  rounded-xl overflow-hidden' >
                                        <motion.img
                                            initial={{ opacity: 0,}}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ duration:1 }}
                                            src={res.image_crop} alt="" className='w-full h-full object-cover' />
                                </div>
                               
                            </SwiperSlide>
                        ))}
                           
                    </Swiper>
                    <AnimatePresence>
                    {showModal && selectedImage && (
                          <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ type:"spring", bounce:0.5, duration:0.75 }}
                            
                            className="fixed inset-0 flex items-center justify-center z-10 max-w-md px-8 mx-auto">
                                <div className="bg-white p-6 rounded-lg shadow-lg relative">
                                <button className='rounded-full bg-red-600 text-white absolute top-2 right-2 px-3 py-1 hover:bg-slate-400'
          onClick={() => setShowModal(false)}
          >
            <i className='fa fa-close'></i>
          </button>
                                    <div className=' mt-5 w-4/5 mx-auto'>
                                        <img src={selectedImage?.url} className="w-full" alt="" />
                                    </div>
                                   
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
            </div>
            </div>
        </div>
    )
}