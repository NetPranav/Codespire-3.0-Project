import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CardGridProps {
  isPreview?: boolean;
}

// Mock Data for the cards
const sampleCards = [
  {
    id: 1,
    category: "Technology",
    title: "The Future of AI UI",
    description: "Exploring how artificial intelligence is reshaping user interface design patterns.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
  },
  {
    id: 2,
    category: "Design",
    title: "Minimalist Workspaces",
    description: "A curated collection of desk setups that inspire productivity and calm.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&h=300&fit=crop",
  },
  {
    id: 3,
    category: "Development",
    title: "React Server Components",
    description: "Understanding the paradigm shift in building modern React applications.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
  },
  {
    id: 4,
    category: "Productivity",
    title: "Mastering Deep Work",
    description: "Strategies to regain focus in a distracted world.",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&h=300&fit=crop",
  },
  {
    id: 5,
    category: "Nature",
    title: "Sustainable Living",
    description: "Practical tips for reducing your carbon footprint at home.",
    image: "https://images.unsplash.com/photo-1542601902048-2297c8c962c0?w=500&h=300&fit=crop",
  },
  {
    id: 6,
    category: "Travel",
    title: "Hidden Gems of Japan",
    description: "Off the beaten path locations you need to visit on your next trip.",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=500&h=300&fit=crop",
  },
];

const CardGrid_1: React.FC<CardGridProps> = ({ isPreview = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (isPreview) return;

    const ctx = gsap.context(() => {
      // 1. Header Animation
      gsap.fromTo(
        ".grid-header-anim",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. Cards Stagger Animation
      // We start them with opacity 0 in CSS to avoid flash before JS loads
      gsap.fromTo(
        ".grid-card-anim",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.5)", // Nice "pop" effect
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isPreview]);

  // The individual card sub-component
  const GridCard = ({ item }: { item: any }) => (
    <div className="group h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col">
      {/* Image Container */}
      <div className="h-48 overflow-hidden relative bg-gray-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
          {item.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-1">
          {item.description}
        </p>
        
        {/* Footer / Link */}
        <div className="flex items-center text-blue-600 font-semibold text-sm">
          Read Article
          <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );

  /* --- PREVIEW MODE --- */
  if (isPreview) {
    return (
      <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none bg-gray-50 overflow-hidden flex flex-col">
        {/* Fake Header to give context */}
        <div className="w-full bg-white py-12 px-8 border-b border-gray-100 flex flex-col items-center text-center mb-8">
           <div className="h-8 w-64 bg-gray-800 rounded mb-4"></div>
           <div className="h-4 w-96 bg-gray-300 rounded"></div>
        </div>

        {/* The Grid Section Container */}
        <div className="flex-1 px-8 pb-16">
            <div className="max-w-7xl mx-auto">
                {/* The Grid itself - forcing 3 columns for desktop look */}
                <div className="grid grid-cols-3 gap-8">
                    {sampleCards.slice(0, 6).map((card) => (
                        <GridCard key={card.id} item={card} />
                    ))}
                </div>
            </div>
        </div>
      </div>
    );
  }

  /* --- REAL MODE --- */
  return (
    <section ref={containerRef} className="py-24 bg-gray-50 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 grid-header-anim">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest Articles & News
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover insights, tutorials, and trends from our team of experts.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleCards.map((card) => (
            // We add opacity-0 here so GSAP handles the fade-in entry
            <div key={card.id} className="grid-card-anim opacity-0 h-full">
              <GridCard item={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export {CardGrid_1};