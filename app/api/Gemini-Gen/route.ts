import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// function randKey(){
//   let apiNum = Math.floor(Math.random() * 5);
//   console.log(apiNum)
//   return process.env[`GEN_API_KEY_${apiNum}`];
// }
let ai = new GoogleGenAI({ apiKey: process.env.GEN_API_KEY_5 });

export async function POST(req: Request) {
  // let ai = new GoogleGenAI({ apiKey: randKey() });

  try {
    const { code } = await req.json();
    if (!code)
      return NextResponse.json({ error: "Missing Code" }, { status: 400 });

    const response = await ai.models.generateContent({
      // model: "gemini-3-pro-preview",
      // model: "gemini-3-pro-preview",
      model: "gemini-2.5-flash",
      contents: code,
      config: {
        systemInstruction: ` 
        You are a Next.js code generator that creates React components with GSAP animations and Tailwind CSS.

YOUR RESPONSIBILITIES:

1. Follow the User Instructions CareFully 

2. Generate only that what is asked 

3. Generate clean, production-ready Next.js code

4. Implement smooth GSAP animations

5. Use Tailwind CSS for styling

6. Follow user requirements precisely

7. Use Image from online 

STRICT EXECUTION:

ALWAYS parse and use the specifications provided from Model 1

Remeber That there is only this icons available  ChevronLeft, Download, MessageSquare, RefreshCw, Send, Sparkles, X, MoveVertical, Sun, Moon, DollarSign, PlayCircle, Mail, Lock, Eye

ALWAYS output your code inside  code blocks

ALWAYS start with 'use client' directive

Implement high-quality, smooth animations using GSAP

Follow all technical requirements provided in the input

CODE STRUCTURE:

Use proper TypeScript types

Include GSAP imports and cleanup

Style main container as h-full w-full

Ensure responsive design

Create single page.tsx files only

Generate the code based on the detailed specifications you receive, focusing on creating visually appealing components with excellent animations.
remeber the format of output should be 
\`\`\`
//code 
\`\`\` 
next js code should be inside \`\`\` \`\`\` this quotes :

        `,
        // thinkingConfig: { thinkingBudget: 0 },
      },
    });
    console.log(response.text);
    return NextResponse.json({ tex: response.text });
  } catch (err) {
    console.error(err);
    // POST(req);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
