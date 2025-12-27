// Burhan------------------------------------------------------------------------------------------------------------------------------
"use client";

import React, { useState, useEffect, useRef } from "react";
import * as Babel from "@babel/standalone";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Download, MessageSquare, RefreshCw, Send, Sparkles, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Message = {
  role: "user" | "ai";
  text: string;
};

// --- DYNAMIC COMPONENT RENDERER (Unchanged Logic) ---
function DynamicComponent({ code }: { code: string }) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;
    
    const scope: any = {
      React,
      useState,
      useEffect,
      useRef,
      gsap,
      ScrollTrigger, 
    };

    try {
      let cleanCode = code.replace(/import\s+.*?from\s+['"].*?['"];?/g, "");
      
      cleanCode = `
        const _import_gsap = gsap;
        const _import_ScrollTrigger = ScrollTrigger;
        ${cleanCode}
      `;
      
      if (cleanCode.includes("export default function")) {
        cleanCode = cleanCode.replace(/export\s+default\s+function/, "const _tempComp = function");
      } else if (cleanCode.includes("export default")) {
        cleanCode = cleanCode.replace(/export\s+default/, "const _tempComp =");
      } else {
        cleanCode = cleanCode + "; const _tempComp = null;"; 
      }
      
      const transformed = Babel.transform(cleanCode, {
        presets: ["react", "typescript"],
        filename: "component.tsx",
      }).code;
      
      const scopeKeys = Object.keys(scope);
      const scopeValues = Object.values(scope);
      const func = new Function(...scopeKeys, transformed + "; return _tempComp;");
      const GeneratedComponent = func(...scopeValues);

      if (GeneratedComponent) {
        setComponent(() => GeneratedComponent);
        setError(null);
      } else {
        throw new Error("Could not determine which component to render.");
      }

    } catch (err: any) {
      console.error("Render Error:", err);
      setError(err.message);
    }
  }, [code]);

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 border-l-2 border-red-500 text-red-400 font-mono text-sm overflow-auto h-full">
        <strong>Render Error:</strong> {error}
      </div>
    );
  }

  if (!Component) return <div className="text-gray-400 p-4">Initializing environment...</div>;

  return <Component />;
}

// --- HELPER FUNCTIONS (Download, Extract) ---
const downloadCompFile = async () => {
  // ... (Your existing download logic remains the same)
  // For brevity, I'm assuming you keep the exact logic here.
  alert("Downloading functionality triggered"); 
};

function extractCodeFromResponse(markdownText: string): string {
  if (!markdownText) return '';
  const codeBlockRegex = /```(?:tsx|jsx|typescript|javascript)?\s*\n?([\s\S]*?)```/;
  const match = markdownText.match(codeBlockRegex);
  let extractedCode = '';
  if (match && match[1]) extractedCode = match[1].trim();
  else extractedCode = markdownText.trim();
  
  if (extractedCode && !extractedCode.includes("import gsap")) {
    if (extractedCode.includes("gsap") || extractedCode.includes("ScrollTrigger")) {
      extractedCode = `import gsap from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\ngsap.registerPlugin(ScrollTrigger);\n${extractedCode}`;
    }
  }
  if (extractedCode && !extractedCode.includes("'use client'")) {
    extractedCode = "'use client';\n" + extractedCode;
  }
  return extractedCode;
}

const saveCodeToFile = async (extractedCode: string, filename = "comp.tsx") => {
    // ... (Your existing save logic)
    return { success: true };
};


