// test_2 ---------------Burhan Left I changed Dynamic Island as it was not working 
"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import * as Babel from "@babel/standalone";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Download,
  MessageSquare,
  RefreshCw,
  Send,
  Sparkles,
  X,
  MoveVertical,
  Sun,
  Moon,
  DollarSign,
  PlayCircle,
  Mail, Lock, Eye, Github, 
  Truck
} from "lucide-react";

// Register GSAP plugins immediately
gsap.registerPlugin(ScrollTrigger);

type Message = {
  role: "user" | "ai";
  text: string;
};


// --- SAFE CODE CLEANING ---
function cleanGeneratedCode(code: string): string {
  if (!code) return "";
  let cleanCode = code.trim();

  // Remove markdown code blocks
  cleanCode = cleanCode.replace(/```[\s\S]*?\n/g, "");
  cleanCode = cleanCode.replace(/```/g, "");
  cleanCode = cleanCode.replace(/^(tsx|jsx|typescript|javascript)\n/, "");

  // Fix import syntax errors (common AI mistake)
  cleanCode = cleanCode.replace(
    /import\s+\(([^)]+)\)\s+from\s+['"]([^'"]+)['"]/g,
    'import {$1} from "$2"'
  );

  return cleanCode;
}

// --- IMPROVED CODE CLEANING FUNCTION (CRITICAL FIX) ---
// function cleanGeneratedCode(code: string): string {
//   if (!code) return "";
//   let cleanCode = code.trim();

//   // Remove markdown code blocks
//   cleanCode = cleanCode.replace(/```[\s\S]*?\n/g, "");
//   cleanCode = cleanCode.replace(/```/g, "");
//   cleanCode = cleanCode.replace(/^(tsx|jsx|typescript|javascript)\n/, "");

//   // CRITICAL FIX: Smartly handle the 'function Comp' definition
//   // This regex looks for 'Comp() {' and ensures it has exactly one 'function' keyword before it.
//   // It fixes cases where the AI returns "Comp() {" OR "function Comp() {" without duplicating the keyword.
//   cleanCode = cleanCode.replace(/(?:function\s+)?Comp\(\)\s*\{/g, "function Comp() {");

//   // Fix array syntax: (name: 'Home', href: '#') should be {name: 'Home', href: '#'}
//   cleanCode = cleanCode.replace(
//     /\(\s*name:\s*['"]([^'"]+)['"]\s*,\s*href:\s*['"]([^'"]+)['"]\s*\)/g,
//     '{name: "$1", href: "$2"}'
//   );

//   // Fix import syntax errors
//   cleanCode = cleanCode.replace(
//     /import\s+\(([^)]+)\)\s+from\s+['"]([^'"]+)['"]/g,
//     'import {$1} from "$2"'
//   );

//   return cleanCode;
// }

