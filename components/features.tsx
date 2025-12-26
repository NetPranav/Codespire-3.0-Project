"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer, SplitText);
}

const AnimatedSections = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const headingsRef = useRef<HTMLHeadingElement[]>([]);
  const outerWrappersRef = useRef<HTMLDivElement[]>([]);
  const innerWrappersRef = useRef<HTMLDivElement[]>([]);

  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  const splitHeadingsRef = useRef<any[]>([]);
  const observerRef = useRef<any>(null);

  useEffect(() => {
    // Initialize GSAP animation after component mounts
    const initAnimation = () => {
      const container = containerRef.current;
      const sections = sectionsRef.current;
      const images = imagesRef.current;
      const headings = headingsRef.current;
      const outerWrappers = outerWrappersRef.current;
      const innerWrappers = innerWrappersRef.current;

      if (!container || sections.length === 0) return;

      // Initialize SplitText for each heading
      splitHeadingsRef.current = headings
        .map((heading) =>
          heading
            ? new SplitText(heading, {
                type: "chars,words,lines",
                linesClass: "clip-text",
              })
            : null
        )
        .filter((item): item is any => item !== null);

      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });

      gotoSection(0, 1);

      // Create observer for scroll/touch events
      observerRef.current = Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        onDown: () => {
          !animatingRef.current && gotoSection(currentIndexRef.current - 1, -1);
        },
        onUp: () => {
          !animatingRef.current && gotoSection(currentIndexRef.current + 1, 1);
        },
        tolerance: 10,
        preventDefault: true,
      });
    };

    const wrap = (index: number, length: number) => {
      if (index >= length) return 0;
      if (index < 0) return length - 1;
      return index;
    };

    const gotoSection = (index: number, direction: number) => {
      const sections = sectionsRef.current;
      const images = imagesRef.current;
      const outerWrappers = outerWrappersRef.current;
      const innerWrappers = innerWrappersRef.current;
      const splitHeadings = splitHeadingsRef.current;

      if (sections.length === 0) return;

      index = wrap(index, sections.length);
      animatingRef.current = true;

      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          animatingRef.current = false;
        },
      });

      if (currentIndexRef.current >= 0) {
        gsap.set(sections[currentIndexRef.current], { zIndex: 0 });
        tl.to(images[currentIndexRef.current], { yPercent: -15 * dFactor }).set(
          sections[currentIndexRef.current],
          { autoAlpha: 0 }
        );
      }

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });

      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        {
          yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor),
        },
        {
          yPercent: 0,
        },
        0
      ).fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);

      if (splitHeadings[index]) {
        tl.fromTo(
          splitHeadings[index].chars,
          {
            autoAlpha: 0,
            yPercent: 150 * dFactor,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: {
              each: 0.02,
              from: "random",
            },
          },
          0.2
        );
      }

      currentIndexRef.current = index;
    };

    initAnimation();

    // Cleanup function
    return () => {
      // Revert SplitText instances
      splitHeadingsRef.current.forEach((st) => st && st.revert());
      // Kill observer
      if (observerRef.current) {
        observerRef.current.kill();
      }
    };
  }, []);

  // Helper function to assign refs to arrays
  const addToRefs = (el: any, ref: React.MutableRefObject<any[]>) => {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  };

  const sectionData = [
    {
      className: "first",
      text: "Scroll down",
      bgImage: "https://assets.codepen.io/16327/site-landscape-1.jpg",
    },
    {
      className: "second",
      text: "Animated with GSAP",
      bgImage: "https://assets.codepen.io/16327/site-landscape-5.jpeg",
    },
    {
      className: "third",
      text: "GreenSock",
      bgImage: "https://assets.codepen.io/16327/site-landscape-2.jpg",
    },
    {
      className: "fourth",
      text: "Animation platform",
      bgImage: "https://assets.codepen.io/16327/site-landscape-6.jpg",
    },
    {
      className: "fifth",
      text: "Keep scrolling",
      bgImage: "https://assets.codepen.io/16327/site-landscape-8.jpg",
    },
  ];

  return (
    <div ref={containerRef} className="animation-container">
      <header>
        <div>Animated Sections</div>
        <div>
          <a
            href="https://codepen.io/BrianCross/pen/PoWapLP"
            target="_blank"
            rel="noopener noreferrer"
          >
            Original Inspiration
          </a>
        </div>
      </header>

      {sectionData.map((section, index) => (
        <section
          key={index}
          className={section.className}
          ref={(el) => addToRefs(el, sectionsRef)}
        >
          <div className="outer" ref={(el) => addToRefs(el, outerWrappersRef)}>
            <div
              className="inner"
              ref={(el) => addToRefs(el, innerWrappersRef)}
            >
              <div
                className="bg"
                ref={(el) => addToRefs(el, imagesRef)}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 100%), url(${section.bgImage})`,
                }}
              >
                <h2
                  className="section-heading"
                  ref={(el) => addToRefs(el, headingsRef)}
                >
                  {section.text}
                </h2>
              </div>
            </div>
          </div>
        </section>
      ))}

      <style jsx>{`
        .animation-container {
          position: relative;
          width: 100%;
          height: 100vh; /* Adjust this height as needed */
          overflow: hidden;
        }

        * {
          box-sizing: border-box;
          user-select: none;
        }

        a {
          color: white;
          text-decoration: none;
        }

        body {
          margin: 0;
          padding: 0;
          color: white;
          text-transform: uppercase;
        }

        h2 {
          font-size: clamp(1rem, 8vw, 10rem);
          font-weight: 600;
          text-align: center;
          margin-right: -0.5em;
          width: 90vw;
          max-width: 1200px;
          text-transform: none;
          color: white;
        }

        header {
          position: fixed;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          width: 100%;
          z-index: 3;
          height: 7em;
          font-size: clamp(0.66rem, 2vw, 1rem);
          letter-spacing: 0.5em;
          color: white;
        }

        section {
          height: 100%;
          width: 100%;
          top: 0;
          position: fixed;
          visibility: hidden;

          .outer,
          .inner {
            width: 100%;
            height: 100%;
            overflow-y: hidden;
          }

          .bg {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            background-size: cover;
            background-position: center;

            h2 {
              z-index: 999;
              color: white;
            }

            .clip-text {
              overflow: hidden;
            }
          }
        }

        .first .bg {
          background-position: center;
        }

        .second .bg {
          background-position: center;
        }

        .third .bg {
          background-position: center;
        }

        .fourth .bg {
          background-position: center;
        }

        .fifth .bg {
          background-position: 50% 45%;
        }

        h2 * {
          will-change: transform;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default AnimatedSections;
