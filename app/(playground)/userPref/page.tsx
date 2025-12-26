"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { LayoutTemplate, Wand2, ArrowRight, ChevronLeft } from "lucide-react";

export default function UserPreference() {
  return (
    <div className="min-h-screen w-full bg-black text-white relative flex flex-col items-center justify-center overflow-hidden selection:bg-white/20">
      
      {/* --- BACKGROUND AMBIENCE (Matching Hero) --- */}
      {/* A subtle gradient that fades from top to bottom, giving depth without noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,1)_100%)] pointer-events-none"></div>

      {/* --- NAVIGATION (Back to Home) --- */}
      <div className="absolute top-8 left-8 z-20">
        <Link 
            href="/" 
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
        >
            <div className="p-2 rounded-full border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
            </div>
            <span className="font-medium tracking-wide uppercase text-xs">Back to Home</span>
        </Link>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center gap-16 animate-in fade-in duration-700">
        
        {/* Header Text */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Choose Your Workflow
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-xl mx-auto">
            Speed up with pre-made designs or craft something unique with AI.
          </p>
        </div>

        {/* --- CARDS CONTAINER --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          
          {/* CARD 1: BROWSE TEMPLATES */}
          <SelectionCard 
            href="/Template"
            icon={<LayoutTemplate size={32} />}
            title="Browse Templates"
            description="Explore our curated library of polished, responsive components."
            accentColor="blue"
          />

          {/* CARD 2: GENERATE WITH AI */}
          <SelectionCard 
            href="/template-Generator"
            icon={<Wand2 size={32} />}
            title="Generate with AI"
            description="Describe your vision and let our AI architect write the code for you."
            accentColor="purple"
          />

        </div>
      </div>
    </div>
  );
}

// --- REUSABLE "SPOTLIGHT" CARD COMPONENT ---
// This isolates the complex hover logic to keep the main code clean
function SelectionCard({ href, icon, title, description, accentColor }: { 
    href: string; 
    icon: React.ReactNode; 
    title: string; 
    description: string; 
    accentColor: "blue" | "purple";
}) {
    const divRef = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!divRef.current) return;
        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <Link 
            href={href}
            ref={divRef as any}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative h-80 rounded-2xl border border-white/10 bg-neutral-900/50 overflow-hidden flex flex-col justify-between p-8 transition-all duration-300 hover:border-white/20"
        >
            {/* SPOTLIGHT EFFECT */}
            <div 
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`
                }}
            />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Icon Circle */}
                <div className={`
                    w-16 h-16 rounded-xl flex items-center justify-center mb-6 
                    border border-white/10 bg-white/5 
                    transition-transform duration-500 group-hover:scale-110
                    ${accentColor === 'blue' ? 'text-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'text-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]'}
                `}>
                    {icon}
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light">
                    {description}
                </p>

                {/* Arrow Button at bottom */}
                <div className="mt-auto flex items-center gap-3 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                    <span>Get Started</span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <ArrowRight size={14} />
                    </div>
                </div>
            </div>
        </Link>
    );
}

// "use client";
// import React, { useState } from "react";
// import Goals from "@/components/goals";
// import Personality from "@/components/personality";
// import Topic from "@/components/topic";
// import { redirect } from "next/navigation";

// export  default function UserPref() {
//   // frames only carry identity and element; their visual position is driven by `positionStyles`
//   const [frames, setFrames] = useState([
//     { id: "prime", element: <Topic /> },
//     { id: "sec", element: <Goals /> },
//     { id: "third", element: <Personality /> },
//     { id: "fourth", element: <Personality /> },
//   ]);

//   // positional styles from top (0) to bottom (3). index 0 is the large/primary frame.
//   const positionStyles = [
//     {
//       height: "75vh",
//       left: "2%",
//       top: "10%",
//       zIndex: 3,
//       boxShadow: "0 0 5px rgba(0,0,0,0.3)",
//     },
//     {
//       height: "35vh",
//       left: "calc(100% - 31vw)",
//       top: "10vh",
//       zIndex: 2,
//       boxShadow: "0 5px 5px rgba(0,0,0,0.3)",
//     },
//     {
//       height: "35vh",
//       left: "calc(100% - 31vw)",
//       top: "30vh",
//       zIndex: 1,
//       boxShadow: "0 5px 5px rgba(0,0,0,0.3)",
//     },
//     {
//       height: "35vh",
//       left: "calc(100% - 31vw)",
//       top: "50vh",
//       zIndex: 0,
//       boxShadow: "0 5px 5px rgba(0,0,0,0.3)",
//     },
//   ];

//   // Next: rotate left — the current largest (frames[0]) moves to end and becomes smallest; frames[1] becomes large.
//   const [clickCount, setClickCount] = useState(0);
//   function handleNext() {
//     setClickCount((c: number) => c+=1);

//     if (clickCount >= 4) {
//       redirect("/template-Generator");
//     }

//     setFrames((prev) => {
//       if (prev.length <= 1) return prev;
//       return [...prev.slice(1), prev[0]];
//     });
//   }

//   // Back: rotate right — bottom-most comes to front and becomes large.
//   function handleBack() {
//     setFrames((prev) => {
//       if (prev.length <= 1) return prev;
//       return [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)];
//     });
//     setClickCount((c: number) => c-=1);
//   }

//   return (
//     <div className={`h-full w-full `}>
//       <div className={`h-18 w-max`} id="topBar">
//         <img src="/logo.png" alt="WebGen" className={`w-40 invert m-4`} />
//       </div>

//       {/* render frames from array; style is taken from the positionStyles by index */}
//       {frames.map((f, idx) => {
//         const style =
//           positionStyles[idx] || positionStyles[positionStyles.length - 1];
//         return (
//           <div
//             key={f.id}
//             id={f.id}
//             style={{
//               ...style,
//               transitionTimingFunction: "ease",
//               boxShadow: style.boxShadow ?? "0 0 3px rgba(0,0,0,1)",
//             }}
//             className={`aspect-video fixed transition-all duration-300 overflow-hidden`}
//           >
//             {f.element}
//           </div>
//         );
//       })}

//       <div
//         style={{ boxShadow: `0 0 3px rgba(0,0,0,1)` }}
//         id="nav"
//         className={`h-18 w-full flex justify-between items-center fixed bottom-[0%] bg-[#ffffff] `}
//       >
//         <button
//           onClick={handleBack}
//           id="Back"
//           className={`h-[80%] w-[10%] mx-[2%] text-white bg-black font-bold`}
//         >
//           Back
//         </button>

//         <button
//           onClick={handleNext}
//           id="Next"
//           className={`h-[80%] w-[10%] mx-[2%] bg-[#000000] text-white font-bold`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

