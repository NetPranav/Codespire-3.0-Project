"use client"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
// The explicit module import has been removed to resolve the build error.
// We will now assume 'gsap' is globally available in the runtime environment.

// Helper component to display the repeated text for the continuous marquee
type MarqueeTextProps = {
    content: string;
};

const MarqueeText = ({ content }: MarqueeTextProps) => (
    // We repeat the text many times inside the flex container
    // The width of this container will be animated by GSAP
    <div className="shrink-0 flex justify-around min-w-[300%]">
        {[...Array(6)].map((_, i) => (
            <span key={i} className="px-10 whitespace-nowrap">
                {content}
            </span>
        ))}
    </div>
);

// Main component, using App as the default export name for single-file context
export default function App() {
    const marquee1Ref = useRef(null);
    const marquee2Ref = useRef(null);
    const bannerContainerRef = useRef(null);

    // GSAP Animation setup
    useEffect(() => {
        // Check if gsap is available globally to prevent runtime errors
        if (typeof gsap === 'undefined' || !marquee1Ref.current || !marquee2Ref.current || !bannerContainerRef.current) {
            console.error("GSAP library not loaded or component references missing.");
            return;
        }

        // 1. Apply initial tilt to the main container
        gsap.set(bannerContainerRef.current, {
            rotation: -3, // Tilt the entire banner section by -3 degrees
            transformOrigin: "center center"
        });

        // 2. Animation for Marquee Line 1 (Moving Left)
        const animation1 = gsap.to(marquee1Ref.current, {
            xPercent: -100, // Move 100% of its own width to the left
            ease: "none",
            duration: 25, // Speed of the marquee
            repeat: -1, // Infinite loop
            modifiers: {
                // This modifier function ensures the animation seamlessly loops
                // by wrapping the xPercent value when it hits the end.
                xPercent: (x) => parseFloat(x) % -100 + "%"
            }
        });

        // 3. Animation for Marquee Line 2 (Moving Right) - Opposite direction
        const animation2 = gsap.to(marquee2Ref.current, {
            xPercent: 100, // Move 100% of its own width to the right
            ease: "none",
            duration: 25, // Same duration for consistent speed
            repeat: -1,
            modifiers: {
                xPercent: (x) => parseFloat(x) % 100 + "%"
            }
        });

        // Cleanup function for GSAP to kill the animations when the component unmounts
        return () => {
            animation1.kill();
            animation2.kill();
        };
    }, []);

    const text1 = "NEXT.JS + GSAP CREATIVE CODING ";
    const text2 = "DESIGNFUL ANIMATIONS ARE FUN ";

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-inter">
            <style jsx global>{`
                /* Ensure Inter is available and define key font sizes for impact */
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap');
                .marquee-text {
                    font-size: clamp(3rem, 10vw, 8rem); /* Responsive font size */
                    line-height: 1.2;
                }
            `}</style>

            {/* Tilt Wrapper - GSAP handles the rotation on this ref */}
            <div
                ref={bannerContainerRef}
                className="w-full relative py-12 bg-indigo-600 shadow-2xl overflow-hidden max-w-5xl"
            >
                {/* Marquee 1 - Moving Left (Top Layer) */}
                <div
                    ref={marquee1Ref}
                    className="flex flex-nowrap mb-6 will-change-transform"
                >
                    <div className="marquee-text font-black text-white mix-blend-difference">
                        <MarqueeText content={text1} />
                    </div>
                </div>

                {/* Marquee 2 - Moving Right (Bottom Layer) */}
                <div
                    ref={marquee2Ref}
                    className="flex flex-nowrap will-change-transform"
                >
                    <div className="marquee-text font-black text-gray-900 opacity-80" style={{ transform: 'rotate(0.5deg)' }}>
                        <MarqueeText content={text2} />
                    </div>
                </div>

                {/* Overlay design element: subtle gradient at the center */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-linear-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0"></div>
                </div>
            </div>
        </div>
    );
}