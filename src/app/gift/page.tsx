"use client";
import { Button, Modal } from "antd";
import { useState, useEffect } from 'react';
import CopyButton from "next@js/app/component/copybutton/page";
import Observer from "next@js/app/component/observer/observer-up";
import Observer2 from "next@js/app/component/observer/observer-moveLeft";
import Observer3 from "next@js/app/component/observer/observer-moveRight";
import Observer4 from "next@js/app/component/observer/observer-zoomIn";

export default function Gift ({data}:any) {
  const [caption3, setCaption3] = useState("");
  const [defaultCaption3, setdefaultCaption3] = useState("");
  const [bank, setBank] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentModal, setContentModal] = useState<any>([]);
  const showModal = (res: any) => {
    setContentModal(res);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        setBank(data?.bankUser);
        data?.captions?.map((res: any, index: any) => {
          if (res.category_type == 3) {
            setCaption3(res.description);
          }
        });
        data?.defaultCaption?.map((res: any) => {
          if (res.category_type == 3 && res.is_default == 1) {
            setdefaultCaption3(res.description);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [data]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
      document.body.classList.add('modal-open');
    };
  
    const closeModal = () => {
        setIsModalOpen(false);
        document.body.classList.remove('modal-open');
    };

    return (
      <>
      {bank?.length > 0 ? (
    <Observer4>
   <section className="w-full pt-28 lg:max-w-md mx-auto">

     <div className="bg-[#051E31] rounded-3xl shadow-slate-800 shadow-md relative mx-5 sm:mx-20 lg:px-5 border-white flex z-20 border">
     <div className=" rounded-3xl bg-center left-0 bg-no-repeat bg-cover bg-blend-multiply h-full w-full absolute z-10 bg-[#051E31]" style={{backgroundImage: `url('/img/bg-1.jpg')`}}></div>
        <div className="w-full flex flex-wrap justify-center items-center gap-5 text-center py-5 bg-transparent z-50">
            <div className="font-amiri text-2xl text-white text-center">
                Wedding Gift
            </div>
            <div className="text-center text-sm mb-5 w-full mx-5 text-white" style={{ fontFamily: `${data?.fontContent ? data?.fontContent?.font_content : "Quicksand"}` }}>    
				{caption3 ? caption3: defaultCaption3}			
            </div>

            <div className="flex justify-center">
            <button className="MobileButton self-stretch bg-black rounded-sm justify-center items-center gap-4 inline-flex w-full text-white text-xs py-2 px-5 font-sans" onClick={openModal}>
                <span>
               Send Gift 
               <i className="fas fa-long-arrow-alt-right ml-2"></i>
                </span>
            </button>
            </div>
        </div>
     </div>     {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[60] p-4">
            <div className="bg-white rounded-xl mx-2 font-lionel max-h-[90vh] w-full max-w-lg overflow-y-auto shadow-2xl">

                <div className='border-b flex items-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl'>
                    <h2 className='text-xl grow font-semibold text-white flex items-center'>
                        <i className="fas fa-gift mr-2"></i>
                        Kirim Hadiah
                    </h2>
                    <button onClick={closeModal}
                        className='p-2 px-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md'>
                        <i className="fas fa-times"></i>
                    </button>
                </div><div className='p-2 '>
                    <p>
                        <strong>
                            Direct Transfer &nbsp;
                        </strong>
                        <span className='italic'>
                            Transfer langsung ke rekening yang tertera
                        </span>
                    </p>
                    <p className="mt-2">
                        Transfer langsung ke rekening di bawah ini:
                    </p>
                      {/* Informasi Pengiriman Kado */}
                    {data?.brideGift && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
                            <h4 className="font-semibold text-blue-800 mb-3 flex items-center text-base">
                                <i className="fas fa-gift mr-2 text-blue-600"></i>
                                Informasi Pengiriman Kado Fisik
                            </h4>
                            
                            <div className="space-y-3">
                                <div className="bg-white p-3 rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-gray-700 flex items-center">
                                            <i className="fas fa-map-marker-alt mr-2 text-red-500"></i>
                                            Alamat Penerima:
                                        </span>
                                        <CopyButton 
                                            text={data.brideGift.address} 
                                            color={"blue"} 
                                            hovercolor={"blue"} 
                                            warn={"Alamat"} 
                                        />
                                    </div>
                                    <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-md border font-medium leading-relaxed">
                                        {data.brideGift.address}
                                    </p>
                                </div>
                                
                                <div className="bg-white p-3 rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-gray-700 flex items-center">
                                            <i className="fas fa-user mr-2 text-green-500"></i>
                                            Nama Penerima:
                                        </span>
                                        <CopyButton 
                                            text={data.brideGift.receive_name} 
                                            color={"blue"} 
                                            hovercolor={"blue"} 
                                            warn={"Nama Penerima"} 
                                        />
                                    </div>
                                    <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-md border font-semibold">
                                        {data.brideGift.receive_name}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-3 p-2 bg-blue-100 rounded-lg">
                                <p className="text-xs text-blue-700 flex items-center">
                                    <i className="fas fa-info-circle mr-2"></i>
                                    Klik tombol copy untuk menyalin alamat atau nama penerima dengan mudah
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className=''>
                    <div className='flex flex-wrap'>
      {bank?.length > 0 && ( 
                    bank.filter((row:any) => row.bank.category == "konvensional").map((res:any, index: any) => ( 
                        <div
                          className=' mt-10 container max-w-md lg:max-w-md xl:max-w-lg flex justify-center relative z-50 text-white'
                          key={index}>
                          <div className='flex justify-center relative w-full h-full aspect-card'>
                            <img src="/img/bank2.png" className=' h-full w-full absolute' rel="preload" />
                            <div className='z-10 w-full  h-full  px-4  py-2 flex flex-col justify-between '>
                              <div className=" ml-auto mr-2 text-white font-normal w-[80%] text-end ">
                                <img src={res?.bank?.path_pict } className="w-[40%] ml-auto" alt="" rel="preload" />
                              </div>
                              <div>
                                <img src="/img/bank3.png" alt="" className="w-[20%]" rel="preload" />
                              </div>
                              <div>
                              <div className=" flex flex-wrap items-end gap-2 mb-3">
                                <div className="text-white  break-all tracking-[2px]">
                                  {res?.rekening ? res.rekening : "req"}
                                </div>
                                <div className="">
                                  <CopyButton text={`${res?.rekening ?
                                    res.rekening : "12345678" }`} color={"black"} hovercolor={"white"} warn={"Rekening"}/>
                                </div>
                              </div>
                              <div className="flex">
                              <div className="w-3/4">
                              <p className="capitalize text-sm ">
                                atas nama
                              </p>
                              <div className=" break-words text-lg">
                                <strong> {res?.owner_name ? res.owner_name : " "}</strong>
                              </div>
                              </div>
                              <img src="/logo/iconpastinikah.svg" alt="" className="w-[30%] ml-auto" />
                              </div>
                                
                              </div>


                            </div>
                          </div>
                        </div>
                    )) 
      )} 
 
      {bank?.length > 0 && ( 
                    bank.filter((row:any) => row.bank.category == "digital").map((res:any , index: any) => ( 
                      <div
                      className=' mt-10 container max-w-md lg:max-w-md xl:max-w-lg flex justify-center relative z-50 text-white'
                      key={index}>
                      <div className='flex justify-center relative w-full h-full  aspect-card'>
                        <img src="/img/bank2.png" className=' h-full w-full absolute' rel="preload" />
                        <div className='z-10 w-full  h-full px-4  py-2 flex flex-col justify-between '>
                          <div className=" ml-auto mr-2 text-white font-normal w-[80%] text-end ">
                            <img src={res?.bank?.path_pict } className="w-[40%] ml-auto" alt="" rel="preload" />
                          </div>
                          <div>
                                <img src="/img/bank3.png" alt="" className="w-[20%]" rel="preload" />
                          </div>
                          <div>
                          <div className=" flex flex-wrap items-end gap-2 mb-2">
                            <div className="text-white  break-all tracking-[2px]">
                             {res?.rekening ? res.rekening : "req"}
                            </div>
                            <div className="">
                            <CopyButton text={`${res?.rekening ? res.rekening : "12345678" }`} color={"black"} hovercolor={"white"} warn={"Rekening"}/>
                                </div>
                                
                              </div>
                              <button onClick={() => showModal(res)}

                                className="bg-blue-400 rounded-full py-1 px-4 text-sm mb-2">
                                Show Qr Code
                              </button>
                              <div className="flex">
                              <div className="w-3/4">
                              <p className="capitalize text-sm ">
                                atas nama
                              </p>
                              <div className=" break-words text-lg">
                                <strong> {res?.owner_name ? res.owner_name : " "}</strong>
                              </div>
                              </div>
                              <img src="/logo/iconpastinikah.svg" alt="" className="w-[30%] ml-auto" rel="preload" />
                              </div>
                            
                          </div>


                        </div>
                        </div>
                    
                    </div>
                    )) 
      )}
       <Modal
          open={isModalVisible}
          onOk={handleOk}
          footer={null}
          closable={false}
          className="flex justify-center items-center text-center relative"
        >
          <button className='rounded-full bg-red-600 text-white absolute top-2 right-2 px-3 py-1 hover:bg-slate-400'
          onClick={handleCancel}
          >
            <i className='fa fa-close'></i>
          </button>
          <img src={contentModal?.qr_path} className="object-cover py-5 sm:max-w-xs " alt="" loading='lazy' />
        </Modal>
      </div>
      {/* konvensional */}
                   
                </div>
            </div>
        </div>
      )}
   </section>
    </Observer4>
   ):null}
   </>
        )
}