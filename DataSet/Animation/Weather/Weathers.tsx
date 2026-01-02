import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WeatherProps {
  isPreview?: boolean;
}

const Weather_1: React.FC<WeatherProps> = ({ isPreview = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (isPreview) return;
    const ctx = gsap.context(() => {
       gsap.fromTo(".weather-card", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)", scrollTrigger: { trigger: containerRef.current, start: "top 80%" }});
       gsap.fromTo(".forecast-item", { x: 20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, delay: 0.3, duration: 0.5 });
    }, containerRef);
    return () => ctx.revert();
  }, [isPreview]);

  const WeatherCard = () => (
    <div className="weather-card bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-8 text-white shadow-2xl shadow-blue-500/30 max-w-sm mx-auto overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-blue-300 opacity-20 rounded-full blur-2xl"></div>

      {/* Top Section */}
      <div className="flex justify-between items-start mb-8 relative z-10">
         <div>
            <h2 className="text-2xl font-bold">Indore</h2>
            <p className="text-blue-100 text-sm font-medium">Madhya Pradesh, IN</p>
         </div>
         <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">Now</div>
      </div>

      {/* Main Temp */}
      <div className="flex flex-col items-center mb-8 relative z-10">
         <div className="w-24 h-24 mb-2 relative">
             <div className="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-50"></div>
             <svg className="w-full h-full text-yellow-300 relative z-10 animate-pulse-slow" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
         </div>
         <h1 className="text-6xl font-bold tracking-tighter mb-1">28°</h1>
         <p className="text-blue-100 font-medium">Mostly Sunny</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8 border-b border-white/10 pb-6 relative z-10">
         <div className="text-center">
            <p className="text-blue-200 text-xs mb-1">Wind</p>
            <p className="font-bold">12km/h</p>
         </div>
         <div className="text-center border-l border-r border-white/10">
            <p className="text-blue-200 text-xs mb-1">Humidity</p>
            <p className="font-bold">48%</p>
         </div>
         <div className="text-center">
            <p className="text-blue-200 text-xs mb-1">Rain</p>
            <p className="font-bold">10%</p>
         </div>
      </div>

      {/* Forecast */}
      <div className="space-y-3 relative z-10">
         {[
            { day: "Today", icon: "☀️", temp: "28° / 18°" },
            { day: "Tomorrow", icon: "⛅", temp: "26° / 17°" },
            { day: "Wed", icon: "🌧️", temp: "22° / 16°" },
         ].map((item, i) => (
            <div key={i} className="forecast-item flex justify-between items-center bg-white/10 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors cursor-pointer">
               <span className="font-medium text-sm w-20">{item.day}</span>
               <span className="text-xl">{item.icon}</span>
               <span className="text-sm font-bold w-16 text-right">{item.temp}</span>
            </div>
         ))}
      </div>
    </div>
  );

  if (isPreview) {
    return (
      <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none bg-gray-100 flex items-center justify-center">
         <WeatherCard />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="py-12 bg-gray-50 flex justify-center">
       <WeatherCard />
    </div>
  );
};

export  {Weather_1};