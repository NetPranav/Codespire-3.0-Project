'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

interface ScrollingTextProps {
  texts?: string[];
  colors?: {
    backgroundColor?: string;
    textColor?: string;
  };
  speed?: number;
}

interface HorizontalLoopConfig {
  repeat?: number;
  paused?: boolean;
  speed?: number;
  snap?: number | boolean;
  paddingRight?: number;
  reversed?: boolean;
}

export default function ScrollingText({ 
  texts = [
    "Animate Anything...",
    "Delivering silky-smooth performance", 
    "so you can focus on the fun stuff."
  ],
  colors = {
    backgroundColor: '#000000',
    textColor: '#ffffff'
  },
  speed = 1
}: ScrollingTextProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Horizontal loop function
  const horizontalLoop = (items: HTMLElement[], config: HorizontalLoopConfig = {}) => {
    items = gsap.utils.toArray(items);
    const tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => { tl.totalTime(tl.rawTime() + tl.duration() * 100); }
    });

    const length = items.length;
    const startX = items[0].offsetLeft;
    const times: number[] = [];
    const widths: number[] = [];
    const xPercents: number[] = [];
    let curIndex = 0;
    const pixelsPerSecond = (config.speed || 1) * 100;
    const snap = typeof config.snap === 'number' || Array.isArray(config.snap) || typeof config.snap === 'object'
      ? gsap.utils.snap(config.snap)
      : (v: number) => v;
    
    // Set initial positions and calculate widths
    gsap.set(items, {
      xPercent: (i, el) => {
        const element = el as HTMLElement;
        const w = widths[i] = parseFloat(gsap.getProperty(element, "width", "px") as string);
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(element, "x", "px") as string) / w) * 100 + 
          (parseFloat(gsap.getProperty(element, "xPercent") as string) || 0)
        );
        return xPercents[i];
      }
    });

    gsap.set(items, { x: 0 });
    
    const totalWidth = items[length-1].offsetLeft + 
      xPercents[length-1] / 100 * widths[length-1] - startX + 
      items[length-1].offsetWidth * 
      (parseFloat(gsap.getProperty(items[length-1], "scaleX") as string) || 1) + 
      (parseFloat(config.paddingRight?.toString() || '0'));

    for (let i = 0; i < length; i++) {
      const item = items[i];
      const curX = xPercents[i] / 100 * widths[i];
      const distanceToStart = item.offsetLeft + curX - startX;
      const distanceToLoop = distanceToStart + widths[i] * 
        (parseFloat(gsap.getProperty(item, "scaleX") as string) || 1);

      tl.to(item, {
        xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
        duration: distanceToLoop / pixelsPerSecond
      }, 0)
      .fromTo(item, {
        xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)
      }, {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false
      }, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
      
      times[i] = distanceToStart / pixelsPerSecond;
    }

    const toIndex = (index: number, vars?: gsap.TweenVars) => {
      vars = vars || {};
      if (Math.abs(index - curIndex) > length / 2) {
        index += index > curIndex ? -length : length;
      }
      
      const newIndex = gsap.utils.wrap(0, length, index);
      let time = times[newIndex];
      
      if (time > tl.time() !== index > curIndex) {
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    };

    // Add methods to timeline
    (tl as any).next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
    (tl as any).previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
    (tl as any).current = () => curIndex;
    (tl as any).toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
    (tl as any).times = times;

    tl.progress(1, true).progress(0, true);

    if (config.reversed) {
      (tl.vars as any).onReverseComplete();
      tl.reverse();
    }

    return tl;
  };

  useEffect(() => {
    if (!railRef.current) return;

    const scrollingTextElements = gsap.utils.toArray('.rail h4') as HTMLElement[];
    
    const timeline = horizontalLoop(scrollingTextElements, {
      repeat: -1,
      paddingRight: 30,
      speed: speed
    });

    tlRef.current = timeline;

    // Observer for scroll interaction
    Observer.create({
      target: window,
      onChangeY: (self) => {
        if (!tlRef.current) return;
        
        let factor = 2.5;
        if (self.deltaY < 0) {
          factor *= -1;
        }
        
        gsap.timeline({
          defaults: {
            ease: "none",
          }
        })
          .to(tlRef.current, { 
            timeScale: factor * 2.5, 
            duration: 0.2, 
            overwrite: true 
          })
          .to(tlRef.current, { 
            timeScale: factor / 2.5, 
            duration: 1 
          }, "+=0.3");
      }
    });

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [texts, speed]);

  return (
    <div 
      className="scrolling-text"
      style={{ 
        backgroundColor: colors.backgroundColor,
        color: colors.textColor
      }}
    >
      <div ref={railRef} className="rail">
        {texts.map((text, index) => (
          <h4 
            key={index}
            style={{ color: colors.textColor }}
          >
            {text}
          </h4>
        ))}
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .scrolling-text {
          overflow: hidden;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
        }

        .rail {
          display: flex;
        }

        .rail h4 {
          white-space: nowrap;
          font-size: 100px;
          font-weight: 900;
          line-height: 1em;
          margin: 0 30px 0 0;
        }

        @media (max-width: 768px) {
          .rail h4 {
            font-size: 60px;
          }
        }

        @media (max-width: 480px) {
          .rail h4 {
            font-size: 40px;
          }
        }
      `}</style>
    </div>
  );
}