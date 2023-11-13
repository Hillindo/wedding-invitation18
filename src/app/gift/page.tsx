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
   <section className="w-full pt-28">

     <div className="bg-[#051E31] rounded-3xl shadow-slate-800 shadow-md relative mx-5 sm:mx-20 lg:px-5 border-white flex z-20 border">
     <div className=" rounded-3xl bg-center left-0 bg-no-repeat bg-cover bg-blend-multiply h-full w-full absolute z-10 bg-[#051E31]" style={{backgroundImage: `url('/img/bg-1.jpg')`}}></div>
        <div className="w-full flex flex-wrap justify-center items-center gap-5 text-center py-5 bg-transparent z-50">
            <div className="font-amiri text-2xl text-white text-center">
                Wedding Gift
            </div>
            <div className="text-center font-quicksand text-sm mb-5 w-full mx-5 text-white">    
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
     </div>
     {isModalOpen && (
        <div className="fixed top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-[60] lg:max-w-lg mx-auto">
            <div className="bg-white py-2 rounded-lg mx-2 font-lionel max-h-[500px] overflow-y-scroll">

                <div className='border-b flex items-center p-3'>
                    <p className=' text-xl grow font-semibold'>Kirim Hadiah</p>
                    <button onClick={closeModal}
                        className='p-2 px-4 bg-red-500 text-white font-louis rounded-lg hover:bg-red-700'>Tutup</button>
                </div>
                <div className='p-2 '>
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