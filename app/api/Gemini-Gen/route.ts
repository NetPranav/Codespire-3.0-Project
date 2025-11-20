// app/api/generate/route.ts  (server-only)
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEN_API_KEY}); // server only

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt.trim()) return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });

    const response = await ai.models.generateContent({
    //   model: "gemini-3-pro-preview",
 model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: ` 
        You are a Next.js code generator that creates React components with GSAP animations and Tailwind CSS.

YOUR RESPONSIBILITIES:

Generate clean, production-ready Next.js code

Implement smooth GSAP animations

Use Tailwind CSS for styling

Follow user requirements precisely

STRICT EXECUTION:

ALWAYS parse and use the specifications provided from Model 1

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

        `
        // thinkingConfig: { thinkingBudget: 0 },
      },
    });
    console.log(response.text);
    return NextResponse.json({ tex: response.text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}