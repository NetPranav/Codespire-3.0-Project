"use client";
import React, { useState, useEffect } from "react";
import { Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [top, setTop] = useState(50);
  const [opacity, setOpacity] = useState(0);
  const router = useRouter();
  const [text, setText] = useState("");
  
  const handleGenerate = () => {
    if (text.trim()) {
      router.push(`/template-Generator?prompt=${encodeURIComponent(text)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && text.trim()) {
      handleGenerate();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTop(0);
      setOpacity(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        top: `${top}px`,
        opacity: `${opacity}`,
      }}
      className="min-h-[80vh] w-full flex flex-col justify-center items-center relative transition-all duration-1000 ease z-10 px-4 pt-20 md:pt-0"
    >
      {/* Responsive Heading */}
      <h1 className="text-3xl md:text-[50px] leading-tight w-[90%] md:w-[600px] text-white text-center my-8 md:my-[50px]">
        Just Type, and Watch It Come to Life.
      </h1>

      {/* GLASS CONTAINER 
        - Restored original shadow & backdrop-blur
        - Added bg-white/5 and border for better visibility on dark backgrounds
        - Responsive: Stacked on mobile (flex-col), Row on desktop (md:flex-row)
      */}
      <div
        id="example"
        className="
          flex flex-col md:flex-row justify-center items-center gap-3 
          mt-4 md:mt-10 
          p-3 rounded-xl 
          shadow-[0px_0px_5px_rgba(255,255,255,0.5)] 
          backdrop-blur-[10px] 
          bg-white/5 border border-white/20
          w-full max-w-[90%] md:max-w-none md:w-auto
        "
      >
        <input
          className="
            h-[50px] 
            w-full md:w-[40vw] 
            p-4 text-base md:text-lg 
            rounded-lg 
            focus:outline-none text-center 
            bg-transparent 
            text-white placeholder-gray-300 
            border-none ring-0
          "
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyPress={handleKeyPress}
          placeholder="Describe your dream layout.. e.g. Modern portfolio"
        />

        <button
          id="generate"
          className="
            flex justify-center items-center 
            bg-white text-black 
            h-[50px] w-full md:w-auto px-6 
            cursor-pointer rounded-lg 
            hover:bg-gray-200 transition-colors 
            whitespace-nowrap font-medium
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          onClick={handleGenerate}
          disabled={!text.trim()}
        >
          Generate
          <Wand2
            className="ml-2 w-5 h-5 md:w-6 md:h-6"
            strokeWidth={2}
          />
        </button>
      </div>
    </div>
  );
}

//-----------------------------------------------------------------

// "use client";
// import { redirect } from "next/navigation";
// import React, { useState, useEffect } from "react";

// export default function Hero() {
//   // const [fadeIn, setFadeIn] = useState(false);
//   const [top, setTop] = useState(50);
//   const [opacity, setOpacity] = useState(0);

//   useEffect(() => {
//     setTimeout(()=>{
//       setTop(0);
//       setOpacity(1);
//     },500)
//   }, []);

//   // const handleGetStartedButton = () => {redirect("/template-Generator")};
//   return (
//     <div
//       style={{
//         top: `${top}px`,
//         opacity: `${opacity}`,
//       }}
//       className={`h-[80vh] w-full flex flex-col justify-center items-center relative transition-all duration-1000 ease z-4`}
//     >
//       <h1 className="text-[50px] w-[600px] text-white text-center my-[50px]">
//         Just Type, and Watch It Come to Life.
//       </h1>
//       <div id="example" className="flex justify-center items-center gap-2 mt-10 shadow-[0px_0px_5px_rgba(255,255,255,0.5)] text-white p-3 rounded-lg backdrop-blur-[10px]">
//         <input
//         className={`h-[50px] w-[40vw] p-4 text-lg rounded-lg focus:outline-none text-center`}
//         type="text" placeholder="Describe your dream layout.. e g.. Modern portfolio for a photographer"/>
//         <button
//         // onClick={handleGetStartedButton}
//         id="generate" className={`flex justify-center items-center bg-white text-black h-[50px] pl-[25px] cursor-pointer rounded-lg`}>
//           Generate
//           <img src="/fevicon.png" className="h-10 invert ml-[25px] mr-[5px]" alt="" />
//           </button>
//       </div>
//     </div>
//   );
// }
