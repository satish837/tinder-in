"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Use actual window scroll position
          const scrollPosition = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
          setScrollY(scrollPosition);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax offsets - logo moves down slower, hero image moves down faster
  // Using scrollY directly (in pixels) with a multiplier for parallax effect
  const logoOffset = scrollY * 0.3; // Logo moves down at 30% of scroll speed
  const heroOffset = scrollY * 0.6; // Hero image moves down at 60% of scroll speed

  return (
    <header 
      ref={heroRef}
      className="w-full flex flex-col items-center relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-full relative" style={{ minHeight: "100vh" }}>
        {/* Background with gradient */}
        <div className="absolute inset-0 " />
        
        {/* Hero Image with Parallax */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${heroOffset}px)`,
            willChange: "transform",
            zIndex: 2,
          }}
        >
          <Image
            src="/home-hero.png"
            alt="School of Swipe hero illustration"
            fill
            priority
            className="opacity-90 w-full h-full object-cover object-top"
          />
        </div>

        {/* Background Image Overlay at Bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: 'url(/hero-btm-overlay-bg.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            zIndex: 3,
          }}
        />

        {/* Logo with Parallax - positioned at top center */}
        <div 
          className="absolute top-5 left-1/2 z-10 w-full max-w-2xl px-4"
          style={{
            transform: `translateX(-50%) translateY(${logoOffset}px)`,
            willChange: "transform",
            zIndex: 1,
          }}
        >
          <Image
            src="/sos-logo.png"
            alt="School of Swipe logo"
            width={800}
            height={400}
            className="w-full h-auto mx-auto block"
            priority
          />
        </div>
      </div>
    </header>
  );
}
