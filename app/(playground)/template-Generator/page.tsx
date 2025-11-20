// 'use client';

// import React, { useState, useEffect, useRef } from 'react';

// // Define a type for our chat messages
// type Message = {
//   role: 'user' | 'ai';
//   text: string;
// };

// export default function AIWebsiteGenerator() {
//   const [prompt, setPrompt] = useState('');
//   const [chatHistory, setChatHistory] = useState<Message[]>([]); 
  
//   // CHANGED: previewContent now stores the actual HTML/String string instead of just a boolean
//   const [previewContent, setPreviewContent] = useState<string | null>(null);
  
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isChatExpanded, setIsChatExpanded] = useState(false);

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
//     setPrompt('');
//     setIsGenerating(true);

//     // 1. Add User Message
//     setChatHistory((prev) => [...prev, { role: 'user', text: userPrompt }]);

//     try {
//       // 2. First API Call (Gemini)
//       const res = await fetch("./api/Gemini-talk/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           prompt: `Your name is Coffee&Code Ai. User Says: ${userPrompt}`
//         }),
//       });

//       const data = await res.json();
      
//       if (data.text) {
      
//         setChatHistory((prev) => [...prev, { role: 'ai', text: data.text }]);

        
//         const codeBlockMatch = data.text.match(/```(?:html|xml|css|js|jsx|tsx)?\s*([\s\S]*?)```/);

//         if (codeBlockMatch && codeBlockMatch[1]) {
//             const extractedCode = codeBlockMatch[1].trim();
//             console.log("Extracted Code:", extractedCode);

          
//             const secondRes = await fetch("./api/Gemini-Gen", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ code: extractedCode }),
//             });
//             const webData = await secondRes.json();

//             if (webData.text) {
//                 console.log(webData)
       
//             setPreviewContent(extractedCode); 

//             // 5. Automatically Close Chat & Show Preview
//             setIsChatExpanded(false); 
//         } else {
//             console.log("No code block found in response to extract.");
//         }
//       }

//       // --- NEW LOGIC ENDS HERE ---

//       } else {
//         setChatHistory((prev) => [...prev, { role: 'ai', text: "Failed to generate response." }]);
//       }
//     } catch (err) {
//       console.error(err);
//       setChatHistory((prev) => [...prev, { role: 'ai', text: "Error connecting to AI." }]);
//     } finally {
//       setIsGenerating(false);
//     }
//   };
// const toggleChatExpand = () => {
//     setIsChatExpanded(!isChatExpanded);
//   };

//   return (
//     <div className="flex flex-col h-screen w-full bg-white text-gray-900 font-sans overflow-auto">
      
//       {/* TOP HEADER */}
//       <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 flex-shrink-0 bg-white z-10">
//         <div className="flex items-center space-x-2">
//           <div className="text-xs font-bold uppercase tracking-widest text-black">
//            <img src="/logo.png" alt="WebGen" className="w-48 invert"/>
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
//             <aside className="hidden md:flex w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0 flex-col p-6 overflow-hidden">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
//                 Chat
//                 </h2>
//                 <button 
//                     onClick={toggleChatExpand}
//                     className="text-gray-400 hover:text-black transition-colors"
//                     title="Expand Chat"
//                 >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
//                     </svg>
//                 </button>
//             </div>

//             <div className="flex-1 overflow-y-sroll space-y-4 pr-2">
//                 {chatHistory.length === 0 ? (
//                 <p className="text-sm text-gray-400 italic">Start a conversation...</p>
//                 ) : (
//                 <ul className="space-y-4 overflow-y-scroll">
//                     {chatHistory.map((msg, index) => (
//                     <li key={index} className={`text-sm ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
//                         <div className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-gray-200 text-gray-800' : 'bg-white border border-gray-200 text-gray-600'}`}>
//                             <p className="line-clamp-3">{msg.text}</p>
//                         </div>
//                     </li>
//                     ))}
//                 </ul>
//                 )}
//                 <div ref={chatEndRef} />
//             </div>
//             </aside>
//         )}

