"use client"
import React, { useState } from 'react';
import { ShieldCheck, Eye, Database, Share2, Mail, Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('data-collection');

  const sections = [
    { id: 'data-collection', title: 'Data Collection', icon: <Database size={18} /> },
    { id: 'component-visibility', title: 'Public vs Private', icon: <Share2 size={18} /> },
    { id: 'data-usage', title: 'How we use it', icon: <Eye size={18} /> },
    { id: 'security', title: 'Infrastructure Security', icon: <Lock size={18} /> },
    { id: 'contact', title: 'Rights & Contact', icon: <Mail size={18} /> },
  ];

  const scrollToSection = (id:string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-purple-500/30">
      {/* Subtle Glow Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 lg:flex gap-16">
        
        {/* Left Sidebar: Navigation (Sticky) */}
        <aside className="lg:w-1/4 mb-12 lg:mb-0">
          <div className="sticky top-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">Security Center</h2>
            </div>
            
            <nav className="flex flex-col gap-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeSection === section.id 
                    ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                    : 'hover:bg-white/5 text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {section.icon}
                  {section.title}
                </button>
              ))}
            </nav>

            <div className="mt-12 p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5">
              <p className="text-xs text-gray-400 leading-relaxed italic">
                "We built LazyLayout to simplify UI design, not to complicate your privacy."
              </p>
            </div>
          </div>
        </aside>

        {/* Right Content: The Policy */}
        <main className="lg:w-3/4 space-y-24 pb-40">
          
          <header>
            <h1 className="text-5xl font-bold text-white mb-6">Privacy Policy</h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Last updated: October 2023. We believe in minimal data collection and maximum transparency for our developers.
            </p>
          </header>

          {/* Section: Data Collection */}
          <section id="data-collection">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-sm font-mono text-purple-400">01</span>
              Data Collection
            </h3>
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-6">
              <p>We only collect the bits and bytes necessary to keep your account running:</p>
              <ul className="grid md:grid-cols-2 gap-4 text-sm">
                <li className="p-4 bg-black rounded-xl border border-white/5">
                  <strong className="text-white block mb-1 underline decoration-purple-500/50">Identity</strong>
                  Your email and username when you sign up via Auth providers (GitHub/Google).
                </li>
                <li className="p-4 bg-black rounded-xl border border-white/5">
                  <strong className="text-white block mb-1 underline decoration-purple-500/50">Component Metadata</strong>
                  Config JSON, CSS, and HTML strings you save in your cards.
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Public vs Private */}
          <section id="component-visibility">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-sm font-mono text-blue-400">02</span>
              The "Public Card" Protocol
            </h3>
            <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
              <p className="mb-4">
                LazyLayout is built on the concept of sharing. When you click <code className="text-purple-400 font-mono">Publish</code> on a card:
              </p>
              <blockquote className="border-l-2 border-purple-500 pl-6 my-6 bg-purple-500/5 py-4 pr-4 rounded-r-xl">
                Your component code, username, and layout become visible to the public via a unique URL. Anyone with the link can view and use the component card.
              </blockquote>
              <p>
                Components marked as <strong>Private</strong> are encrypted in transit and only accessible via your authenticated session. We do not index private cards for search engines.
              </p>
            </div>
          </section>

          {/* Section: Security */}
          <section id="security">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-sm font-mono text-emerald-400">03</span>
              Security Infrastructure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-emerald-400 font-mono text-xl mb-2">SSL</div>
                <p className="text-xs">End-to-end encryption for all card data.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-emerald-400 font-mono text-xl mb-2">OAuth 2.0</div>
                <p className="text-xs">We never store your passwords directly.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-emerald-400 font-mono text-xl mb-2">Cloud</div>
                <p className="text-xs">Hosted on secure, enterprise-grade servers.</p>
              </div>
            </div>
          </section>

          {/* Section: Contact */}
          <section id="contact" className="pt-12 border-t border-white/10 text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Request Data Deletion</h3>
            <p className="text-gray-400 mb-8 text-sm">
              Want to wipe your layouts from our servers? No problem. Email us and we will purge your account and all associated cards within 48 hours.
            </p>
            <a 
              href="mailto:privacy@lazylayout.in" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
            >
              <Mail size={18} />
              privacy@lazylayout.in
            </a>
          </section>

        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;