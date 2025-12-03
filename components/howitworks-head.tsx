'use client'
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeaderWORKS(){
  const headingRef = useRef<HTMLHeadingElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const text = headingRef.current
      if (!text) return
      
      const originalText = text.textContent || ''
      const words = originalText.split(' ')
      
      text.innerHTML = words.map(word => 
        `<span class="word">${word.split('').map(letter => 
          `<span class="letter" style="display: inline-block;">${letter}</span>`
        ).join('')}</span>`
      ).join(' ')

      // Add space between words
      const wordSpans = text.querySelectorAll<HTMLSpanElement>('.word')
      wordSpans.forEach((word, index) => {
        if (index < wordSpans.length - 1) {
          word.style.marginRight = '8px'
        }
      })

      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: text,
          start: "top 70%",
          end: "bottom 30%",
          markers: false,
          toggleActions: "play none none reverse"
        }
      })

      const letters = text.querySelectorAll<HTMLSpanElement>('.letter')
      
      // Set initial state
      gsap.set(letters, {
        y: 30,
        opacity: 0
      })

      tl.to(letters, {
        y: 0,
        opacity: 1,
        scale: 1, 
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.4)"
      })

      // Hover animation with complete sequence
      letters.forEach(letter => {
        const handleMouseEnter = () => {
          // Kill any existing animations on this letter
          gsap.killTweensOf(letter)
          
          // Create a timeline for the hover animation
          const hoverTl = gsap.timeline()
          
          hoverTl.to(letter, {
            rotation: 15,
            duration: 0.3,
            ease: "power2.out"
          })
          .to(letter, {
            rotation: -10,
            duration: 0.2,
            ease: "power2.inOut"
          })
          .to(letter, {
            rotation: 5,
            duration: 0.15,
            ease: "power2.inOut"
          })
          .to(letter, {
            rotation: 0,
            duration: 0.25,
            ease: "elastic.out(1, 0.5)"
          })
        }

        letter.addEventListener('mouseenter', handleMouseEnter)
      })
    }, headingRef)

    return () => ctx.revert() 
  }, [])

  return (
    <div>
      <h1 
        ref={headingRef}
        className="text-[50px] w-[600px] mt-[100px] text-white text-center"
      >
        How It Works?
      </h1>
    </div>
  )
}