//         {/* CENTER MAIN AREA */}
//         <main className="flex-1 flex flex-col relative bg-white">
            
//             {isChatExpanded ? (
//                 // === EXPANDED CHAT VIEW ===
//                 <div className="flex-1 flex flex-col p-6 bg-gray-50 animate-in fade-in duration-300">
//                     <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
//                         <h2 className="text-lg font-bold text-gray-800">Conversation</h2>
//                         <button 
//                             onClick={toggleChatExpand}
//                             className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                             Close Chat
//                         </button>
//                     </div>
                    
//                     <div className="flex-1 overflow-y-auto space-y-6 px-4 md:px-20">
//                         {chatHistory.map((msg, index) => (
//                             <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                                 <div className={`max-w-2xl p-4 rounded-2xl ${
//                                     msg.role === 'user' 
//                                     ? 'bg-black text-white rounded-br-none' 
//                                     : 'bg-white border border-gray-200 shadow-sm text-gray-800 rounded-bl-none'
//                                 }`}>
//                                     <div className="text-xs opacity-50 mb-1 uppercase font-bold">
//                                         {msg.role === 'user' ? 'You' : 'Coffee&Code AI'}
//                                     </div>
//                                     <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
//                                 </div>
//                             </div>
//                         ))}
//                         {isGenerating && (
//                              <div className="flex justify-start">
//                                 <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-none">
//                                     <div className="flex space-x-2">
//                                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
//                                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
//                                     </div>
//                                 </div>
//                              </div>
//                         )}
//                         <div ref={chatEndRef} />
//                     </div>
//                 </div>
//             ) : (
//                 // === WEBSITE PREVIEW VIEW (Default) ===
//                 <div className="flex-1 overflow-auto p-8 lg:p-12 flex items-center justify-center bg-dot-pattern">
//                     {!previewContent && !isGenerating ? (
//                         <div className="text-center space-y-4 max-w-md">
//                             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                                 <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-lg font-medium text-gray-900">Ready to create</h3>
//                             <p className="text-sm text-gray-500">Describe your dream website in the prompt bar below to get started.</p>
//                         </div>
//                     ) : (
//                         <div className={`w-full h-full max-w-6xl bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden transition-opacity duration-500 ${isGenerating ? 'opacity-50 animate-pulse' : 'opacity-100'}`}>
//                              {/* Browser Mockup Header */}
//                              <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2">
//                                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
//                                 <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
//                                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
//                                 <div className="ml-4 flex-1 bg-white h-6 rounded-md text-xs flex items-center px-2 text-gray-400">
//                                     localhost:3000
//                                 </div>
//                              </div>
                             
//                              {/* The Actual Preview Content */}
//                              <div className="w-full h-[calc(100%-2.5rem)] bg-white relative">
//                                   {isGenerating ? (
//                                       <div className="absolute inset-0 flex flex-col items-center justify-center">
//                                           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mb-2"></div>
//                                           <p className="text-sm text-gray-500">Generating Interface...</p>
//                                       </div>
//                                   ) : (
//                                       // Using an iframe to render the extracted HTML safely
//                                       <iframe 
//                                         srcDoc={previewContent || ""}
//                                         className="w-full h-full border-0"
//                                         title="Generated Preview"
//                                         sandbox="allow-scripts" // Adjust sandbox permissions as needed
//                                       />
//                                   )}
//                              </div>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </main>
//       </div>

