import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PricingProps {
  isPreview?: boolean;
}

const Pricing_1: React.FC<PricingProps> = ({ isPreview = false }) => {
  const containerRef = useRef(null);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    if (isPreview) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".price-header-anim",
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

      // Cards Stagger
      gsap.fromTo(
        ".price-card-anim",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          delay: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isPreview]);

  const plans = [
    {
      name: "Starter",
      desc: "Perfect for side projects",
      price: isAnnual ? 0 : 0,
      features: ["1 Project", "Community Support", "Basic Analytics"],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      desc: "For serious developers",
      price: isAnnual ? 12 : 15,
      features: ["Unlimited Projects", "Priority Support", "Advanced Analytics", "Custom Domain"],
      cta: "Try Pro Free",
      highlight: true,
    },
    {
      name: "Business",
      desc: "For teams and scaling",
      price: isAnnual ? 49 : 59,
      features: ["Unlimited Team Members", "SSO & Security", "Dedicated Manager", "SLA"],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  const PricingContent = () => (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 price-header-anim">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
          Simple, transparent pricing
        </h2>
        <p className="text-gray-500 text-lg mb-8">
          No hidden fees. Switch or cancel anytime.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-8 bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-md transition-transform duration-300 ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Yearly <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full ml-1">-20%</span>
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`price-card-anim relative p-8 bg-white rounded-2xl transition-all duration-300 ${
              plan.highlight 
                ? 'shadow-xl ring-2 ring-blue-600 scale-105 z-10' 
                : 'shadow-sm border border-gray-100 hover:shadow-lg'
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Most Popular
              </div>
            )}
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
            <p className="text-sm text-gray-500 mb-6">{plan.desc}</p>
            
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold tracking-tight text-gray-900">${plan.price}</span>
              <span className="text-gray-500 ml-1">/mo</span>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-blue-600 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
                plan.highlight
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30'
                  : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  /* --- PREVIEW MODE --- */
  if (isPreview) {
    return (
      <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none bg-gray-50 flex items-center justify-center">
        {/* Forces the content to scale down nicely */}
        <div className="w-full h-full overflow-hidden flex items-center">
           <PricingContent />
        </div>
      </div>
    );
  }

  /* --- REAL MODE --- */
  return (
    <section ref={containerRef} className="bg-gray-50 min-h-screen flex items-center">
      <PricingContent />
    </section>
  );
};

export {Pricing_1};