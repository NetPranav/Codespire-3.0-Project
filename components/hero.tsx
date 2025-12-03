"use client";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Hero() {
  // const [fadeIn, setFadeIn] = useState(false);
  const [top, setTop] = useState(50);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTimeout(()=>{
      setTop(0);
      setOpacity(1);
    },500)  
  }, []);

  const handleGetStartedButton = () => redirect("/userPref");
  return (
    <div
      style={{
        top: `${top}px`,
        opacity: `${opacity}`,
      }}
      className={`h-[80vh] w-full flex flex-col justify-center items-center relative transition-all duration-1000 ease z-4`}
    >
      <h1 className="text-[50px] w-[600px] text-white text-center my-[50px]">
        Just Type, and Watch It Come to Life.
      </h1>
      <div id="example" className="flex justify-center items-center gap-2 mt-10 shadow-[0px_0px_5px_rgba(255,255,255,0.5)] text-white p-3 rounded-lg backdrop-blur-[10px]">
        <input 
        className={`h-[50px] w-[40vw] p-4 text-lg rounded-lg focus:outline-none text-center`}
        type="text" placeholder="Describe your dream layout.. e g.. Modern portfolio for a photographer"/>
        <button
        
        id="generate" className={`flex justify-center items-center bg-white text-black h-[50px] pl-[25px] cursor-pointer rounded-lg`}>
          Generate
          <img src="/fevicon.png" className="h-10 invert ml-[25px] mr-[5px]" alt="" />
          </button>
      </div>
    </div>
  );
}
