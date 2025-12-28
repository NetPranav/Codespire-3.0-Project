"use client"
import React, { useState } from 'react';
import { Save, Shield, Code, BarChart, Info } from 'lucide-react'; // Assuming you use Lucide or similar icons

const CookiePolicy = () => {
  // State management for the toggles
  const [preferences, setPreferences] = useState({
    essential: true, // Locked
    functional: true,
    analytics: false,
    marketing: false
  });

  const [hasSaved, setHasSaved] = useState(false);

  // Toggle Handler
  const toggleCookie = (type: keyof typeof preferences) => {
    if (type === 'essential') return; // Prevent toggling essential
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    setHasSaved(false); // Reset save state if they change something
  };

  // Save Handler (Mock functionality)
  const savePreferences = () => {
    console.log("Saving preferences to local storage:", preferences);
    // Here you would essentially run: localStorage.setItem('cookie_prefs', JSON.stringify(preferences));
    setHasSaved(true);
    setTimeout(() => setHasSaved(false), 3000); // Reset button after 3 seconds
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-indigo-500/30">
      {/* Background Gradient Mesh */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-6">
            <Shield size={12} />
            <span>PRIVACY PROTOCOL v2.0</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Configure your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Data Experience.
            </span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
            At <strong>lazylayout.in</strong>, we treat cookies like components. Some are essential for the layout to render, while others just add flavor. Use this dashboard to control how your browser interacts with our Public Cards and Builder.
          </p>
        </div>

        {/* Control Grid */}
        <div className="grid gap-6">

          {/* Card 1: Essential (Locked) */}
          <CookieCard 
            icon={<Code className="text-emerald-400" />}
            title="The Kernel (Strictly Necessary)"
            category="essential"
            isActive={preferences.essential}
            isLocked={true}
            onToggle={() => toggleCookie('essential')}
          >
            <p>
              These are the non-negotiables. They handle <strong>authentication tokens</strong> so you can edit your components, and ensure <strong>CSRF security</strong> when you generate public pages. Without these, the site is just static HTML.
            </p>
          </CookieCard>

          {/* Card 2: Functional */}
          <CookieCard 
            icon={<Info className="text-blue-400" />}
            title="Builder State (Functional)"
            category="functional"
            isActive={preferences.functional}
            isLocked={false}
            onToggle={() => toggleCookie('functional')}
          >
            <p>
              Used to remember your IDE preferences. This includes saving your <strong>"Dark/Light" mode</strong> toggles, keeping your <strong>sidebar open/closed</strong>, and temporarily caching your unsaved card edits in local storage so you don't lose work on refresh.
            </p>
          </CookieCard>

          {/* Card 3: Analytics */}
          <CookieCard 
            icon={<BarChart className="text-purple-400" />}
            title="Card Metrics (Analytics)"
            category="analytics"
            isActive={preferences.analytics}
            isLocked={false}
            onToggle={() => toggleCookie('analytics')}
          >
            <p>
              This helps us track the performance of your <strong>Public Cards</strong>. We count unique views and load times to help you optimize your components. Data is aggregated and anonymous—we don't track your personal browsing history.
            </p>
          </CookieCard>

        </div>

        {/* Action Area */}
        <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div className="text-sm text-gray-400">
            <p>By clicking save, you agree to the stored preferences.</p>
            <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors border-b border-indigo-400/30 pb-0.5">Read full Legal Policy</a>
          </div>
          
          <button 
            onClick={savePreferences}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform active:scale-95 ${
              hasSaved 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
            }`}
          >
            {hasSaved ? (
              <><span>Preferences Saved</span></>
            ) : (
              <><Save size={18} /> <span>Save Configuration</span></>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

// Reusable Card Component
const CookieCard = ({ icon, title, category, isActive, isLocked, onToggle, children }: {
  icon: React.ReactNode;
  title: string;
  category: string;
  isActive: boolean;
  isLocked: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div 
      onClick={!isLocked ? onToggle : undefined}
      className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
        isActive 
          ? 'bg-white/[0.03] border-white/10' 
          : 'bg-transparent border-white/5 opacity-70 hover:opacity-100'
      } ${!isLocked ? 'cursor-pointer hover:border-white/20' : ''}`}
    >
      <div className="flex items-start gap-5">
        
        {/* Icon Box */}
        <div className={`mt-1 p-3 rounded-xl bg-black border border-white/10 shadow-inner ${!isActive && 'grayscale opacity-50'}`}>
          {icon}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-xl font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}>
              {title}
            </h3>
            
            {/* The Toggle Switch */}
            <div className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
              isActive ? 'bg-indigo-600' : 'bg-gray-700'
            } ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
              <div className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-lg transform transition-transform duration-300 ${
                isActive ? 'translate-x-6' : 'translate-x-0'
              }`}></div>
            </div>
          </div>

          <div className="text-gray-400 text-sm leading-relaxed pr-8">
            {children}
          </div>
        </div>
      </div>
      
      {/* Locked Badge */}
      {isLocked && (
        <div className="absolute top-6 right-20 text-[10px] uppercase tracking-wider font-bold text-gray-500 border border-gray-700 px-2 py-1 rounded bg-black/50">
          Required
        </div>
      )}
    </div>
  );
};

export default CookiePolicy;