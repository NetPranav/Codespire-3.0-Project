import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  isPreview?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isPreview = false }) => {
  const footerRef = useRef(null);
  
  // Animation Logic (Only runs if NOT preview)
  useEffect(() => {
    if (isPreview) return; 
    
    // ... (Your existing GSAP animation code) ...
    const ctx = gsap.context(() => {
       gsap.fromTo(footerRef.current, {opacity:0}, {opacity:1});
       // Add your stagger animations here if needed
    }, footerRef);
    return () => ctx.revert();
  }, [isPreview]);

  // Common Content
  const FooterContent = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
            <span className="text-xl font-bold text-white">LazyLayout</span>
          </div>
          <p className="text-gray-400 text-sm">Building the future of UI.</p>
        </div>
        <div className="col-span-1"><h4 className="text-white font-bold mb-4">Product</h4>{/* links */}</div>
        <div className="col-span-1"><h4 className="text-white font-bold mb-4">Resources</h4>{/* links */}</div>
        <div className="col-span-1"><h4 className="text-white font-bold mb-4">Newsletter</h4>{/* input */}</div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-gray-500 text-sm">© 2024 LazyLayout Inc.</div>
    </div>
  );

  /* --- PREVIEW MODE STYLES (Robust Fix) --- */
  if (isPreview) {
    return (
      <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none bg-gray-50 flex flex-col justify-end">
        {/* STRATEGY: 
           1. We make a box that is double height and width (200%).
           2. We scale it down by 50% from the top-left corner.
           3. We use 'justify-end' to push the footer to the bottom of that box.
           This ensures the footer sits exactly at the bottom of the visual card.
        */}
        
        {/* Skeleton Content (Fills the space above footer) */}
        <div className="w-full flex-1 p-8 opacity-40 flex flex-col items-center justify-center gap-6">
           <div className="w-3/4 h-32 bg-gray-200 rounded-xl"></div>
           <div className="w-full grid grid-cols-2 gap-4">
              <div className="h-20 bg-gray-200 rounded-xl"></div>
              <div className="h-20 bg-gray-200 rounded-xl"></div>
           </div>
        </div>

        {/* The Footer */}
        <footer className="w-full bg-gray-950 py-10 border-t border-gray-800">
          <FooterContent />
        </footer>
      </div>
    );
  }

  /* --- REAL MODE STYLES --- */
  return (
    <footer ref={footerRef} className="bg-gray-950 py-16 border-t border-gray-800">
      <FooterContent />
    </footer>
  );
};

export default Footer;