//       {/* BOTTOM INPUT PROMPT AREA */}
//       <footer className="flex-shrink-0 p-6 bg-white border-t border-gray-200 z-20">
//         <div className="max-w-4xl mx-auto">
//             <form onSubmit={handleSubmitPrompt} className="relative flex items-center w-full shadow-lg rounded-2xl overflow-hidden ring-1 ring-gray-100">
//             <div className="absolute left-4 text-gray-400">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//             </div>
//             <input
//                 type="text"
//                 value={prompt}
//                 onChange={handlePromptChange}
//                 placeholder="Ask Coffee&Code AI..."
//                 className="w-full pl-12 pr-32 py-4 bg-white text-gray-900 placeholder-gray-400 focus:outline-none text-base"
//                 disabled={isGenerating}
//             />
//             <div className="absolute right-2">
//                 <button
//                     type="submit"
//                     className={`
//                         px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
//                         ${prompt.trim() && !isGenerating
//                             ? 'bg-black text-white hover:bg-gray-800 shadow-md' 
//                             : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
//                     `}
//                     disabled={!prompt.trim() || isGenerating}
//                 >
//                     {isGenerating ? 'Thinking...' : 'Send'}
//                 </button>
//             </div>
//             </form>
//         </div>
//       </footer>
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect, useRef } from 'react';

// Define a type for our chat messages
type Message = {
  role: 'user' | 'ai';
  text: string;
};