// --- MAIN COMPONENT ---
export default function AIWebsiteGenerator() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [componentCode, setComponentCode] = useState<string>("");
  const [hasGeneratedContent, setHasGeneratedContent] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const searchParams = useSearchParams();
  const [promptFromUrl, setPromptFromUrl] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  // const promptFromUrl = searchParams.get("prompt") || "";
  

  // useEffect(() => {
  //   if(promptFromUrl) setPrompt(promptFromUrl);
  // }, [promptFromUrl]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlPrompt = params.get("prompt") || "";
      setPromptFromUrl(urlPrompt);
      if (urlPrompt) {
        setPrompt(urlPrompt);
      }
    }
  }, []);


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isChatExpanded]);

  const handleSubmitPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    const userPrompt = prompt;
    setPrompt("");
    setIsGenerating(true);
    setHasGeneratedContent(true);
    setChatHistory((prev) => [...prev, { role: "user", text: userPrompt }]);

    try {
      const enhancedPrompt = `When generating React/TypeScript code with animations, use GSAP with ScrollTrigger plugin. Include imports. User request: ${userPrompt}`;
      
      const res = await fetch("./api/Gemini-talk/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Your name is LazyLayout AI. User Says: ${enhancedPrompt}` }),
      });

      const data = await res.json();

      if (data.text) {
        setChatHistory((prev) => [...prev, { role: "ai", text: data.text }]);
        const codeBlockMatch = data.text.match(/```(?:html|xml|css|js|jsx|tsx)?\s*([\s\S]*?)```/);

        if (codeBlockMatch && codeBlockMatch[1]) {
          const extractedCode = codeBlockMatch[1].trim();
          
          const secondRes = await fetch("./api/Gemini-Gen", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: extractedCode }),
          });
          const webData = await secondRes.json();
          const finalCode = extractCodeFromResponse(webData.tex);
          await saveCodeToFile(finalCode, "comp.tsx");
          
          setComponentCode(finalCode);
          if (webData.tex) setIsChatExpanded(false);
        }
      } else {
        setChatHistory((prev) => [...prev, { role: "ai", text: "Failed to generate response." }]);
      }
    } catch (err) {
      setChatHistory((prev) => [...prev, { role: "ai", text: "Error connecting to AI." }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleChatExpand = () => setIsChatExpanded(!isChatExpanded);
  const handleReloadPreview = () => setReloadKey(prev => prev + 1);

  return (
    <div className="flex flex-col h-screen w-full bg-[#050505] text-white font-sans overflow-hidden selection:bg-purple-500/30">
      
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <Link href="/userPref" className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
            <ChevronLeft size={20} />
          </Link>
          <div className="h-6 w-[1px] bg-white/10"></div>
          <img src="/logo.png" alt="LazyLayout" className="w-32 opacity-90" />
        </div>

        <div className="flex items-center gap-4">
          {componentCode && (
            <button 
              onClick={downloadCompFile}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium transition-all text-gray-300 hover:text-white"
            >
              <Download size={14} /> Export Code
            </button>
          )}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-xs font-bold shadow-lg shadow-purple-900/20">
            JD
          </div>
        </div>
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* LEFT SIDEBAR (CHAT) */}
        {!isChatExpanded && (
          <aside className="hidden md:flex w-80 bg-[#0A0A0A] border-r border-white/5 flex-col flex-shrink-0">
            <div className="p-4 border-b border-white/5 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Session Chat</span>
              <button onClick={toggleChatExpand} className="text-gray-500 hover:text-white transition-colors">
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
                  <div key={index} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`max-w-[90%] p-3 rounded-2xl text-sm ${
                        msg.role === "user" 
                        ? "bg-white/10 text-white rounded-br-sm border border-white/5" 
                        : "bg-black border border-white/10 text-gray-300 rounded-bl-sm"
                    }`}>
                        {msg.text}
                    </div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>
          </aside>
        )}

        {/* CENTER PREVIEW AREA */}
        <main className="flex-1 flex flex-col relative bg-[#050505] overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            {isChatExpanded ? (
                // EXPANDED CHAT VIEW
                <div className="flex-1 flex flex-col bg-[#0A0A0A] z-10 p-6 animate-in fade-in slide-in-from-left-4">
                     <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h2 className="text-xl font-bold text-white">Project Conversation</h2>
                        <button onClick={toggleChatExpand} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                            <X size={16} /> Close
                        </button>
                     </div>
                     <div className="flex-1 overflow-y-auto space-y-6 px-4 md:px-20">
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-3xl p-5 rounded-2xl ${
                                    msg.role === "user" ? "bg-purple-900/20 border border-purple-500/30 text-purple-100" : "bg-white/5 border border-white/10 text-gray-300"
                                }`}>
                                    <div className="text-[10px] uppercase font-bold opacity-50 mb-2">{msg.role === "user" ? "You" : "LazyLayout AI"}</div>
                                    <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            ) : (
                // PREVIEW CANVAS
                <div className="flex-1 p-4 md:p-8 flex items-center justify-center relative">
                    {!hasGeneratedContent && !isGenerating ? (
                        <div className="text-center max-w-lg z-10">
                            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)]">
                                <Sparkles className="w-10 h-10 text-white/50" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Ready to Build</h3>
                            <p className="text-gray-500 font-light">Describe your dream component below. Use phrases like <span className="text-purple-400">"Modern Hero Section"</span> or <span className="text-blue-400">"Dark Dashboard Card"</span>.</p>
                        </div>
                    ) : (
                        // BROWSER FRAME
                        <div className={`w-full h-full max-w-[1400px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-700 ${isGenerating ? "scale-[0.98] opacity-80 blur-sm" : "scale-100 opacity-100"}`}>
                             {/* Browser Header */}
                             <div className="h-10 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-[#333]">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                </div>
                                <div className="ml-4 flex-1 bg-[#000] h-6 rounded text-[10px] flex items-center justify-center text-gray-500 font-mono">
                                    preview.lazylayout.ai/component
                                </div>
                                <button onClick={handleReloadPreview} className="text-gray-500 hover:text-white transition-colors" title="Reload Component">
                                    <RefreshCw size={14} />
                                </button>
                             </div>
                             
                             {/* Render Area */}
                             <div className="flex-1 overflow-auto bg-white relative" key={reloadKey}>
                                {componentCode ? (
                                    <DynamicComponent code={componentCode} />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
                                        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
                                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Generating Code...</p>
                                    </div>
                                )}
                             </div>
                        </div>
                    )}
                </div>
            )}
        </main>
      </div>

      {/* --- FOOTER PROMPT AREA --- */}
      <footer className="shrink-0 p-6 bg-[#050505] border-t border-white/5 z-30 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmitPrompt} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
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
                            {isGenerating ? <RefreshCw size={20} className="animate-spin" /> : <Send size={20} />}
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



























// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import * as Babel from "@babel/standalone";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useSearchParams } from "next/navigation";

// gsap.registerPlugin(ScrollTrigger);

// type Message = {
//   role: "user" | "ai";
//   text: string;
// };

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
//         cleanCode = cleanCode.replace(
//           /export\s+default\s+function/,
//           "const _tempComp = function"
//         );
//       } 
//       else if (cleanCode.includes("export default")) {
//         cleanCode = cleanCode.replace(
//             /export\s+default/, 
//             "const _tempComp ="
//         );
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
//       <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-mono text-sm overflow-auto h-full">
//         <strong>Render Error:</strong> {error}
//       </div>
//     );
//   }

//   if (!Component) return <div>Loading preview...</div>;

//   return <Component />;
// }

// const downloadCompFile = async () => {
//   try {
//     // Try to get the blob URL from localStorage first
//     const blobUrl = localStorage.getItem('lastSavedBlobUrl');
    
//     if (blobUrl) {
//       // Download directly from blob storage
//       console.log("Downloading from blob URL:", blobUrl);
//       const response = await fetch(blobUrl);
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch from blob: ${response.status}`);
//       }
      
//       const codeText = await response.text();
      
//       const blob = new Blob([codeText], { type: 'text/typescript' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.style.display = 'none';
//       a.href = url;
//       a.download = 'comp.tsx';
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
      
//       console.log('Component downloaded successfully from blob storage');
//     } else {
//       // Fallback to memory store if no blob URL found
//       console.log("No blob URL found, falling back to memory store");
//       const response = await fetch('/api/get-component');
//       const data = await response.json();
      
//       if (data.code) {
//         const blob = new Blob([data.code], { type: 'text/typescript' });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.style.display = 'none';
//         a.href = url;
//         a.download = 'comp.tsx';
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//         console.log('Component downloaded from memory store');
//       } else {
//         console.error('No component code found');
//         alert('No component code available to download. Please generate a component first.');
//       }
//     }
//   } catch (error) {
//     console.error('Error downloading file:', error);
//     alert('Error downloading component. Please try again.');
//   }
// };

// function extractCodeFromResponse(markdownText: string): string {
//   if (!markdownText) return '';
  
//   const codeBlockRegex = /```(?:tsx|jsx|typescript|javascript)?\s*\n?([\s\S]*?)```/;
//   const match = markdownText.match(codeBlockRegex);
//   let extractedCode = '';
//   if (match && match[1]) {
//     extractedCode = match[1].trim();
//   } else {
//     extractedCode = markdownText.trim();
//   }
  
//   // Add gsap and ScrollTrigger imports if not present
//   if (extractedCode && !extractedCode.includes("import gsap")) {
//     if (extractedCode.includes("gsap") || extractedCode.includes("ScrollTrigger")) {
//       extractedCode = `import gsap from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\ngsap.registerPlugin(ScrollTrigger);\n${extractedCode}`;
//     }
//   }
  
//   if (extractedCode && !extractedCode.includes("'use client'") && !extractedCode.includes('"use client"')) {
//     extractedCode = "'use client';\n" + extractedCode;
//   }
  
//   return extractedCode;
// }

// const saveCodeToFile = async (extractedCode: string, filename = "comp.tsx") => {
//   try {
//     if (typeof extractedCode !== "string") {
//       extractedCode = JSON.stringify(extractedCode);
//     }

//     // Save to our memory store
//     const storeResponse = await fetch("/api/get-component", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         code: extractedCode,
//       }),
//     });

//     if (storeResponse.ok) {
//       console.log("Component code stored in memory");
      
//       // Also save to blob storage for persistence
//       const blobResponse = await fetch("/api/save-code", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           code: extractedCode,
//           filename: filename,
//         }),
//       });

//       const result = await blobResponse.json();
      
//       if (blobResponse.ok) {
//         console.log("File saved to blob storage:", result);
        
//         // Store the blob URL for later download
//         if (result.url) {
//           localStorage.setItem('lastSavedBlobUrl', result.url);
//           console.log("Blob URL stored for download:", result.url);
//         }
        
//         return result;
//       } else {
//         console.error("Error saving to blob:", result.error);
//         // Still return success since we stored in memory
//         return { success: true, message: "Code stored in memory" };
//       }
//     } else {
//       console.error("Error storing component in memory");
//       return null;
//     }
//   } catch (error) {
//     console.error("Failed to save file:", error);
//     return null;
//   }
// };

// export default function AIWebsiteGenerator() {
//   const [prompt, setPrompt] = useState("");
//   const [chatHistory, setChatHistory] = useState<Message[]>([]);
//   const [componentCode, setComponentCode] = useState<string>("");
//   const [hasGeneratedContent, setHasGeneratedContent] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isChatExpanded, setIsChatExpanded] = useState(false);
//   const [reloadKey, setReloadKey] = useState(0);
//   const searchParams = useSearchParams();
//   const promptFromUrl = searchParams.get("prompt") || "";


//   const [text, setText] = useState("");

//   useEffect(()=>{
//     setText(promptFromUrl);
//   },[promptFromUrl])


//   const chatEndRef = useRef<HTMLDivElement>(null);

//   const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPrompt(e.target.value);
//   };

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
//       // Update the prompt to ask for GSAP ScrollTrigger code
//       const enhancedPrompt = `When generating React/TypeScript code with animations, use GSAP with ScrollTrigger plugin. Include these imports at the top:
//       import gsap from "gsap";
//       import { ScrollTrigger } from "gsap/ScrollTrigger";
//       gsap.registerPlugin(ScrollTrigger);
      
//       User request: ${userPrompt}
      
//       Make sure to use ScrollTrigger for scroll-based animations.`;

//       const res = await fetch("./api/Gemini-talk/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           prompt: `Your name is Coffee&Code Ai. User Says: ${enhancedPrompt}`,
//         }),
//       });

//       const data = await res.json();

//       if (data.text) {
//         setChatHistory((prev) => [...prev, { role: "ai", text: data.text }]);

//         const codeBlockMatch = data.text.match(
//           /```(?:html|xml|css|js|jsx|tsx)?\s*([\s\S]*?)```/
//         );

//         if (codeBlockMatch && codeBlockMatch[1]) {
//           const extractedCode = codeBlockMatch[1].trim();
//           console.log("Extracted Code:", extractedCode);

//           const secondRes = await fetch("./api/Gemini-Gen", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               code: extractedCode,
//             }),
//           });
//           const webData = await secondRes.json();
          
//           const finalCode = extractCodeFromResponse(webData.tex);
//           await saveCodeToFile(finalCode, "comp.tsx");
          
//           // Store the code in state for the dynamic component
//           setComponentCode(finalCode);

//           if (webData.tex) {
//             console.log(webData);
//             setIsChatExpanded(false);
//           } else {
//             console.log("No code block found in response to extract.");
//           }
//         }
//       } else {
//         setChatHistory((prev) => [
//           ...prev,
//           { role: "ai", text: "Failed to generate response." },
//         ]);
//       }
//     } catch (err) {
//       console.error(err);
//       setChatHistory((prev) => [
//         ...prev,
//         { role: "ai", text: "Error connecting to AI." },
//       ]);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const toggleChatExpand = () => {
//     setIsChatExpanded(!isChatExpanded);
//   };

//   const handleReloadPreview = () => {
//     setReloadKey(prev => prev + 1);
//   };

//   // Simple fallback component
//   const SimpleComponent = () => (
//     <div className="p-8 text-center">
//       <h1 className="text-2xl font-bold mb-4">Generated Component</h1>
//       <p className="text-gray-600">Your AI-generated component will appear here.</p>
//     </div>
//   );

//   return (
//     <div className="flex flex-col h-screen w-full bg-white text-gray-900 font-sans overflow-hidden">
//       {/* TOP HEADER */}
//       <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 shrink-0 bg-white z-10">
//         <div className="flex items-center space-x-2">
//           <div className="text-xs font-bold uppercase tracking-widest text-black">
//             <img src="/logo.png" alt="WebGen" className="w-48 invert" />
//           </div>
//         </div>

//         <div className="flex items-center space-x-2">
//           <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 border border-gray-200">
//             JD
//           </div>
//         </div>
//       </header>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-1 overflow-hidden relative">
//         {/* LEFT SIDEBAR (CHAT COMPACT) */}
//         {!isChatExpanded && (
//           <aside className="hidden md:flex w-64 bg-gray-50 border-r border-gray-200 shrink-0 flex-col p-6 overflow-hidden">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
//                 Chat
//               </h2>
//               <button
//                 onClick={toggleChatExpand}
//                 className="text-gray-400 hover:text-black transition-colors"
//                 title="Expand Chat"
//               >
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
//                   />
//                 </svg>
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto space-y-4 pr-2">
//               {chatHistory.length === 0 ? (
//                 <p className="text-sm text-gray-400 italic">
//                   Start a conversation...
//                 </p>
//               ) : (
//                 <ul className="space-y-4">
//                   {chatHistory.map((msg, index) => (
//                     <li
//                       key={index}
//                       className={`text-sm ${
//                         msg.role === "user" ? "text-right" : "text-left"
//                       }`}
//                     >
//                       <div
//                         className={`inline-block p-2 rounded-lg ${
//                           msg.role === "user"
//                             ? "bg-gray-200 text-gray-800"
//                             : "bg-white border border-gray-200 text-gray-600"
//                         }`}
//                       >
//                         <p className="line-clamp-3">{msg.text}</p>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               <div ref={chatEndRef} />
//             </div>
//           </aside>
//         )}

//         {/* CENTER MAIN AREA */}
//         <main className="flex-1 flex flex-col relative bg-white overflow-hidden">
//           {isChatExpanded ? (
//             // === EXPANDED CHAT VIEW ===
//             <div className="flex-1 h-full overflow-hidden flex flex-col p-6 bg-gray-50 animate-in fade-in duration-300">
//               {/* Header - This will now stay fixed at the top */}
//               <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 shrink-0">
//                 <h2 className="text-lg font-bold text-gray-800">
//                   Conversation
//                 </h2>
//                 <button
//                   onClick={toggleChatExpand}
//                   className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
//                 >
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                   Close Chat
//                 </button>
//               </div>

//               {/* Scrollable Message List */}
//               <div className="flex-1 overflow-y-auto space-y-6 px-4 md:px-20 pb-4">
//                 {chatHistory.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`flex ${
//                       msg.role === "user" ? "justify-end" : "justify-start"
//                     }`}
//                   >
//                     <div
//                       className={`max-w-2xl p-4 rounded-2xl overflow-x-auto ${
//                         msg.role === "user"
//                           ? "bg-black text-white rounded-br-none"
//                           : "bg-white border border-gray-200 shadow-sm text-gray-800 rounded-bl-none"
//                       }`}
//                     >
//                       <div className="text-xs opacity-50 mb-1 uppercase font-bold">
//                         {msg.role === "user" ? "You" : "Coffee&Code AI"}
//                       </div>
//                       <p className="whitespace-pre-wrap leading-relaxed">
//                         {msg.text}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//                 {isGenerating && (
//                   <div className="flex justify-start">
//                     <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-none">
//                       <div className="flex space-x-2">
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div ref={chatEndRef} />
//               </div>
//             </div>
//           ) : (
//             // === WEBSITE PREVIEW VIEW (Default) ===
//             <div className="flex-1 overflow-auto p-8 lg:p-12 flex items-center justify-center bg-dot-pattern">
//               {!hasGeneratedContent && !isGenerating ? (
//                 <div className="text-center space-y-4 max-w-md">
//                   <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <svg
//                       className="w-6 h-6 text-gray-300"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900">
//                     Ready to create
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     Describe your dream website in the prompt bar below to get
//                     started.
//                   </p>
//                 </div>
//               ) : (
//                 <div
//                   className={`w-full h-full max-w-6xl bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden transition-opacity duration-500 ${
//                     isGenerating ? "opacity-50 animate-pulse" : "opacity-100"
//                   }`}
//                 >
//                   {/* Browser Mockup Header */}
//                   <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2">
//                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
//                     <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
//                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
//                     <div className="ml-4 flex-1 bg-white h-6 rounded-md text-xs flex items-center px-2 text-gray-400">
//                       localhost:3000
//                     </div>
//                     <div>
//                       <button
//                       onClick={handleReloadPreview}>
//                         ↻ Reload
//                       </button>
//                     </div>
//                   </div>

//                   {/* The Actual Preview Content - Render React Component Directly */}
//                   <div className="w-full h-full" key={reloadKey}>
//         {componentCode ? (
//           <DynamicComponent code={componentCode} />
//         ) : isGenerating ? (
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mb-2"></div>
//             <p className="text-sm text-gray-500">Generating Interface...</p>
//           </div>
//         ) : (
//           <SimpleComponent />
//         )}
//       </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </main>
//       </div>

//       {/* BOTTOM INPUT PROMPT AREA */}
//       <footer className="shrink-0 p-6 bg-white border-t border-gray-200 z-20">
//         <div className="max-w-4xl mx-auto">
//           <form
//             onSubmit={handleSubmitPrompt}
//             className="relative flex items-center w-full shadow-lg rounded-2xl overflow-hidden ring-1 ring-gray-100"
//           >
//             <div className="absolute left-4 text-gray-400">
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M13 10V3L4 14h7v7l9-11h-7z"
//                 />
//               </svg>
//             </div>
//             <input
//               type="text"
//               value={prompt}
//               onChange={(e)=> setPrompt(e.target.value)}
//               placeholder="Ask Coffee&Code AI..."
//               className="w-full pl-12 pr-32 py-4 bg-white text-gray-900 placeholder-gray-400 focus:outline-none text-base"
//               disabled={isGenerating}
//             />
//             <div className="absolute right-2">
//               <button
//                 type="submit"
//                 className={`
//                         px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
//                         ${
//                           prompt.trim() && !isGenerating
//                             ? "bg-black text-white hover:bg-gray-800 shadow-md"
//                             : "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         }
//                     `}
//                 disabled={!prompt.trim() || isGenerating}
//               >
//                 {isGenerating ? "Thinking..." : "Send"}
//               </button>
//             </div>
//           </form>
//         </div>
//         <div>
//         {componentCode && (
//           <button 
//             className="absolute right-12 bottom-22 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 bg-black text-white hover:bg-gray-800 shadow-md"
//             onClick={downloadCompFile}
//           >
//             Download Component
//           </button>
//         )}
//       </div>
//       </footer>
//     </div>
//   );
// }









































// // Totally Working

// // "use client";

// // import React, { useState, useEffect, useRef } from "react";
// // import * as Babel from "@babel/standalone";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // // Register ScrollTrigger plugin
// // gsap.registerPlugin(ScrollTrigger);

// // // Define a type for our chat messages
// // type Message = {
// //   role: "user" | "ai";
// //   text: string;
// // };

// // function DynamicComponent({ code }: { code: string }) {
// //   const [Component, setComponent] = useState<React.ComponentType | null>(null);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     if (!code) return;
    
// //     // Create a complete scope with all necessary dependencies
// //     const scope: any = {
// //       React,
// //       useState,
// //       useEffect,
// //       useRef,
// //       gsap,
// //       ScrollTrigger, // Add ScrollTrigger to the scope
// //     };

// //     try {
// //       let cleanCode = code.replace(/import\s+.*?from\s+['"].*?['"];?/g, "");
      
// //       // Add import statements for gsap and ScrollTrigger at the top of the component
// //       // This ensures they're available inside the component
// //       cleanCode = `
// //         const _import_gsap = gsap;
// //         const _import_ScrollTrigger = ScrollTrigger;
// //         ${cleanCode}
// //       `;
      
// //       if (cleanCode.includes("export default function")) {
// //         cleanCode = cleanCode.replace(
// //           /export\s+default\s+function/,
// //           "const _tempComp = function"
// //         );
// //       } 
// //       else if (cleanCode.includes("export default")) {
// //         cleanCode = cleanCode.replace(
// //             /export\s+default/, 
// //             "const _tempComp ="
// //         );
// //       } else {
// //         cleanCode = cleanCode + "; const _tempComp = null;"; 
// //       }
      
// //       const transformed = Babel.transform(cleanCode, {
// //         presets: ["react", "typescript"],
// //         filename: "component.tsx",
// //       }).code;
      
// //       const scopeKeys = Object.keys(scope);
// //       const scopeValues = Object.values(scope);

// //       const func = new Function(...scopeKeys, transformed + "; return _tempComp;");
      
// //       const GeneratedComponent = func(...scopeValues);

// //       if (GeneratedComponent) {
// //         setComponent(() => GeneratedComponent);
// //         setError(null);
// //       } else {
// //         throw new Error("Could not determine which component to render.");
// //       }

// //     } catch (err: any) {
// //       console.error("Render Error:", err);
// //       setError(err.message);
// //     }
// //   }, [code]);

// //   if (error) {
// //     return (
// //       <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-mono text-sm overflow-auto h-full">
// //         <strong>Render Error:</strong> {error}
// //       </div>
// //     );
// //   }

// //   if (!Component) return <div>Loading preview...</div>;

// //   return <Component />;
// // }

// // const downloadCompFile = async () => {
// //   try {
// //     // Try to get the blob URL from localStorage first
// //     const blobUrl = localStorage.getItem('lastSavedBlobUrl');
    
// //     if (blobUrl) {
// //       // Download directly from blob storage
// //       console.log("Downloading from blob URL:", blobUrl);
// //       const response = await fetch(blobUrl);
      
// //       if (!response.ok) {
// //         throw new Error(`Failed to fetch from blob: ${response.status}`);
// //       }
      
// //       const codeText = await response.text();
      
// //       const blob = new Blob([codeText], { type: 'text/typescript' });
// //       const url = window.URL.createObjectURL(blob);
// //       const a = document.createElement('a');
// //       a.style.display = 'none';
// //       a.href = url;
// //       a.download = 'comp.tsx';
// //       document.body.appendChild(a);
// //       a.click();
// //       window.URL.revokeObjectURL(url);
// //       document.body.removeChild(a);
      
// //       console.log('Component downloaded successfully from blob storage');
// //     } else {
// //       // Fallback to memory store if no blob URL found
// //       console.log("No blob URL found, falling back to memory store");
// //       const response = await fetch('/api/get-component');
// //       const data = await response.json();
      
// //       if (data.code) {
// //         const blob = new Blob([data.code], { type: 'text/typescript' });
// //         const url = window.URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.style.display = 'none';
// //         a.href = url;
// //         a.download = 'comp.tsx';
// //         document.body.appendChild(a);
// //         a.click();
// //         window.URL.revokeObjectURL(url);
// //         document.body.removeChild(a);
// //         console.log('Component downloaded from memory store');
// //       } else {
// //         console.error('No component code found');
// //         alert('No component code available to download. Please generate a component first.');
// //       }
// //     }
// //   } catch (error) {
// //     console.error('Error downloading file:', error);
// //     alert('Error downloading component. Please try again.');
// //   }
// // };

// // function extractCodeFromResponse(markdownText: string): string {
// //   if (!markdownText) return '';
  
// //   const codeBlockRegex = /```(?:tsx|jsx|typescript|javascript)?\s*\n?([\s\S]*?)```/;
// //   const match = markdownText.match(codeBlockRegex);
// //   let extractedCode = '';
// //   if (match && match[1]) {
// //     extractedCode = match[1].trim();
// //   } else {
// //     extractedCode = markdownText.trim();
// //   }
  
// //   // Add gsap and ScrollTrigger imports if not present
// //   if (extractedCode && !extractedCode.includes("import gsap")) {
// //     if (extractedCode.includes("gsap") || extractedCode.includes("ScrollTrigger")) {
// //       extractedCode = `import gsap from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\ngsap.registerPlugin(ScrollTrigger);\n${extractedCode}`;
// //     }
// //   }
  
// //   if (extractedCode && !extractedCode.includes("'use client'") && !extractedCode.includes('"use client"')) {
// //     extractedCode = "'use client';\n" + extractedCode;
// //   }
  
// //   return extractedCode;
// // }

// // const saveCodeToFile = async (extractedCode: string, filename = "comp.tsx") => {
// //   try {
// //     if (typeof extractedCode !== "string") {
// //       extractedCode = JSON.stringify(extractedCode);
// //     }

// //     // Save to our memory store
// //     const storeResponse = await fetch("/api/get-component", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         code: extractedCode,
// //       }),
// //     });

// //     if (storeResponse.ok) {
// //       console.log("Component code stored in memory");
      
// //       // Also save to blob storage for persistence
// //       const blobResponse = await fetch("/api/save-code", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           code: extractedCode,
// //           filename: filename,
// //         }),
// //       });

// //       const result = await blobResponse.json();
      
// //       if (blobResponse.ok) {
// //         console.log("File saved to blob storage:", result);
        
// //         // Store the blob URL for later download
// //         if (result.url) {
// //           localStorage.setItem('lastSavedBlobUrl', result.url);
// //           console.log("Blob URL stored for download:", result.url);
// //         }
        
// //         return result;
// //       } else {
// //         console.error("Error saving to blob:", result.error);
// //         // Still return success since we stored in memory
// //         return { success: true, message: "Code stored in memory" };
// //       }
// //     } else {
// //       console.error("Error storing component in memory");
// //       return null;
// //     }
// //   } catch (error) {
// //     console.error("Failed to save file:", error);
// //     return null;
// //   }
// // };

// // export default function AIWebsiteGenerator() {
// //   const [prompt, setPrompt] = useState("");
// //   const [chatHistory, setChatHistory] = useState<Message[]>([]);
// //   const [componentCode, setComponentCode] = useState<string>("");
// //   const [hasGeneratedContent, setHasGeneratedContent] = useState(false);
// //   const [isGenerating, setIsGenerating] = useState(false);
// //   const [isChatExpanded, setIsChatExpanded] = useState(false);
// //   const [reloadKey, setReloadKey] = useState(0);

// //   const chatEndRef = useRef<HTMLDivElement>(null);

// //   const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setPrompt(e.target.value);
// //   };

// //   useEffect(() => {
// //     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [chatHistory, isChatExpanded]);

// //   const handleSubmitPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     if (!prompt.trim() || isGenerating) return;

// //     const userPrompt = prompt;
// //     setPrompt("");
// //     setIsGenerating(true);
// //     setHasGeneratedContent(true);

// //     setChatHistory((prev) => [...prev, { role: "user", text: userPrompt }]);

// //     try {
// //       // Update the prompt to ask for GSAP ScrollTrigger code
// //       const enhancedPrompt = `When generating React/TypeScript code with animations, use GSAP with ScrollTrigger plugin. Include these imports at the top:
// //       import gsap from "gsap";
// //       import { ScrollTrigger } from "gsap/ScrollTrigger";
// //       gsap.registerPlugin(ScrollTrigger);
      
// //       User request: ${userPrompt}
      
// //       Make sure to use ScrollTrigger for scroll-based animations.`;

// //       const res = await fetch("./api/Gemini-talk/", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           prompt: `Your name is Coffee&Code Ai. User Says: ${enhancedPrompt}`,
// //         }),
// //       });

// //       const data = await res.json();

// //       if (data.text) {
// //         setChatHistory((prev) => [...prev, { role: "ai", text: data.text }]);

// //         const codeBlockMatch = data.text.match(
// //           /```(?:html|xml|css|js|jsx|tsx)?\s*([\s\S]*?)```/
// //         );

// //         if (codeBlockMatch && codeBlockMatch[1]) {
// //           const extractedCode = codeBlockMatch[1].trim();
// //           console.log("Extracted Code:", extractedCode);

// //           const secondRes = await fetch("./api/Gemini-Gen", {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({
// //               code: extractedCode,
// //             }),
// //           });
// //           const webData = await secondRes.json();
          
// //           const finalCode = extractCodeFromResponse(webData.tex);
// //           await saveCodeToFile(finalCode, "comp.tsx");
          
// //           // Store the code in state for the dynamic component
// //           setComponentCode(finalCode);

// //           if (webData.tex) {
// //             console.log(webData);
// //             setIsChatExpanded(false);
// //           } else {
// //             console.log("No code block found in response to extract.");
// //           }
// //         }
// //       } else {
// //         setChatHistory((prev) => [
// //           ...prev,
// //           { role: "ai", text: "Failed to generate response." },
// //         ]);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setChatHistory((prev) => [
// //         ...prev,
// //         { role: "ai", text: "Error connecting to AI." },
// //       ]);
// //     } finally {
// //       setIsGenerating(false);
// //     }
// //   };

// //   const toggleChatExpand = () => {
// //     setIsChatExpanded(!isChatExpanded);
// //   };

// //   const handleReloadPreview = () => {
// //     setReloadKey(prev => prev + 1);
// //   };

// //   // Simple fallback component
// //   const SimpleComponent = () => (
// //     <div className="p-8 text-center">
// //       <h1 className="text-2xl font-bold mb-4">Generated Component</h1>
// //       <p className="text-gray-600">Your AI-generated component will appear here.</p>
// //     </div>
// //   );

// //   return (
// //     <div className="flex flex-col h-screen w-full bg-white text-gray-900 font-sans overflow-hidden">
// //       {/* TOP HEADER */}
// //       <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 shrink-0 bg-white z-10">
// //         <div className="flex items-center space-x-2">
// //           <div className="text-xs font-bold uppercase tracking-widest text-black">
// //             <img src="/logo.png" alt="WebGen" className="w-48 invert" />
// //           </div>
// //         </div>

// //         <div className="flex items-center space-x-2">
// //           <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 border border-gray-200">
// //             JD
// //           </div>
// //         </div>
// //       </header>

// //       {/* MAIN CONTENT AREA */}
// //       <div className="flex flex-1 overflow-hidden relative">
// //         {/* LEFT SIDEBAR (CHAT COMPACT) */}
// //         {!isChatExpanded && (
// //           <aside className="hidden md:flex w-64 bg-gray-50 border-r border-gray-200 shrink-0 flex-col p-6 overflow-hidden">
// //             <div className="flex justify-between items-center mb-6">
// //               <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
// //                 Chat
// //               </h2>
// //               <button
// //                 onClick={toggleChatExpand}
// //                 className="text-gray-400 hover:text-black transition-colors"
// //                 title="Expand Chat"
// //               >
// //                 <svg
// //                   className="w-4 h-4"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth="2"
// //                     d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
// //                   />
// //                 </svg>
// //               </button>
// //             </div>

// //             <div className="flex-1 overflow-y-auto space-y-4 pr-2">
// //               {chatHistory.length === 0 ? (
// //                 <p className="text-sm text-gray-400 italic">
// //                   Start a conversation...
// //                 </p>
// //               ) : (
// //                 <ul className="space-y-4">
// //                   {chatHistory.map((msg, index) => (
// //                     <li
// //                       key={index}
// //                       className={`text-sm ${
// //                         msg.role === "user" ? "text-right" : "text-left"
// //                       }`}
// //                     >
// //                       <div
// //                         className={`inline-block p-2 rounded-lg ${
// //                           msg.role === "user"
// //                             ? "bg-gray-200 text-gray-800"
// //                             : "bg-white border border-gray-200 text-gray-600"
// //                         }`}
// //                       >
// //                         <p className="line-clamp-3">{msg.text}</p>
// //                       </div>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               )}
// //               <div ref={chatEndRef} />
// //             </div>
// //           </aside>
// //         )}

// //         {/* CENTER MAIN AREA */}
// //         <main className="flex-1 flex flex-col relative bg-white overflow-hidden">
// //           {isChatExpanded ? (
// //             // === EXPANDED CHAT VIEW ===
// //             <div className="flex-1 h-full overflow-hidden flex flex-col p-6 bg-gray-50 animate-in fade-in duration-300">
// //               {/* Header - This will now stay fixed at the top */}
// //               <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 shrink-0">
// //                 <h2 className="text-lg font-bold text-gray-800">
// //                   Conversation
// //                 </h2>
// //                 <button
// //                   onClick={toggleChatExpand}
// //                   className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
// //                 >
// //                   <svg
// //                     className="w-4 h-4"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth="2"
// //                       d="M6 18L18 6M6 6l12 12"
// //                     />
// //                   </svg>
// //                   Close Chat
// //                 </button>
// //               </div>

// //               {/* Scrollable Message List */}
// //               <div className="flex-1 overflow-y-auto space-y-6 px-4 md:px-20 pb-4">
// //                 {chatHistory.map((msg, index) => (
// //                   <div
// //                     key={index}
// //                     className={`flex ${
// //                       msg.role === "user" ? "justify-end" : "justify-start"
// //                     }`}
// //                   >
// //                     <div
// //                       className={`max-w-2xl p-4 rounded-2xl overflow-x-auto ${
// //                         msg.role === "user"
// //                           ? "bg-black text-white rounded-br-none"
// //                           : "bg-white border border-gray-200 shadow-sm text-gray-800 rounded-bl-none"
// //                       }`}
// //                     >
// //                       <div className="text-xs opacity-50 mb-1 uppercase font-bold">
// //                         {msg.role === "user" ? "You" : "Coffee&Code AI"}
// //                       </div>
// //                       <p className="whitespace-pre-wrap leading-relaxed">
// //                         {msg.text}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 ))}
// //                 {isGenerating && (
// //                   <div className="flex justify-start">
// //                     <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-none">
// //                       <div className="flex space-x-2">
// //                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
// //                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
// //                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //                 <div ref={chatEndRef} />
// //               </div>
// //             </div>
// //           ) : (
// //             // === WEBSITE PREVIEW VIEW (Default) ===
// //             <div className="flex-1 overflow-auto p-8 lg:p-12 flex items-center justify-center bg-dot-pattern">
// //               {!hasGeneratedContent && !isGenerating ? (
// //                 <div className="text-center space-y-4 max-w-md">
// //                   <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
// //                     <svg
// //                       className="w-6 h-6 text-gray-300"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth="2"
// //                         d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
// //                       />
// //                     </svg>
// //                   </div>
// //                   <h3 className="text-lg font-medium text-gray-900">
// //                     Ready to create
// //                   </h3>
// //                   <p className="text-sm text-gray-500">
// //                     Describe your dream website in the prompt bar below to get
// //                     started.
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <div
// //                   className={`w-full h-full max-w-6xl bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden transition-opacity duration-500 ${
// //                     isGenerating ? "opacity-50 animate-pulse" : "opacity-100"
// //                   }`}
// //                 >
// //                   {/* Browser Mockup Header */}
// //                   <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2">
// //                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
// //                     <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
// //                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
// //                     <div className="ml-4 flex-1 bg-white h-6 rounded-md text-xs flex items-center px-2 text-gray-400">
// //                       localhost:3000
// //                     </div>
// //                     <div>
// //                       <button
// //                       onClick={handleReloadPreview}>
// //                         ↻ Reload
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* The Actual Preview Content - Render React Component Directly */}
// //                   <div className="w-full h-full" key={reloadKey}>
// //         {componentCode ? (
// //           <DynamicComponent code={componentCode} />
// //         ) : isGenerating ? (
// //           <div className="absolute inset-0 flex flex-col items-center justify-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mb-2"></div>
// //             <p className="text-sm text-gray-500">Generating Interface...</p>
// //           </div>
// //         ) : (
// //           <SimpleComponent />
// //         )}
// //       </div>
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </main>
// //       </div>

// //       {/* BOTTOM INPUT PROMPT AREA */}
// //       <footer className="shrink-0 p-6 bg-white border-t border-gray-200 z-20">
// //         <div className="max-w-4xl mx-auto">
// //           <form
// //             onSubmit={handleSubmitPrompt}
// //             className="relative flex items-center w-full shadow-lg rounded-2xl overflow-hidden ring-1 ring-gray-100"
// //           >
// //             <div className="absolute left-4 text-gray-400">
// //               <svg
// //                 className="w-5 h-5"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   d="M13 10V3L4 14h7v7l9-11h-7z"
// //                 />
// //               </svg>
// //             </div>
// //             <input
// //               type="text"
// //               value={prompt}
// //               onChange={handlePromptChange}
// //               placeholder="Ask Coffee&Code AI..."
// //               className="w-full pl-12 pr-32 py-4 bg-white text-gray-900 placeholder-gray-400 focus:outline-none text-base"
// //               disabled={isGenerating}
// //             />
// //             <div className="absolute right-2">
// //               <button
// //                 type="submit"
// //                 className={`
// //                         px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
// //                         ${
// //                           prompt.trim() && !isGenerating
// //                             ? "bg-black text-white hover:bg-gray-800 shadow-md"
// //                             : "bg-gray-100 text-gray-400 cursor-not-allowed"
// //                         }
// //                     `}
// //                 disabled={!prompt.trim() || isGenerating}
// //               >
// //                 {isGenerating ? "Thinking..." : "Send"}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //         <div>
// //         {componentCode && (
// //           <button 
// //             className="absolute right-12 bottom-22 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 bg-black text-white hover:bg-gray-800 shadow-md"
// //             onClick={downloadCompFile}
// //           >
// //             Download Component
// //           </button>
// //         )}
// //       </div>
// //       </footer>
// //     </div>
// //   );
// // }