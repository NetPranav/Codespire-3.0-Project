import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ForumProps {
  isPreview?: boolean;
}

const Forum_1: React.FC<ForumProps> = ({ isPreview = false }) => {
  const containerRef = useRef(null);

  const threads = [
    {
      id: 1,
      title: "Best practices for React Server Components?",
      author: "Sarah Jenkins",
      avatar: "bg-purple-500",
      votes: 42,
      responses: 15,
      tags: ["React", "Next.js"],
      time: "2h ago",
    },
    {
      id: 2,
      title: "How to optimize Tailwind CSS build size",
      author: "Mike Ross",
      avatar: "bg-blue-500",
      votes: 38,
      responses: 8,
      tags: ["CSS", "Optimization"],
      time: "4h ago",
    },
    {
      id: 3,
      title: "Understanding GSAP Timeline basics",
      author: "Alex Chen",
      avatar: "bg-green-500",
      votes: 25,
      responses: 12,
      tags: ["Animation", "GSAP"],
      time: "6h ago",
    },
  ];

  useEffect(() => {
    if (isPreview) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".forum-item-anim",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isPreview]);

  const ForumContent = () => (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="font-bold text-gray-900 text-lg">Discussions</h3>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          New Discussion
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100">
        {threads.map((thread) => (
          <div key={thread.id} className="forum-item-anim p-6 hover:bg-gray-50 transition-colors group cursor-pointer">
            <div className="flex gap-4">
              {/* Vote Control */}
              <div className="flex flex-col items-center gap-1 min-w-[3rem]">
                <button className="text-gray-400 hover:text-orange-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                </button>
                <span className="font-bold text-gray-700">{thread.votes}</span>
                <button className="text-gray-400 hover:text-blue-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {thread.title}
                </h4>
                <div className="flex items-center gap-2 mb-3">
                  {thread.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                   <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full ${thread.avatar}`}></div>
                      <span>Posted by <span className="font-medium text-gray-700">{thread.author}</span></span>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        {thread.responses}
                      </span>
                      <span>{thread.time}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-500 font-medium cursor-pointer hover:text-blue-600">
         View all discussions →
      </div>
    </div>
  );

  if (isPreview) {
    return (
      <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none bg-gray-100 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
           <ForumContent />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="py-12 px-4 bg-gray-100 min-h-[400px] flex items-center justify-center">
      <div className="w-full">
         <ForumContent />
      </div>
    </div>
  );
};

export  {Forum_1};