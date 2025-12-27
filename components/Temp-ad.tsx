'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

// Define TypeScript type for template card properties
interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

// Data for prebuilt templates
const prebuiltTemplates: TemplateCardProps[] = [
  {
    id: 'pb-1',
    title: 'Modern Landing Page',
    description: 'Sleek, responsive design for a high-converting landing experience.',
    image: 'https://images.unsplash.com/photo-1517694712981-197aa5667e41?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'pb-2',
    title: 'E-commerce Product Page',
    description: 'Showcase your products with stunning layouts and smooth interactions.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f4291?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'pb-3',
    title: 'Personal Portfolio',
    description: 'Highlight your work and skills with a professional and engaging design.',
    image: 'https://images.unsplash.com/photo-1461749283748-077c82570e65?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'pb-4',
    title: 'Blog Post Layout',
    description: 'Clean and readable design to make your content shine.',
    image: 'https://images.unsplash.com/photo-1493612276216-ee39245b1067?auto=format&fit=crop&q=80&w=2833&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

// Data for user-pushed/public templates
const publicTemplates: TemplateCardProps[] = [
  {
    id: 'up-1',
    title: 'Community Forum Card',
    description: 'An interactive card design for forum posts and discussions.',    
    image: 'https://images.unsplash.com/photo-1504384308090-c899c366ffb7?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'up-2',
    title: 'Social Media Feed Item',
    description: 'A component replicating a social media feed post with interactions.',
    image: 'https://images.unsplash.com/photo-1496180803448-f8a452bf65d8?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'up-3',
    title: 'Dashboard Widget',
    description: 'A versatile widget for various dashboard metrics and controls.', 
    image: 'https://images.unsplash.com/photo-1544465389-14bb954316d8?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'up-4',
    title: 'Interactive Form Step',
    description: 'A multi-step form component with progress indicators.',
    image: 'https://images.unsplash.com/photo-1510519138101-bcbd6c34b3ef?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function Comp() {
  const compRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cleanupFunctions = useRef<(() => void)[]>([]);

  // Clear all refs to prevent memory leaks
  const clearRefs = useCallback(() => {
    cardRefs.current = [];
    cleanupFunctions.current.forEach(cleanup => cleanup());
    cleanupFunctions.current = [];
  }, []);

  // Store card reference with proper indexing
  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  }, []);

  useEffect(() => {
    clearRefs(); // Clear refs on mount/remount

    if (!compRef.current) return;

    const ctx = gsap.context(() => {
      // Initial load animation for all cards
      gsap.from(cardRefs.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Hover animations for individual cards
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.set(card, { transformOrigin: 'center center' });

        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            y: -5,
            boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
            duration: 0.3,
            ease: 'power2.out',
            zIndex: 10,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            duration: 0.3,
            ease: 'power2.out',
            zIndex: 1,
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        // Store cleanup function
        cleanupFunctions.current[index] = () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      });
    }, compRef);

    // Cleanup function
    return () => {
      ctx.revert();
      clearRefs();
    };
  }, [clearRefs]);

  return (
    <div ref={compRef} className="h-full w-full bg-black text-white p-8 sm:p-12 md:p-16 overflow-y-auto">
      <header className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white mb-4">
          Discover Our Component Library
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
          Explore a vast collection of prebuilt templates and community-contributed components.
        </p>
        <p className="mt-8 text-2xl sm:text-3xl font-semibold text-teal-400">      
          <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
            2000+ components for free!
          </span>
        </p>
      </header>

      <section className="mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center">Prebuilt Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {prebuiltTemplates.map((template, index) => (
            <div
              key={template.id}
              ref={(el) => setCardRef(el, index)}
              className="template-card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group cursor-pointer"   
            >
              <img 
                src={template.image} 
                alt={template.title} 
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{template.title}</h3>
                <p className="text-gray-400 text-sm">{template.description}</p>    
                <button className="mt-4 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center">User-Pushed/Public Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {publicTemplates.map((template, index) => (
            <div
              key={template.id}
              ref={(el) => setCardRef(el, prebuiltTemplates.length + index)}
              className="template-card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group cursor-pointer"   
            >
              <img 
                src={template.image} 
                alt={template.title} 
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{template.title}</h3>
                <p className="text-gray-400 text-sm">{template.description}</p>    
                <button className="mt-4 px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-md hover:bg-cyan-700 transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-gray-500 mt-16 text-sm">
        <p>&copy; {new Date().getFullYear()} Component Library. All rights reserved.</p>
      </footer>
    </div>
  );
}