export default function AIWebsiteGenerator() {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]); 
  
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isChatExpanded]);

  const handleSubmitPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    const userPrompt = prompt;
    setPrompt('');
    setIsGenerating(true);

    setChatHistory((prev) => [...prev, { role: 'user', text: userPrompt }]);

    try {
      const res = await fetch("./api/Gemini-talk/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Your name is Coffee&Code Ai. User Says: ${userPrompt}`
        }),
      });

      const data = await res.json();
      
      if (data.text) {
        setChatHistory((prev) => [...prev, { role: 'ai', text: data.text }]);
        
        const codeBlockMatch = data.text.match(/```(?:html|xml|css|js|jsx|tsx)?\s*([\s\S]*?)```/);

        if (codeBlockMatch && codeBlockMatch[1]) {
            const extractedCode = codeBlockMatch[1].trim();
            console.log("Extracted Code:", extractedCode);

            const secondRes = await fetch("./api/Gemini-Gen", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: extractedCode }),
            });
            const webData = await secondRes.json();

            if (webData.text) {
                console.log(webData)
                setPreviewContent(extractedCode); 
                setIsChatExpanded(false); 
            } else {
                console.log("No code block found in response to extract.");
            }
        }
      } else {
        setChatHistory((prev) => [...prev, { role: 'ai', text: "Failed to generate response." }]);
      }
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [...prev, { role: 'ai', text: "Error connecting to AI." }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleChatExpand = () => {
    setIsChatExpanded(!isChatExpanded);
  };

  return (
    // FIX 1: Changed overflow-auto to overflow-hidden
    <div className="flex flex-col h-screen w-full bg-white text-gray-900 font-sans overflow-hidden">
      
      {/* TOP HEADER */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 flex-shrink-0 bg-white z-10">
        <div className="flex items-center space-x-2">
          <div className="text-xs font-bold uppercase tracking-widest text-black">
           <img src="/logo.png" alt="WebGen" className="w-48 invert"/>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 border border-gray-200">
            JD
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* LEFT SIDEBAR (CHAT COMPACT) */}
        {!isChatExpanded && (
            <aside className="hidden md:flex w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0 flex-col p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Chat
                </h2>
                <button 
                    onClick={toggleChatExpand}
                    className="text-gray-400 hover:text-black transition-colors"
                    title="Expand Chat"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                </button>
            </div>

            {/* FIX 2: Fixed typo 'sroll' to 'auto' */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {chatHistory.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Start a conversation...</p>
                ) : (
                <ul className="space-y-4">
                    {chatHistory.map((msg, index) => (
                    <li key={index} className={`text-sm ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-gray-200 text-gray-800' : 'bg-white border border-gray-200 text-gray-600'}`}>
                            <p className="line-clamp-3">{msg.text}</p>
                        </div>
                    </li>
                    ))}
                </ul>
                )}
                <div ref={chatEndRef} />
            </div>
            </aside>
        )}

        {/* CENTER MAIN AREA */}
        <main className="flex-1 flex flex-col relative bg-white overflow-hidden">
            
            {isChatExpanded ? (
                // === EXPANDED CHAT VIEW ===
                // FIX 3: Added h-full and overflow-hidden here. 
                // This ensures the container stays within screen bounds.
                <div className="flex-1 h-full overflow-hidden flex flex-col p-6 bg-gray-50 animate-in fade-in duration-300">
                    
                    {/* Header - This will now stay fixed at the top */}
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 flex-shrink-0">
                        <h2 className="text-lg font-bold text-gray-800">Conversation</h2>
                        <button 
                            onClick={toggleChatExpand}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close Chat
                        </button>
                    </div>
                    
                    {/* Scrollable Message List */}
                    <div className="flex-1 overflow-y-auto space-y-6 px-4 md:px-20 pb-4">
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-2xl p-4 rounded-2xl overflow-x-auto ${
                                    msg.role === 'user' 
                                    ? 'bg-black text-white rounded-br-none' 
                                    : 'bg-white border border-gray-200 shadow-sm text-gray-800 rounded-bl-none'
                                }`}>
                                    <div className="text-xs opacity-50 mb-1 uppercase font-bold">
                                        {msg.role === 'user' ? 'You' : 'Coffee&Code AI'}
                                    </div>
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isGenerating && (
                             <div className="flex justify-start">
                                <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-none">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                    </div>
                                </div>
                             </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                </div>
            ) : (
                // === WEBSITE PREVIEW VIEW (Default) ===
                <div className="flex-1 overflow-auto p-8 lg:p-12 flex items-center justify-center bg-dot-pattern">
                    {!previewContent && !isGenerating ? (
                        <div className="text-center space-y-4 max-w-md">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Ready to create</h3>
                            <p className="text-sm text-gray-500">Describe your dream website in the prompt bar below to get started.</p>
                        </div>
                    ) : (
                        <div className={`w-full h-full max-w-6xl bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden transition-opacity duration-500 ${isGenerating ? 'opacity-50 animate-pulse' : 'opacity-100'}`}>
                             {/* Browser Mockup Header */}
                             <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                <div className="ml-4 flex-1 bg-white h-6 rounded-md text-xs flex items-center px-2 text-gray-400">
                                    localhost:3000
                                </div>
                             </div>
                             
                             {/* The Actual Preview Content */}
                             <div className="w-full h-[calc(100%-2.5rem)] bg-white relative">
                                  {isGenerating ? (
                                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mb-2"></div>
                                          <p className="text-sm text-gray-500">Generating Interface...</p>
                                      </div>
                                  ) : (
                                      <iframe 
                                        srcDoc={previewContent || ""}
                                        className="w-full h-full border-0"
                                        title="Generated Preview"
                                        sandbox="allow-scripts" 
                                      />
                                  )}
                             </div>
                        </div>
                    )}
                </div>
            )}
        </main>
      </div>

      {/* BOTTOM INPUT PROMPT AREA */}
      <footer className="flex-shrink-0 p-6 bg-white border-t border-gray-200 z-20">
        <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmitPrompt} className="relative flex items-center w-full shadow-lg rounded-2xl overflow-hidden ring-1 ring-gray-100">
            <div className="absolute left-4 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <input
                type="text"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Ask Coffee&Code AI..."
                className="w-full pl-12 pr-32 py-4 bg-white text-gray-900 placeholder-gray-400 focus:outline-none text-base"
                disabled={isGenerating}
            />
            <div className="absolute right-2">
                <button
                    type="submit"
                    className={`
                        px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                        ${prompt.trim() && !isGenerating
                            ? 'bg-black text-white hover:bg-gray-800 shadow-md' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                    `}
                    disabled={!prompt.trim() || isGenerating}
                >
                    {isGenerating ? 'Thinking...' : 'Send'}
                </button>
            </div>
            </form>
        </div>
      </footer>
    </div>
  );
}