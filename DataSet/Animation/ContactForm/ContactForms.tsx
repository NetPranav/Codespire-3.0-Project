import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContactFormProps {
  isPreview?: boolean;
}

const ContactForm_1: React.FC<ContactFormProps> = ({ isPreview = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (isPreview) return;

    const ctx = gsap.context(() => {
      // 1. Panel Slide In
      gsap.fromTo(
        ".contact-left-panel",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // 2. Form Fields Stagger
      gsap.fromTo(
        ".contact-input-anim",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isPreview]);

  const ContactContent = () => (
    <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white max-w-6xl mx-auto min-h-[600px]">
      {/* Left Panel: Info */}
      <div className="contact-left-panel lg:w-5/12 bg-gray-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
        {/* Abstract Background Blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full filter blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-[80px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-6">Get in touch</h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            Fill out the form and our team will get back to you within 24 hours.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-blue-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="font-medium">+1 (555) 000-0000</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-blue-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-medium">support@lazylayout.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex gap-4 mt-12 lg:mt-0">
          {[1,2,3,4].map(i => (
             <div key={i} className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-600 transition-colors cursor-pointer flex items-center justify-center">
                {/* Social Icon Placeholder */}
                <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
             </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="lg:w-7/12 p-12 bg-white">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-6">
            <div className="contact-input-anim group">
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="John" />
            </div>
            <div className="contact-input-anim group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="Doe" />
            </div>
          </div>
          
          <div className="contact-input-anim group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input type="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
          </div>

          <div className="contact-input-anim group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
          </div>

          <button className="contact-input-anim w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );

  /* --- PREVIEW MODE --- */
  if (isPreview) {
    return (
      <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none bg-gray-100 flex items-center justify-center">
        {/* We use scale-50 and flex-center to position the large form card nicely in the middle of the preview area */}
        <div className="w-[90%] transform scale-90">
           <ContactContent />
        </div>
      </div>
    );
  }

  /* --- REAL MODE --- */
  return (
    <section ref={containerRef} className="py-24 px-6 bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full">
         <ContactContent />
      </div>
    </section>
  );
};

export {ContactForm_1};