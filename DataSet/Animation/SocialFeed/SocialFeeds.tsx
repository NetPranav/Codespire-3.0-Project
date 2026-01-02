import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SocialProps {
  isPreview?: boolean;
}

const SocialFeed_1: React.FC<SocialProps> = ({ isPreview = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (isPreview) return;
    const ctx = gsap.context(() => {
       gsap.fromTo(".social-card-anim", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" }});
    }, containerRef);
    return () => ctx.revert();
  }, [isPreview]);

  const SocialCard = () => (
    <div className="social-card-anim bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-md mx-auto">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-red-500 p-[2px]">
               <div className="w-full h-full rounded-full bg-white p-[2px]">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" className="w-full h-full rounded-full object-cover" alt="User" />
               </div>
            </div>
            <div>
               <h4 className="font-bold text-gray-900 text-sm">jessica_travels</h4>
               <p className="text-xs text-gray-500">Kyoto, Japan</p>
            </div>
         </div>
         <button className="text-gray-400 hover:text-gray-600">•••</button>
      </div>

      {/* Image */}
      <div className="aspect-[4/3] bg-gray-100 relative group cursor-pointer">
         <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop" className="w-full h-full object-cover" alt="Post" />
         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
             <div className="text-white font-bold flex items-center gap-2 drop-shadow-lg">
                <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
             </div>
         </div>
      </div>

      {/* Actions */}
      <div className="p-4">
         <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
               <button className="hover:scale-110 transition-transform"><svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg></button>
               <button className="hover:scale-110 transition-transform"><svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg></button>
               <button className="hover:scale-110 transition-transform"><svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg></button>
            </div>
            <button><svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg></button>
         </div>
         
         <p className="font-bold text-sm text-gray-900 mb-1">1,243 likes</p>
         <p className="text-sm text-gray-800 mb-2">
            <span className="font-bold mr-2">jessica_travels</span>
            Lost in the bamboo forest 🎋 The light here is absolutely magical. #kyoto #travel
         </p>
         <p className="text-xs text-gray-400 uppercase tracking-wide">2 HOURS AGO</p>
      </div>
    </div>
  );

  if (isPreview) {
    return (
      <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none bg-gray-50 flex items-center justify-center p-8">
         <SocialCard />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="py-12 bg-gray-50 flex justify-center">
      <SocialCard />
    </div>
  );
};

export {SocialFeed_1};