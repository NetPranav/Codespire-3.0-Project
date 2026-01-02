"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  isPreview?: boolean;
}

const Navbar_1: React.FC<NavbarProps> = ({ isPreview = false }) => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Animation Logic (Skipped in Preview)
  useEffect(() => {
    if (isPreview) return;

    const tl = gsap.timeline();
    tl.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    ).fromTo(
      [logoRef.current, linksRef.current?.children, ctaRef.current],
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    );

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";
      if (currentScrollY > 50 && direction === "down" && !isMobileMenuOpen) {
        gsap.to(navRef.current, {
          y: -100,
          duration: 0.3,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.3, ease: "power2.inOut" });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen, isPreview]);

  // Mobile Menu Logic (Skipped in Preview)
  useEffect(() => {
    if (isPreview) return;
    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        display: "block",
        duration: 0.5,
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        display: "none",
        duration: 0.3,
      });
    }
  }, [isMobileMenuOpen, isPreview]);

  /* --- PREVIEW MODE STYLES --- */
  if (isPreview) {
    return (
      <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none bg-gray-50">
        {/* FIX 1: Removed 'p-8' from this outer div. 
           FIX 2: Added h-[200%] and bg-gray-50 to simulate a full page background.
        */}
        
        {/* The Navbar Itself */}
        <div className="w-full bg-white/90 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex items-center justify-between z-10 relative">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md">
              L
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              LazyLayout
            </span>
          </div>

          {/* Links - Always Visible in Preview */}
          <div className="flex items-center space-x-10">
            {["Templates", "Components", "Pricing", "Docs"].map((item) => (
              <span
                key={item}
                className="text-gray-600 font-medium text-lg relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full"></span>
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <button className="px-8 py-3 bg-gray-900 text-white text-lg font-bold rounded-xl shadow-lg">
              Get Access
            </button>
          </div>
        </div>

        {/* FIX 3: Skeleton / Dummy Content Below Navbar 
            This fills the empty space in the card so it looks like a real page screenshot.
        */}
        <div className="w-full px-8 py-12 flex flex-col items-center space-y-6 opacity-40">
           {/* Fake Hero Text */}
           <div className="h-12 w-2/3 bg-gray-300 rounded-lg"></div>
           <div className="h-4 w-1/2 bg-gray-200 rounded-lg"></div>
           
           {/* Fake Hero Cards */}
           <div className="grid grid-cols-3 gap-6 w-full mt-8">
              <div className="h-40 bg-gray-200 rounded-xl"></div>
              <div className="h-40 bg-gray-200 rounded-xl"></div>
              <div className="h-40 bg-gray-200 rounded-xl"></div>
           </div>
        </div>
      </div>
    );
  }

  /* --- REAL MODE STYLES --- */
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-6 px-4">
      <div
        ref={navRef}
        className="w-full max-w-5xl bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300 relative"
      >
        <div
          ref={logoRef}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform duration-300">
            L
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            LazyLayout
          </span>
        </div>

        <div ref={linksRef} className="hidden md:flex items-center space-x-8">
          {["Templates", "Components", "Pricing", "Docs"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div ref={ctaRef} className="flex items-center gap-4">
          <button className="hidden md:block px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gray-900/20">
            Get Access
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600"
          >
            {/* ... hamburger icons ... */}
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

interface NavbarProps {
  isPreview?: boolean;
}

const Navbar_2: React.FC<NavbarProps> = ({ isPreview = false }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  /* ===========================
     GSAP (REAL MODE ONLY)
  ============================ */
  useEffect(() => {
    if (isPreview) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(
        linksRef.current?.children,
        { y: -15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          delay: 0.1,
          duration: 0.5,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, delay: 0.3, duration: 0.5 }
      );
    }, navRef);

    return () => ctx.revert();
  }, [isPreview]);

  /* ===========================
     PREVIEW MODE (CARD SAFE)
  ============================ */
  if (isPreview) {
    return (
      <div className="w-full h-[72px] rounded-xl bg-white shadow-md px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>

        {/* Fake links */}
        <div className="hidden sm:flex gap-4">
          <div className="h-3 w-10 bg-gray-200 rounded" />
          <div className="h-3 w-10 bg-gray-200 rounded" />
          <div className="h-3 w-10 bg-gray-200 rounded" />
        </div>

        {/* CTA */}
        <div className="h-8 w-16 bg-gray-300 rounded-lg" />
      </div>
    );
  }

  /* ===========================
     REAL MODE (FULL NAVBAR)
  ============================ */
  return (
    <nav
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-2 font-bold">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
            L
          </div>
          <span className="text-gray-900">LazyLayout</span>
        </div>

        {/* Links */}
        <div
          ref={linksRef}
          className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700"
        >
          {["Templates", "Docs", "Pricing", "Community"].map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-gray-900 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button
          ref={ctaRef}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export {Navbar_1, Navbar_2};
