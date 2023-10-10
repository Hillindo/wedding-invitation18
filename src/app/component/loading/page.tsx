import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white  z-[9999]">
        <img src="/icons/iconpastinikah2.svg" className=' w-1/3 lg:w-48 animate-bounce' alt="" />
        {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div> */}
      </div>
    );
};
  
export default LoadingScreen;