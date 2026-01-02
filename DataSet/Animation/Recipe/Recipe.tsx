import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RecipeProps {
  isPreview?: boolean;
}

const RecipeCard_1: React.FC<RecipeProps> = ({ isPreview = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (isPreview) return;
    const ctx = gsap.context(() => {
       gsap.fromTo(".recipe-content", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" }});
    }, containerRef);
    return () => ctx.revert();
  }, [isPreview]);

  const Content = () => (
    <div className="recipe-content bg-white rounded-3xl shadow-xl overflow-hidden max-w-md mx-auto group">
       {/* Hero Image */}
       <div className="h-64 overflow-hidden relative">
          <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Pizza" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm flex items-center gap-1">
             🔥 Trending
          </div>
          <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-400 hover:text-red-500 transition-colors">
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </button>
       </div>

       {/* Body */}
       <div className="p-6">
          <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-3">
             <span className="flex items-center gap-1"><span className="text-orange-500">⏱</span> 30 Mins</span>
             <span className="flex items-center gap-1"><span className="text-orange-500">🔥</span> 450 Kcal</span>
             <span className="flex items-center gap-1"><span className="text-yellow-500">★</span> 4.9 (2.3k)</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Homemade Pepperoni Pizza</h2>
          <p className="text-gray-500 text-sm mb-6 line-clamp-2">
             Authentic Italian style pizza with a crispy crust, rich tomato sauce, fresh mozzarella, and spicy pepperoni slices.
          </p>

          {/* Ingredients Preview */}
          <div className="flex items-center justify-between">
             <div className="flex -space-x-2">
                {['🍅','🧀','🌿','🥩'].map((emoji, i) => (
                   <div key={i} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm">{emoji}</div>
                ))}
             </div>
             <button className="bg-gray-900 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors">
                View Recipe
             </button>
          </div>
       </div>
    </div>
  );

  if (isPreview) {
    return (
      <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none bg-orange-50 flex items-center justify-center">
         <Content />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="py-12 bg-orange-50 flex justify-center">
       <Content />
    </div>
  );
};

export  {RecipeCard_1};