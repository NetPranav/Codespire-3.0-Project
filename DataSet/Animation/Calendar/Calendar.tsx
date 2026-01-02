import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CalendarProps {
  isPreview?: boolean;
}

const CalendarWidget_1: React.FC<CalendarProps> = ({ isPreview = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (isPreview) return;
    const ctx = gsap.context(() => {
       gsap.fromTo(".calendar-anim", { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" }});
    }, containerRef);
    return () => ctx.revert();
  }, [isPreview]);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const Content = () => (
    <div className="calendar-anim bg-white rounded-3xl shadow-xl p-8 max-w-sm mx-auto border border-gray-100">
       <div className="flex items-center justify-between mb-8">
          <div>
             <h2 className="text-2xl font-bold text-gray-900">September</h2>
             <p className="text-gray-400 text-sm font-medium">2025</p>
          </div>
          <div className="flex gap-2">
             <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 text-gray-600">←</button>
             <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 text-gray-600">→</button>
          </div>
       </div>

       {/* Week Days */}
       <div className="grid grid-cols-7 mb-4">
          {weekDays.map(day => (
             <div key={day} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wide py-2">
                {day}
             </div>
          ))}
       </div>

       {/* Days Grid */}
       <div className="grid grid-cols-7 gap-y-2">
          {/* Empty placeholders for start of month */}
          <div className="col-span-2"></div>
          
          {days.map(day => {
             const isSelected = day === 18;
             const hasEvent = [4, 12, 18, 24].includes(day);
             return (
                <div key={day} className="flex justify-center">
                   <div className={`
                      w-10 h-10 rounded-full flex flex-col items-center justify-center text-sm font-medium cursor-pointer transition-all relative
                      ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'text-gray-700 hover:bg-gray-50'}
                   `}>
                      {day}
                      {hasEvent && !isSelected && (
                         <div className="w-1 h-1 rounded-full bg-blue-500 mt-1"></div>
                      )}
                   </div>
                </div>
             )
          })}
       </div>

       {/* Upcoming Events */}
       <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
          <div className="flex items-start gap-4">
             <div className="w-1 h-10 bg-blue-500 rounded-full"></div>
             <div>
                <p className="text-sm font-bold text-gray-900">Team Meeting</p>
                <p className="text-xs text-gray-500">10:00 AM - 11:30 AM</p>
             </div>
          </div>
          <div className="flex items-start gap-4">
             <div className="w-1 h-10 bg-purple-500 rounded-full"></div>
             <div>
                <p className="text-sm font-bold text-gray-900">Project Review</p>
                <p className="text-xs text-gray-500">2:00 PM - 3:00 PM</p>
             </div>
          </div>
       </div>
    </div>
  );

  if (isPreview) {
    return (
      <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none bg-gray-50 flex items-center justify-center">
         <Content />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="py-12 bg-gray-50 flex justify-center">
       <Content />
    </div>
  );
};

export {CalendarWidget_1};