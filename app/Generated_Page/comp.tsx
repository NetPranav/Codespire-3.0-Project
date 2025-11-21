'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Comp: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    // GSAP Animation
    if (logoRef.current && linksRef.current.length > 0) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(logoRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(
          linksRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          '-=0.5' // Start links animation before logo finishes
        );
    }

    // GSAP Cleanup
    return () => {
      gsap.killTweensOf(logoRef.current);
      gsap.killTweensOf(linksRef.current);
    };
  }, []);

  return (
    <div className="h-full w-full bg-gray-950 text-white font-sans">
      <nav
        ref={navRef}
        className="flex items-center justify-between p-4 md:px-8 shadow-lg bg-gray-900"
      >
        {/* Logo/Brand Area */}
        <div ref={logoRef} className="flex-shrink-0">
          <a href="#" className="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors duration-300">
            MyBrand
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 md:space-x-8">
          {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              ref={(el) => { linksRef.current[index] = el; }}
              className="text-lg text-gray-200 hover:text-indigo-400 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
      {/* Example content to show navbar in context */}
      <div className="flex items-center justify-center h-[calc(100%-4rem)]"> {/* Adjust height based on nav bar height */}
        <p className="text-xl text-gray-400">Scroll to see more content...</p>
      </div>
    </div>
  );
};

export default Comp;