import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MusicProps {
  isPreview?: boolean;
}

const MusicPlayer_1: React.FC<MusicProps> = ({ isPreview = false }) => {
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPreview) return;
    const ctx = gsap.context(() => {
       gsap.fromTo(".music-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" }});
    }, containerRef);
    return () => ctx.revert();
  }, [isPreview]);

  const MusicCard = () => (
    <div className="music-card bg-gray-900 rounded-[2rem] p-6 shadow-2xl max-w-sm mx-auto text-white relative overflow-hidden">
       {/* Ambient Glow */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600 rounded-full blur-[80px] opacity-30 pointer-events-none"></div>

       {/* Header */}
       <div className="flex justify-between items-center mb-8 relative z-10 text-gray-400">
          <button><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg></button>
          <span className="text-xs font-bold uppercase tracking-widest">Now Playing</span>
          <button><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/></svg></button>
       </div>

       {/* Album Art */}
       <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl mb-8 relative z-10 group">
          <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Album Art" />
       </div>

       {/* Track Info */}
       <div className="mb-8 relative z-10">
          <h2 className="text-2xl font-bold mb-1">Midnight City</h2>
          <p className="text-gray-400">M83 • Hurry Up, We're Dreaming</p>
       </div>

       {/* Progress */}
       <div className="mb-8 relative z-10 group cursor-pointer">
          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
             <div className="w-1/3 h-full bg-purple-500 relative"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
             <span>1:24</span>
             <span>4:03</span>
          </div>
       </div>

       {/* Controls */}
       <div className="flex justify-between items-center relative z-10 px-4">
          <button className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 6l5 12-5-12z"/><path d="M10.5 5h3v14h-3zM16 6h2v12h-2z" fillRule="evenodd"/></svg></button>
          <button className="text-white hover:text-purple-400 transition-colors"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg></button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all"
          >
             {isPlaying ? (
                <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
             ) : (
                <svg className="w-8 h-8 fill-white ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
             )}
          </button>

          <button className="text-white hover:text-purple-400 transition-colors"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg></button>
          <button className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/></svg></button>
       </div>
    </div>
  );

  if (isPreview) {
    return (
      <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none bg-gray-950 flex items-center justify-center">
         <MusicCard />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="py-12 bg-gray-950 flex justify-center">
       <MusicCard />
    </div>
  );
};

export  {MusicPlayer_1};