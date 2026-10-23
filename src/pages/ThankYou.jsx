import React, { useEffect, useState } from "react";

const REDIRECT_URL = "https://rustomjeeozoneskye.in/";

export default function ThankYou() {
  // const [seconds, setSeconds] = useState(10);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setSeconds((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(timer);

  //         window.location.href = REDIRECT_URL;

  //         return 0;
  //       }

  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  const handleBackToHome = () => {
    window.location.href = REDIRECT_URL;
  };

  return (
    <main className="min-h-screen bg-[#e8eef3] flex items-center justify-center px-6">
      <div className="w-full max-w-[900px] text-center">
        {/* Icon */}
        <div className="flex justify-center mb-[70px]">
          <svg width="240" height="190" viewBox="0 0 240 190" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Thank you">
            <rect x="20" y="15" width="200" height="160" rx="22" fill="#000000" />
            <path d="M24 43L103 105C113 113 127 113 137 105L216 43" stroke="#F5F5F5" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 35C24 23.954 32.954 15 44 15H196C207.046 15 216 23.954 216 35L132 98C125 103.25 115 103.25 108 98L24 35Z" fill="#000000" />
            <path d="M24 40L101 102C112 111 128 111 139 102L216 40" stroke="#F5F5F5" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-black font-extrabold text-[48px] sm:text-[58px] md:text-[68px] leading-none tracking-[-0.04em]">
          THANK YOU!
        </h1>
        <div className="mt-8 text-black text-[18px] sm:text-[21px] md:text-[24px] leading-[1.6] font-normal">
          <p> Thank you for expressing interest on our website. </p>
          <p> Our expert will get in touch with you shortly.</p>
          {/* <p className="mt-1"> You will be redirected in {seconds} seconds</p> */}
          <div className="mt-8">
            <button type="button" onClick={handleBackToHome} className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#597dae] hover:bg-[#486996] text-white font-sans font-medium text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300 shadow-lg cursor-pointer border-none"> Back To Home</button>
          </div>
        </div>
      </div>
    </main>
  );
}