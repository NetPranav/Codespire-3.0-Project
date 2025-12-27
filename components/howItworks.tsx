import React from "react";
import HeaderWORKS from "./howitworks-head"; // Ensure correct filename casing
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Describe Your Vision",
      description:
        "Don't worry about wireframes. Just tell us what you need—'A modern coffee shop landing page' or 'A dark-mode crypto dashboard'.",
      icon: (
        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: "AI Architects the UI",
      description:
        "We don't just paste images. We generate semantic, responsive, and accessible code using modern standards.",
      icon: (
        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Export Ready Code",
      description:
        "Download the file or copy the snippet directly into your VS Code. Compatible with React, Vue, and raw HTML.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      ),
    },
  ];

  return (
    <div
      // Changed: py-20 for vertical space, min-h-screen to ensure full coverage
      className={`min-h-screen md:h-[90vh] w-full flex flex-col justify-start md:justify-center items-center relative z-4 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.8))] py-20 md:py-0`}
    >
      <HeaderWORKS />
      
      {/* Container: 
         - Added gap-12 for distinct separation on mobile
         - Added px-4 to prevent touching edges
      */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-evenly gap-12 md:gap-6 px-4">
        {steps.map((step, idx) => {
          return (
            <div
              key={step.id}
              className={`
                rounded-2xl 
                min-h-[220px] 
                w-full max-w-[340px] md:max-w-[400px] md:w-[30%]
                p-8  /* Increased internal padding for spaciousness */
                flex flex-col items-start justify-center gap-4
                bg-[rgba(0,0,0,0.6)] backdrop-blur-md 
                border border-white/10 /* Subtle border for definition */
                shadow-[0px_4px_24px_rgba(0,0,0,0.2)] 
                hover:scale-[1.03] md:hover:scale-[1.05] 
                transition-all duration-500 ease-out
                group
              `}
            >
              <h1 className={`text-white text-xl md:text-2xl font-bold flex items-center gap-3 group-hover:text-blue-200 transition-colors`}> 
                <span className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">{step.icon}</span>
                {step.title}
              </h1>
              <p className={`text-gray-400 text-sm md:text-base leading-relaxed`}>
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}