// --- DYNAMIC COMPONENT RENDERER (PRODUCTION) ---
// --- DYNAMIC COMPONENT RENDERER (PRODUCTION FIXED) ---
// --- DYNAMIC COMPONENT RENDERER (FINAL FIX) ---
function DynamicComponent({ code }: { code: string }) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;

    try {
      // 1. Heavy Cleaning & Sanitization
      let cleanCode = code.trim();

      // Remove imports/exports/directives
      cleanCode = cleanCode.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, "");
      cleanCode = cleanCode.replace(/import\s+['"][^'"]+['"];?/g, "");
      cleanCode = cleanCode.replace(/['"]use client['"];?/g, "");
      cleanCode = cleanCode.replace(/gsap\.registerPlugin\([^)]+\);?/g, "");
      cleanCode = cleanCode.replace(/export\s+default\s+/g, "");
      cleanCode = cleanCode.replace(/export\s+/g, "");

      // 2. Prepare the Sandbox Environment
      const fullCode = `
        // --- CRITICAL FIX: Add useLayoutEffect here ---
        const { 
          useState, 
          useEffect, 
          useLayoutEffect, 
          useRef, 
          useMemo, 
          useCallback 
        } = React;
        
        // Destructure icons from the provided argument
        const { 
          ChevronLeft = () => null, 
          Download = () => null, 
          MessageSquare = () => null, 
          RefreshCw = () => null, 
          Send = () => null, 
          Sparkles = () => null, 
          X = () => null, 
          MoveVertical = () => null,
          Menu = () => null, 
          ArrowRight = () => null, 
          Check = () => null, 
          Star = () => null, 
          User = () => null,
          Mail = () => null,
          Search = () => null,
          Bell = () => null,
          Settings = () => null,
          Home = () => null,
          Sun = () => null,
          Moon = () => null,
          DollarSign = () =>null,
          PlayCircle = () => null,
          Lock = () => null,
          Eye = () => null,
        } = providedIcons;

        // --- USER CODE STARTS HERE ---
        ${cleanCode}
        // --- USER CODE ENDS HERE ---
      `;

      // 3. Transpile
      const transformed = Babel.transform(fullCode, {
        presets: ["react", "typescript"],
        filename: "component.tsx",
        plugins: ["transform-modules-commonjs"],
      }).code;

      // 4. Execute
      const executeCode = new Function("React", "gsap", "ScrollTrigger", "providedIcons", `
        try {
          ${transformed}
          
          if (typeof Comp !== 'undefined') return Comp;
          if (typeof App !== 'undefined') return App;
          if (typeof Main !== 'undefined') return Main;
          return null;
        } catch (err) {
          throw err;
        }
      `);

      // 5. Injection
      const GeneratedComponent = executeCode(React, gsap, ScrollTrigger, {
        ChevronLeft, Download, MessageSquare, RefreshCw, Send, Sparkles, X, MoveVertical,Sun,Moon,DollarSign,Github, Truck 
        // Add other icons if you have them imported
      });

      if (GeneratedComponent) {
        setComponent(() => GeneratedComponent);
        setError(null);
      } else {
        throw new Error("Could not find a valid React component.");
      }

    } catch (err: any) {
      console.error("Render Error:", err);
      setError(err.message);
    }
  }, [code]);

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 border-l-2 border-red-500 text-red-400 font-mono text-sm overflow-auto h-full w-full">
        <div className="font-bold mb-2">Render Error:</div>
        <pre className="whitespace-pre-wrap">{error}</pre>
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <Component />;
}


