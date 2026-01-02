import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isPreview?: boolean;
}

const Hero_1: React.FC<HeroProps> = ({ isPreview = false }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    if (isPreview) return;

    const ctx = gsap.context(() => {
      // 1. Text Stagger Animation
      gsap.fromTo(
        ".hero-text-anim",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        }
      );

      // 2. Visual Elements Pop In
      gsap.fromTo(
        ".hero-visual-card",
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          delay: 0.4,
          ease: "back.out(1.2)",
        }
      );

      // 3. Floating Animation (Continuous)
      gsap.to(".floating-card-1", {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".floating-card-2", {
        y: 20,
        duration: 3,
        delay: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isPreview]);

  const HeroContent = () => (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col lg:flex-row items-center justify-between gap-12 pt-20 pb-20 lg:pt-0 lg:pb-0">
      {/* Left Column: Text */}
      <div ref={textRef} className="flex-1 text-center lg:text-left z-10">
        <div className="hero-text-anim inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-6 border border-blue-100">
          🚀 New v2.0 is live
        </div>
        <h1 className="hero-text-anim text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
          Build faster with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Intelligent Layouts
          </span>
        </h1>
        <p className="hero-text-anim text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
          The ultimate component library for React developers. Create stunning,
          responsive landing pages in minutes, not days.
        </p>
        <div className="hero-text-anim flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95">
            Get Started Free
          </button>
          <button className="px-8 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
            View Components
          </button>
        </div>
        
        {/* Social Proof */}
        <div className="hero-text-anim mt-10 pt-8 border-t border-gray-100 flex items-center justify-center lg:justify-start gap-4">
           <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"></div>
              ))}
           </div>
           <div className="text-sm">
              <p className="font-bold text-gray-900">10k+ Developers</p>
              <p className="text-gray-500">trust LazyLayout</p>
           </div>
        </div>
      </div>

      {/* Right Column: Visuals */}
      <div ref={visualRef} className="flex-1 relative w-full max-w-lg lg:max-w-xl aspect-square flex items-center justify-center">
        {/* Background Blob */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>

        {/* Floating Cards */}
        <div className="relative w-full h-full">
            {/* Main Card */}
            <div className="hero-visual-card floating-card-1 absolute top-10 left-10 right-10 bottom-20 bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-6 z-20">
               <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="h-32 bg-gray-100 rounded-lg w-full"></div>
                  <div className="flex gap-4">
                     <div className="h-10 bg-blue-100 rounded w-1/3"></div>
                     <div className="h-10 bg-gray-100 rounded w-2/3"></div>
                  </div>
               </div>
            </div>

            {/* Floating Widget 1 */}
            <div className="hero-visual-card floating-card-2 absolute -right-4 top-20 bg-white p-4 rounded-xl shadow-xl border border-gray-100 z-30 animate-bounce-slow">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
                  <div>
                     <p className="text-xs text-gray-500">Status</p>
                     <p className="font-bold text-gray-800">Completed</p>
                  </div>
               </div>
            </div>

             {/* Floating Widget 2 */}
             <div className="hero-visual-card floating-card-1 absolute -left-8 bottom-32 bg-gray-900 p-4 rounded-xl shadow-xl z-30">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white">⚡</div>
                  <div>
                     <p className="text-xs text-gray-400">Speed</p>
                     <p className="font-bold text-white">99.9%</p>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );

  /* --- PREVIEW MODE --- */
  if (isPreview) {
    return (
      <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none bg-white overflow-hidden flex items-center">
        {/* Using w-[200%] forces the flexbox to think it has desktop width (approx 700px-800px).
           This makes the 'lg:flex-row' class active, putting text on left and image on right.
           Then 'scale-50' shrinks it to fit the card.
        */}
        <div className="w-full h-full bg-gradient-to-b from-white to-gray-50 flex items-center">
            {/* Navbar Placeholder */}
            <div className="absolute top-0 left-0 w-full h-20 border-b border-gray-100 flex items-center justify-between px-8">
               <div className="w-32 h-8 bg-gray-200 rounded"></div>
               <div className="flex gap-4">
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
               </div>
            </div>

           <HeroContent />
        </div>
      </div>
    );
  }

  /* --- REAL MODE --- */
  return (
    <section ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-white to-blue-50/30 overflow-hidden flex items-center">
      <HeroContent />
    </section>
  );
};

export  {Hero_1};