// --- MAIN CONTENT COMPONENT ---
function AIWebsiteGeneratorContent() {
  const searchParams = useSearchParams();
  const promptFromUrl = searchParams.get("prompt") || "";

  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [componentCode, setComponentCode] = useState<string>("");
  const [hasGeneratedContent, setHasGeneratedContent] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Dragging State
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // Initialize from URL prompt if present
  useEffect(() => {
    if (promptFromUrl) setPrompt(promptFromUrl);
  }, [promptFromUrl]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isChatExpanded]);

  // --- DRAG HANDLING (PRESERVED) ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    setIsDragging(true);
    setStartY(e.pageY - previewRef.current.offsetTop);
    setScrollTop(previewRef.current.scrollTop);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !previewRef.current) return;
    const y = e.pageY - previewRef.current.offsetTop;
    const walk = (y - startY) * 2;
    previewRef.current.scrollTop = scrollTop - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  // Global drag cleanup
  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && previewRef.current) {
        const y = e.pageY - previewRef.current.getBoundingClientRect().top;
        const walk = (y - startY) * 2;
        previewRef.current.scrollTop = scrollTop - walk;
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, startY, scrollTop]);

  // --- API HANDLER (CORE LOGIC) ---
  const handleSubmitPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    const userPrompt = prompt;
    setPrompt("");
    setIsGenerating(true);
    setHasGeneratedContent(true);
    setChatHistory((prev) => [...prev, { role: "user", text: userPrompt }]);

    try {
      // Step 1: Get description from Gemini-talk
      const enhancedPrompt = `Generate a React/TypeScript component description for: "${userPrompt}"

IMPORTANT: The generated code MUST follow these EXACT rules:
1. Component MUST be named exactly "Comp"
2. Use "function Comp() { ... }" syntax
3. Use GSAP for animations
4. Use Tailwind CSS for styling
5. Include proper TypeScript interfaces/types
6. Return only the description, not the code yet.`;

      const res = await fetch("./api/Gemini-talk/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: enhancedPrompt }),
      });
      
      const data = await res.json();

      if (data.text) {
        const aiResponse = data.text;
        setChatHistory((prev) => [...prev, { role: "ai", text: aiResponse }]);

        // Step 2: Generate code from Gemini-Gen
        const codePrompt = `Generate React/TypeScript code based on this description:
        
${aiResponse}

CRITICAL REQUIREMENTS:
1. Component MUST be named "Comp" 
2. Use "function Comp() { ... }" syntax (NOT arrow function)
3. Use GSAP for animations (import gsap if needed)
4. Use Tailwind CSS classes for styling
5. Include TypeScript interfaces
6. FIX ALL SYNTAX ERRORS
7. Do NOT use "export default function". Use "function Comp() {" then "export default Comp;" at the end.
8. Return ONLY the code. No markdown blocks.`;

        const secondRes = await fetch("./api/Gemini-Gen/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: codePrompt }),
        });
        
        const webData = await secondRes.json();

        if (webData.tex) {
          // This calls the IMPROVED cleaner from Part 1
          const cleanedCode = cleanGeneratedCode(webData.tex);
          
          setComponentCode(cleanedCode);
          setIsChatExpanded(false);
          setChatHistory((prev) => [
            ...prev,
            {
              role: "ai",
              text: "✅ Component code has been generated and cleaned! Preview is now available.",
            },
          ]);
        } else {
          setChatHistory((prev) => [
            ...prev,
            {
              role: "ai",
              text: "Failed to generate code. Please try again.",
            },
          ]);
        }
      } else {
        setChatHistory((prev) => [
          ...prev,
          {
            role: "ai",
            text: "Failed to generate component description.",
          },
        ]);
      }
    } catch (err) {
      console.error("Error:", err);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Error connecting to AI services. Please check your network connection.",
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleChatExpand = () => setIsChatExpanded(!isChatExpanded);
  const handleReloadPreview = () => setReloadKey((prev) => prev + 1);

return (
    <div className="flex flex-col h-screen w-full bg-[#050505] text-white font-sans overflow-hidden selection:bg-purple-500/30">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <Link
            href="/userPref"
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <ChevronLeft size={20} />
          </Link>
          <div className="h-6 w-px bg-white/10"></div>
          <img src="/logo.png" alt="LazyLayout" className="w-32 opacity-90" />
        </div>

        <div className="flex items-center gap-4">
          {componentCode && (
            <button
              onClick={() =>
                alert(
                  "Download functionality would save: " +
                    componentCode.substring(0, 100) +
                    "..."
                )
              }
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium transition-all text-gray-300 hover:text-white"
            >
              <Download size={14} /> Export Code
            </button>
          )}
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-xs font-bold shadow-lg shadow-purple-900/20">
            JD
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar (Chat) */}
        {!isChatExpanded && (
          <aside className="hidden md:flex w-80 bg-[#0A0A0A] border-r border-white/5 flex-col shrink-0">
            <div className="p-4 border-b border-white/5 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Session Chat
              </span>
              <button
                onClick={toggleChatExpand}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <MessageSquare size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {chatHistory.length === 0 ? (
                <div className="text-center mt-10 opacity-30">
                  <Sparkles className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">History is empty.</p>
                </div>
              ) : (
                chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      msg.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[90%] p-3 rounded-2xl text-sm ${
                        msg.role === "user"
                          ? "bg-white/10 text-white rounded-br-sm border border-white/5"
                          : "bg-black border border-white/10 text-gray-300 rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>
          </aside>
        )}

        {/* Center Preview Area */}
        <main className="flex-1 flex flex-col relative bg-[#050505] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size:[24px_24px] pointer-events-none"></div>

          {isChatExpanded ? (
            // Expanded Chat View
            <div className="flex-1 flex flex-col bg-[#0A0A0A] z-10 p-6 animate-in fade-in slide-in-from-left-4">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white">
                  Project Conversation
                </h2>
                <button
                  onClick={toggleChatExpand}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <X size={16} /> Close
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-6 px-4 md:px-20">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-3xl p-5 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-purple-900/20 border border-purple-500/30 text-purple-100"
                          : "bg-white/5 border border-white/10 text-gray-300"
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold opacity-50 mb-2">
                        {msg.role === "user" ? "You" : "LazyLayout AI"}
                      </div>
                      <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Preview Canvas
            <div className="flex-1 p-4 md:p-8 flex items-center justify-center relative">
              {!hasGeneratedContent && !isGenerating ? (
                <div className="text-center max-w-lg z-10">
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)]">
                    <Sparkles className="w-10 h-10 text-white/50" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Ready to Build
                  </h3>
                  <p className="text-gray-500 font-light">
                    Describe your dream component below. Use phrases like{" "}
                    <span className="text-purple-400">
                      "Modern Hero Section"
                    </span>{" "}
                    or{" "}
                    <span className="text-blue-400">"Dark Dashboard Card"</span>.
                  </p>
                </div>
              ) : (
                // Browser Frame
                <div
                  className={`w-full h-full max-w-[1400px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-700 ${
                    isGenerating
                      ? "scale-[0.98] opacity-80 blur-sm"
                      : "scale-100 opacity-100"
                  }`}
                >
                  {/* Browser Header */}
                  <div className="h-10 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-[#333]">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <div className="ml-4 flex-1 bg-black h-6 rounded text-[10px] flex items-center justify-center text-gray-500 font-mono">
                      preview.lazylayout.ai/component
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[10px] text-gray-500">
                        <MoveVertical size={10} />
                        <span>Drag to scroll</span>
                      </div>
                      <div className="h-4 w-px bg-gray-700 mx-1"></div>
                      <button
                        onClick={handleReloadPreview}
                        className="text-gray-500 hover:text-white transition-colors"
                        title="Reload Component"
                      >
                        <RefreshCw size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Render Area */}
                  <div
                    ref={previewRef}
                    className={`flex-1 relative ${
                      isDragging ? "cursor-grabbing" : "cursor-grab"
                    } overflow-auto`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    key={reloadKey}
                  >
                    <div className="min-h-full w-full">
                      {componentCode ? (
                        <DynamicComponent code={componentCode} />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
                          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
                          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                            {isGenerating
                              ? "Generating Code..."
                              : "No Component Code"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Scroll indicator */}
                    {componentCode && (
                      <div className="sticky bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none">
                        <div className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-2 border border-white/20">
                          <MoveVertical size={12} />
                          <span>Drag to scroll</span>
                          <span className="text-gray-400">•</span>
                          <span>Mouse wheel works too</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Footer Prompt Area */}
      <footer className="shrink-0 p-6 bg-[#050505] border-t border-white/5 z-30 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmitPrompt} className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <div className="relative flex items-center bg-[#0A0A0A] rounded-2xl border border-white/10 focus-within:border-white/20 transition-colors">
              <div className="pl-4 text-gray-500">
                <Sparkles size={20} />
              </div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your component..."
                className="w-full pl-3 pr-20 py-4 bg-transparent text-white placeholder-gray-600 focus:outline-none text-base font-light"
                disabled={isGenerating}
              />
              <div className="absolute right-2">
                <button
                  type="submit"
                  disabled={!prompt.trim() || isGenerating}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    prompt.trim() && !isGenerating
                      ? "bg-white text-black hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                      : "bg-white/5 text-gray-600"
                  }`}
                >
                  {isGenerating ? (
                    <RefreshCw size={20} className="animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </div>
          </form>
          <p className="text-center text-[10px] text-gray-600 mt-3 font-mono">
            LazyLayout AI can make mistakes. Review generated code before production.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Main Export with Suspense
export default function AIWebsiteGenerator() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col h-screen w-full bg-[#050505] text-white font-sans overflow-hidden">
          <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-white/5 animate-pulse">
                <ChevronLeft size={20} className="opacity-0" />
              </div>
              <div className="h-6 w-px bg-white/10"></div>
              <div className="w-32 h-8 bg-white/10 rounded animate-pulse"></div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse"></div>
          </header>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">
                Initializing template generator...
              </p>
              <p className="text-gray-600 text-sm mt-2">Loading parameters</p>
            </div>
          </div>
        </div>
      }
    >
      <AIWebsiteGeneratorContent />
    </Suspense>
  );
}









// Working
// Burhan------------------------------------------------------------------------------------------------------------------------------
// "use client";

// import React, { useState, useEffect, useRef, Suspense } from "react";
// import * as Babel from "@babel/standalone";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { ChevronLeft, Download, MessageSquare, RefreshCw, Send, Sparkles, X } from "lucide-react";

// gsap.registerPlugin(ScrollTrigger);

// type Message = {
//   role: "user" | "ai";
//   text: string;
// };

// // --- DYNAMIC COMPONENT RENDERER ---
// function DynamicComponent({ code }: { code: string }) {
//   const [Component, setComponent] = useState<React.ComponentType | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!code) return;
    
//     const scope: any = {
//       React,
//       useState,
//       useEffect,
//       useRef,
//       gsap,
//       ScrollTrigger, 
//     };

//     try {
//       let cleanCode = code.replace(/import\s+.*?from\s+['"].*?['"];?/g, "");
      
//       cleanCode = `
//         const _import_gsap = gsap;
//         const _import_ScrollTrigger = ScrollTrigger;
//         ${cleanCode}
//       `;
      
//       if (cleanCode.includes("export default function")) {
//         cleanCode = cleanCode.replace(/export\s+default\s+function/, "const _tempComp = function");
//       } else if (cleanCode.includes("export default")) {
//         cleanCode = cleanCode.replace(/export\s+default/, "const _tempComp =");
//       } else {
//         cleanCode = cleanCode + "; const _tempComp = null;"; 
//       }
      
//       const transformed = Babel.transform(cleanCode, {
//         presets: ["react", "typescript"],
//         filename: "component.tsx",
//       }).code;
      
//       const scopeKeys = Object.keys(scope);
//       const scopeValues = Object.values(scope);
//       const func = new Function(...scopeKeys, transformed + "; return _tempComp;");
//       const GeneratedComponent = func(...scopeValues);

//       if (GeneratedComponent) {
//         setComponent(() => GeneratedComponent);
//         setError(null);
//       } else {
//         throw new Error("Could not determine which component to render.");
//       }

//     } catch (err: any) {
//       console.error("Render Error:", err);
//       setError(err.message);
//     }
//   }, [code]);

//   if (error) {
//     return (
//       <div className="p-4 bg-red-900/20 border-l-2 border-red-500 text-red-400 font-mono text-sm overflow-auto h-full">
//         <strong>Render Error:</strong> {error}
//       </div>
//     );
//   }

//   if (!Component) return <div className="text-gray-400 p-4">Initializing environment...</div>;

//   return <Component />;
// }

// // --- HELPER FUNCTIONS ---
// const downloadCompFile = async () => {
//   alert("Downloading functionality triggered"); 
// };

// function extractCodeFromResponse(markdownText: string): string {
//   if (!markdownText) return '';
//   const codeBlockRegex = /```(?:tsx|jsx|typescript|javascript)?\s*\n?([\s\S]*?)```/;
//   const match = markdownText.match(codeBlockRegex);
//   let extractedCode = '';
//   if (match && match[1]) extractedCode = match[1].trim();
//   else extractedCode = markdownText.trim();
  
//   if (extractedCode && !extractedCode.includes("import gsap")) {
//     if (extractedCode.includes("gsap") || extractedCode.includes("ScrollTrigger")) {
//       extractedCode = `import gsap from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\ngsap.registerPlugin(ScrollTrigger);\n${extractedCode}`;
//     }
//   }
//   if (extractedCode && !extractedCode.includes("'use client'")) {
//     extractedCode = "'use client';\n" + extractedCode;
//   }
//   return extractedCode;
// }

// const saveCodeToFile = async (extractedCode: string, filename = "comp.tsx") => {
//   return { success: true };
// };

// // --- CONTENT COMPONENT ---
// function AIWebsiteGeneratorContent() {
//   const searchParams = useSearchParams();
//   const promptFromUrl = searchParams.get("prompt") || "";
  
//   const [prompt, setPrompt] = useState("");
//   const [chatHistory, setChatHistory] = useState<Message[]>([]);
//   const [componentCode, setComponentCode] = useState<string>("");
//   const [hasGeneratedContent, setHasGeneratedContent] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isChatExpanded, setIsChatExpanded] = useState(false);
//   const [reloadKey, setReloadKey] = useState(0);
//   const chatEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if(promptFromUrl) setPrompt(promptFromUrl);
//   }, [promptFromUrl]);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatHistory, isChatExpanded]);

//   const handleSubmitPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!prompt.trim() || isGenerating) return;

//     const userPrompt = prompt;
//     setPrompt("");
//     setIsGenerating(true);
//     setHasGeneratedContent(true);
//     setChatHistory((prev) => [...prev, { role: "user", text: userPrompt }]);

//     try {
//       const enhancedPrompt = `When generating React/TypeScript code with animations, use GSAP with ScrollTrigger plugin. Include imports. User request: ${userPrompt}`;
      
//       const res = await fetch("./api/Gemini-talk/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: `Your name is LazyLayout AI. User Says: ${enhancedPrompt}` }),
//       });

//       const data = await res.json();

//       if (data.text) {
//         setChatHistory((prev) => [...prev, { role: "ai", text: data.text }]);
//         const codeBlockMatch = data.text.match(/```(?:html|xml|css|js|jsx|tsx)?\s*([\s\S]*?)```/);

//         if (codeBlockMatch && codeBlockMatch[1]) {
//           const extractedCode = codeBlockMatch[1].trim();
          
//           const secondRes = await fetch("./api/Gemini-Gen/", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ code: extractedCode }),
//           });
//           const webData = await secondRes.json();
//           const finalCode = extractCodeFromResponse(webData.tex);
//           await saveCodeToFile(finalCode, "comp.tsx");
          
//           setComponentCode(finalCode);
//           if (webData.tex) setIsChatExpanded(false);
//         }
//       } else {
//         setChatHistory((prev) => [...prev, { role: "ai", text: "Failed to generate response." }]);
//       }
//     } catch (err) {
//       setChatHistory((prev) => [...prev, { role: "ai", text: "Error connecting to AI." }]);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const toggleChatExpand = () => setIsChatExpanded(!isChatExpanded);
//   const handleReloadPreview = () => setReloadKey(prev => prev + 1);

//   return (
//     <div className="flex flex-col h-screen w-full bg-[#050505] text-white font-sans overflow-hidden selection:bg-purple-500/30">
      
//       {/* --- HEADER --- */}
//       <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md z-20">
//         <div className="flex items-center gap-4">
//           <Link href="/userPref" className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
//             <ChevronLeft size={20} />
//           </Link>
//           <div className="h-6 w-px bg-white/10"></div>
//           <img src="/logo.png" alt="LazyLayout" className="w-32 opacity-90" />
//         </div>

//         <div className="flex items-center gap-4">
//           {componentCode && (
//             <button 
//               onClick={downloadCompFile}
//               className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium transition-all text-gray-300 hover:text-white"
//             >
//               <Download size={14} /> Export Code
//             </button>
//           )}
//           <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-xs font-bold shadow-lg shadow-purple-900/20">
//             JD
//           </div>
//         </div>
//       </header>

//       {/* --- MAIN WORKSPACE --- */}
//       <div className="flex flex-1 overflow-hidden relative">
        
//         {/* LEFT SIDEBAR (CHAT) */}
//         {!isChatExpanded && (
//           <aside className="hidden md:flex w-80 bg-[#0A0A0A] border-r border-white/5 flex-col shrink-0">
//             <div className="p-4 border-b border-white/5 flex justify-between items-center">
//               <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Session Chat</span>
//               <button onClick={toggleChatExpand} className="text-gray-500 hover:text-white transition-colors">
//                 <MessageSquare size={16} />
//               </button>
//             </div>
            
//             <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
//               {chatHistory.length === 0 ? (
//                 <div className="text-center mt-10 opacity-30">
//                     <Sparkles className="w-8 h-8 mx-auto mb-2" />
//                     <p className="text-sm">History is empty.</p>
//                 </div>
//               ) : (
//                 chatHistory.map((msg, index) => (
//                   <div key={index} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
//                     <div className={`max-w-[90%] p-3 rounded-2xl text-sm ${
//                         msg.role === "user" 
//                         ? "bg-white/10 text-white rounded-br-sm border border-white/5" 
//                         : "bg-black border border-white/10 text-gray-300 rounded-bl-sm"
//                     }`}>
//                         {msg.text}
//                     </div>
//                   </div>
//                 ))
//               )}
//               <div ref={chatEndRef} />
//             </div>
//           </aside>
//         )}

//         {/* CENTER PREVIEW AREA */}
//         <main className="flex-1 flex flex-col relative bg-[#050505] overflow-hidden">
//             {/* Background Grid */}
//             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size:[24px_24px] pointer-events-none"></div>

//             {isChatExpanded ? (
//                 // EXPANDED CHAT VIEW
//                 <div className="flex-1 flex flex-col bg-[#0A0A0A] z-10 p-6 animate-in fade-in slide-in-from-left-4">
//                      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
//                         <h2 className="text-xl font-bold text-white">Project Conversation</h2>
//                         <button onClick={toggleChatExpand} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
//                             <X size={16} /> Close
//                         </button>
//                      </div>
//                      <div className="flex-1 overflow-y-auto space-y-6 px-4 md:px-20">
//                         {chatHistory.map((msg, index) => (
//                             <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
//                                 <div className={`max-w-3xl p-5 rounded-2xl ${
//                                     msg.role === "user" ? "bg-purple-900/20 border border-purple-500/30 text-purple-100" : "bg-white/5 border border-white/10 text-gray-300"
//                                 }`}>
//                                     <div className="text-[10px] uppercase font-bold opacity-50 mb-2">{msg.role === "user" ? "You" : "LazyLayout AI"}</div>
//                                     <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{msg.text}</p>
//                                 </div>
//                             </div>
//                         ))}
//                      </div>
//                 </div>
//             ) : (
//                 // PREVIEW CANVAS
//                 <div className="flex-1 p-4 md:p-8 flex items-center justify-center relative">
//                     {!hasGeneratedContent && !isGenerating ? (
//                         <div className="text-center max-w-lg z-10">
//                             <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)]">
//                                 <Sparkles className="w-10 h-10 text-white/50" />
//                             </div>
//                             <h3 className="text-2xl font-bold text-white mb-2">Ready to Build</h3>
//                             <p className="text-gray-500 font-light">Describe your dream component below. Use phrases like <span className="text-purple-400">"Modern Hero Section"</span> or <span className="text-blue-400">"Dark Dashboard Card"</span>.</p>
//                         </div>
//                     ) : (
//                         // BROWSER FRAME
//                         <div className={`w-full h-full max-w-[1400px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-700 ${isGenerating ? "scale-[0.98] opacity-80 blur-sm" : "scale-100 opacity-100"}`}>
//                              {/* Browser Header */}
//                              <div className="h-10 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-[#333]">
//                                 <div className="flex gap-2">
//                                     <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
//                                     <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
//                                     <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
//                                 </div>
//                                 <div className="ml-4 flex-1 bg-black h-6 rounded text-[10px] flex items-center justify-center text-gray-500 font-mono">
//                                     preview.lazylayout.ai/component
//                                 </div>
//                                 <button onClick={handleReloadPreview} className="text-gray-500 hover:text-white transition-colors" title="Reload Component">
//                                     <RefreshCw size={14} />
//                                 </button>
//                              </div>
                             
//                              {/* Render Area */}
//                              <div className="flex-1 overflow-auto bg-white relative" key={reloadKey}>
//                                 {componentCode ? (
//                                     <DynamicComponent code={componentCode} />
//                                 ) : (
//                                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
//                                         <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
//                                         <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Generating Code...</p>
//                                     </div> 
            
//                                 )}
//                              </div>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </main>
//       </div>

//       {/* --- FOOTER PROMPT AREA --- */}
//       <footer className="shrink-0 p-6 bg-[#050505] border-t border-white/5 z-30 relative">
//         <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
//         <div className="max-w-4xl mx-auto">
//             <form onSubmit={handleSubmitPrompt} className="relative group">
//                 <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
//                 <div className="relative flex items-center bg-[#0A0A0A] rounded-2xl border border-white/10 focus-within:border-white/20 transition-colors">
//                     <div className="pl-4 text-gray-500">
//                         <Sparkles size={20} />
//                     </div>
//                     <input
//                         type="text"
//                         value={prompt}
//                         onChange={(e) => setPrompt(e.target.value)}
//                         placeholder="Describe your component..."
//                         className="w-full pl-3 pr-20 py-4 bg-transparent text-white placeholder-gray-600 focus:outline-none text-base font-light"
//                         disabled={isGenerating}
//                     />
//                     <div className="absolute right-2">
//                         <button
//                             type="submit"
//                             disabled={!prompt.trim() || isGenerating}
//                             className={`p-2 rounded-xl transition-all duration-300 ${
//                                 prompt.trim() && !isGenerating 
//                                 ? "bg-white text-black hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
//                                 : "bg-white/5 text-gray-600"
//                             }`}
//                         >
//                             {isGenerating ? <RefreshCw size={20} className="animate-spin" /> : <Send size={20} />}
//                         </button>
//                     </div>
//                 </div>
//             </form>
//             <p className="text-center text-[10px] text-gray-600 mt-3 font-mono">
//                 LazyLayout AI can make mistakes. Review generated code before production.
//             </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// // --- MAIN EXPORT WITH SUSPENSE ---
// export default function AIWebsiteGenerator() {
//   return (
//     <Suspense 
//       fallback={
//         <div className="flex flex-col h-screen w-full bg-[#050505] text-white font-sans overflow-hidden">
//           <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
//             <div className="flex items-center gap-4">
//               <div className="p-2 rounded-full bg-white/5 animate-pulse">
//                 <ChevronLeft size={20} className="opacity-0" />
//               </div>
//               <div className="h-6 w-px bg-white/10"></div>
//               <div className="w-32 h-8 bg-white/10 rounded animate-pulse"></div>
//             </div>
//             <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse"></div>
//           </header>
          
//           <div className="flex-1 flex items-center justify-center">
//             <div className="text-center">
//               <div className="w-12 h-12 border-4 border-gray-200 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-gray-400">Initializing template generator...</p>
//               <p className="text-gray-600 text-sm mt-2">Loading parameters</p>
//             </div>
//           </div>
//         </div>
//       }
//     >
//       <AIWebsiteGeneratorContent />
//     </Suspense>
//   );
// }