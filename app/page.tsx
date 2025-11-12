"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import HeroSection from "./components/HeroSection";
import InfoCard from "./components/InfoCard";
import MobileMenu from "./components/MobileMenu";
import DynamicCarousel from "./components/DynamicCarousel";
import CarouselCell from "./components/CarouselCell";
import Accordion from "./components/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faInstagram, faSnapchat } from "@fortawesome/free-brands-svg-icons";

export default function Page() {
  const pathname = usePathname();
  
  // Determine initial selection based on pathname
  const getInitialSelected = () => {
    if (pathname === '/emotional-gps') return 'emotional';
    if (pathname === '/dating-playbook') return 'playbook';
    if (pathname === '/irl-dating') return 'safety';
    return null;
  };

  const [selected, setSelected] = useState<string | null>(getInitialSelected());
  const router = useRouter();
  
  // Map routes to card IDs
  const routeToCardId: Record<string, string> = {
    '/emotional-gps': 'emotional',
    '/dating-playbook': 'playbook',
    '/irl-dating': 'safety',
  };

  // Function to scroll to card with offset
  const scrollToCard = (cardId: string, delay: number = 400) => {
    const attemptScroll = (attempts: number = 0) => {
      // Find the card element (the article wrapper)
      const cardEl = document.getElementById(`card-${cardId}`);
      
      if (cardEl) {
        // Use multiple requestAnimationFrame calls to ensure layout is stable
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const rect = cardEl.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const offset = 100; // Offset for sticky header
            const targetY = rect.top + scrollTop - offset;
            
            // Only scroll if we're not already at the right position (within 10px tolerance)
            const currentScrollY = window.scrollY;
            if (Math.abs(currentScrollY - targetY) > 10) {
              window.scrollTo({
                top: Math.max(0, targetY),
                behavior: 'smooth'
              });
            }
          });
        });
      } else if (attempts < 20) {
        // Retry if element not found yet (increased attempts for navigation)
        setTimeout(() => attemptScroll(attempts + 1), 100);
      }
    };
    
    requestAnimationFrame(() => {
      setTimeout(() => attemptScroll(), delay);
    });
  };

  const toggle = (id?: string) => {
    if (!id) return;
    
    const wasSelected = selected === id;
    
    // Toggle selection
    setSelected((s) => {
      const newSelected = s === id ? null : id;
      
      // Update URL based on new selection state (but don't trigger route handler)
      if (typeof window !== 'undefined') {
        // Use a flag to prevent route handler from interfering
        (window as any).__isManualToggle = true;
        
        if (newSelected === 'emotional') {
          window.history.replaceState({ ...window.history.state }, '', '/emotional-gps');
        } else if (newSelected === 'playbook') {
          window.history.replaceState({ ...window.history.state }, '', '/dating-playbook');
        } else if (newSelected === null) {
          window.history.replaceState({ ...window.history.state }, '', '/');
        }
        
        // Clear flag after a short delay
        setTimeout(() => {
          (window as any).__isManualToggle = false;
        }, 100);
      }
      
      // Scroll to card when opening (not when closing)
      if (newSelected && !wasSelected) {
        // Wait for content to expand, then scroll
        requestAnimationFrame(() => {
          setTimeout(() => {
            scrollToCard(id, 0);
          }, 400);
        });
      }
      
      return newSelected;
    });
  };

  useEffect(() => {
    const handleHash = () => {
      if (!window || !window.location) return;
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      if (hash.startsWith('details-')) {
        const id = hash.replace('details-', '');
        setSelected(id);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Handle route changes from navigation links (only when pathname changes, not on manual toggles)
  useEffect(() => {
    // Skip if this is a manual toggle
    if ((window as any).__isManualToggle) {
      return;
    }
    
    const cardId = routeToCardId[pathname];
    // Only update if the route actually changed and doesn't match current selection
    if (cardId) {
      if (cardId !== selected) {
        setSelected(cardId);
      }
      // Always scroll to card when navigating via menu (even if already selected)
      // Wait longer to ensure route navigation and content expansion are complete
      setTimeout(() => {
        scrollToCard(cardId, 0);
      }, 100);
    } else if (pathname === '/' && selected !== null) {
      // If on home page and a card is selected, clear selection
      setSelected(null);
    }
    // Remove selected from dependencies to prevent loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Initialize selection based on pathname on mount
  useEffect(() => {
    const initialSelected = getInitialSelected();
    if (initialSelected && initialSelected !== selected) {
      setSelected(initialSelected);
      scrollToCard(initialSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prevent scroll restoration on route changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Disable Next.js automatic scroll restoration
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    }
  }, []);

  // Helper function to create carousel items from data
  const createCarouselItems = (data: Array<{ title: string; content: React.ReactNode }>, repeatCount: number = 3) => {
    const items: React.ReactNode[] = [];
    for (let i = 0; i < repeatCount; i++) {
      data.forEach((item, index) => {
        items.push(
          <CarouselCell key={`${i}-${index}`} title={item.title}>
            {item.content}
          </CarouselCell>
        );
      });
    }
    return items;
  };

  const emotionalContent = (
    <>
    <div className="max-w-3xl mx-auto my-8"><Image src="/emotional-gps-banner-top.jpg" alt="Emotional GPS" width={1000} height={1000} className="w-full h-auto" /></div>
      
    <div className="max-w-xl mx-auto my-8">
    <h4 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-pinkMain text-center mb-8">
    How People Really Feel About Dating, and How They Bounce Back?</h4>
    </div>
      <div className="mt-0 grid gap-6">
        {/* Moving Too Fast Carousel - Using helper function */}
        <DynamicCarousel
          items={createCarouselItems([
            {
              title: "Moving Too Fast",
              content: (
                <>
                  <p className="mt-2 text-base md:text-lg text-white">
                    34% of Gen Z say moving too fast is the biggest mental health "ick".
                  </p>
                  <p className="mt-3 text-white">
                    <span className="font-bold">Dr. Chandni's Tip:</span> "Take your time, a steady pace helps your mind and heart align. Don't rush feelings; set the tempo
                    that feels right for you."
                  </p>
                </>
              ),
            },
          ])}
        />
        
        <div className="w-full mx-auto my-8 text-sm px-6">*A digital survey study of 1000+ 18-30 year old dating singles across Delhi, Mumbai, Bengaluru, Kolkata and Chennai in September 2025 by Yuvaa on behalf of Tinder India</div>


        <div className="w-[70%] mx-auto my-2"><Image src="/emotional-gps-banner-btm.jpg" alt="Emotional GPS" width={1000} height={1000} className="w-full h-auto" /></div>


        <div className="max-w-3xl mx-auto mt-8 mb-4">
        <h4 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-pinkMain text-center">Let's take a Fresh Start? Here's Your Playbook</h4>
        </div>

        {/* Fresh Start Carousel - Using helper function */}
        <DynamicCarousel
          items={createCarouselItems([
            {
              title: "Step 1: <span class='font-normal'>Unpack the Baggage</span>",
              content: (
                <>
                <p className="mt-3 text-white font-bold">
                    "Every journey looks different—take your pace, try a step, and create your fresh start."
                  </p>
                  <p className="mt-2 text-base md:text-lg text-white">
                  <strong>Dr. Chandni's Tip:</strong> <span className="italic font-normal">Letting go doesn't mean forgetting, it's about making space for yourself. Dropping keepsakes, even symbolically, helps your mind release old attachments. Feel the little relief as each memory leaves your hands.</span>
                  </p>
                  <div className="w-[70%] mt-6"><Image src="/emotional-gps-carousel-icon.jpg" alt="Fresh Start Step 1" width={1000} height={1000} className="w-full h-auto" /></div>
                </>
              ),
            },
          ])}
        />

<section className="relative rounded-full bg-pinkMain text-white text-center py-6 px-6 max-w-5xl mx-auto">
  <p className="text-lg italic font-light">
    "Every journey looks different, take your pace, try a step, and create your fresh start."
  </p>

  <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
    <div className="absolute w-12 h-3 bg-pink-300/30 rotate-12 top-4 left-10 rounded-lg"></div>
    <div className="absolute w-12 h-3 bg-pink-200/30 -rotate-12 bottom-6 right-16 rounded-lg"></div>
    <div className="absolute w-10 h-2 bg-pink-300/30 rotate-45 bottom-8 left-24 rounded-lg"></div>
    <div className="absolute w-14 h-3 bg-pink-300/30 -rotate-45 top-10 right-32 rounded-lg"></div>
  </div>
</section>

        <section className="rounded-xl p-4 md:p-6 text-center">
          <h6 className="text-lg md:text-3xl font-extrabold text-pinkMain">Pick Your Mood, Make Your Move</h6>
          <p className="mt-2 text-base md:text-xl italic text-gray-700">
            "Take insights from your mind and heart with playful Mood Match Cards to guide your dating vibes and reflect on how you're
            feeling today."
          </p>
          <a href="#download-cards" className="inline-flex items-center justify-center mt-4 rounded-full bg-black text-white px-5 py-3 font-semibold hover:bg-pinkMain transition-colors">
            Download Cards
          </a>
        </section>
      </div>
    </>
  );

  const playbookContent = (
    <>
      <div className="mt-0 grid gap-6">
        <div className="mx-auto w-full">
          <Accordion
            items={[
              {
                title: "Keeping It Real (Green flags vs. red flags quiz)",
                children: (
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      Quiz section 
                    </p>
                    
                  </div>
                ),
              },
              {
                title: "Dating Dictionary (Tinder)",
                children: (
                  <div className="space-y-3">
                    <p className="text-gray-700">
                    Dating Dictionary (Tinder) section
                    </p>
                    
                  </div>
                ),
              },
            ]}
            allowMultiple={true}
          />
        </div>
      </div>
    </>
  );

  return (
    <main className="w-full">
      <nav className="w-full bg-black text-white py-3 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl px-4 md:px-0 mx-auto flex items-center justify-between">
          <div className="text-lg font-bold">
            <a href="/"><Image src="/tinder-logo.png" alt="Tinder" width={100} height={100} className="w-[100px] h-auto md:w-[100px]" /></a>
          </div>
          <MobileMenu />
        </div>
      </nav>

      <HeroSection />

      <div className="w-full mx-auto px-4 mt-4 md:mt-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-8xl font-extrabold text-pinkMain leading-tight md:leading-none px-2 md:px-0">
            What's the hype around
            <span className="block md:whitespace-nowrap">School of Swipe™?</span>
          </h2>
          <p className="mt-4 md:mt-4 text-gray-600 max-w-3xl mx-auto text-base md:text-2xl px-2 md:px-0">
            Because no one teaches you how to flirt, catch feelings, or deal with the "what are we" talk - until now. From decoding
            green flags to mastering the art of moving on, this is your go-to crash course in dating smarter, feeling deeper, and
            keeping your chill while you do it.
          </p>
        </div>

        <div className="max-w-6xl mx-auto my-12 md:my-20 grid gap-12 md:gap-20">
          {(
            [
              {
                id: 'emotional',
                title: "Emotional <span class='inline md:block'>GPS</span>",
                subtitle: "Feeling drained? <span class='inline md:block'>Here's how to refill your cup</span>",
                image: '/emotional-gps-thumb.png',
                reverse: true,
                content: emotionalContent,
              },
              {
                id: 'playbook',
                title: "Dating <span class='inline md:block'>Playbook</span>",
                subtitle: "Decode dating lingo, spot <span class='inline md:block'>the flags, vibe like a pro</span>",
                image: '/dating-playbook.png',
                reverse: false,
                content: playbookContent,
              },
              {
                id: 'safety',
                title: "Dating Safety <span class='inline md:block'>101</span>",
                subtitle: "Safe dating isn't boring - <span class='inline md:block'>it's the ultimate flex</span>",
                image: '/dating-safty-thumb.png',
                reverse: true,
                content: null,
              },
            ]
          ).map((c) => (
            <div key={c.id} data-card-id={c.id}>
              <InfoCard
                id={c.id}
                title={c.title}
                subtitle={c.subtitle}
                image={c.image}
                reverse={c.reverse}
                onActivate={(id) => toggle(id)}
                selected={selected === c.id}
                content={c.content}
                onClose={() => setSelected(null)}
              />
            </div>
          ))}
        </div>
      </div>

      <footer className="w-full bg-black text-white py-6 md:py-8 mt-12 md:mt-16">
        <div className="max-w-6xl mx-auto px-0 text-xs md:text-sm flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="w-full md:w-1/2">
            <p>© 2025 Tinder LLC. Tinder, Swipe, the Flame logo, Super Like, It's A Match!,<br className="hidden md:block" />
            and School of Swipe are all trademarks of Tinder LLC. All rights reserved.</p>
          </div>

          <div className="flex flex-col gap-3 md:gap-2 w-full md:w-auto">
            {/* Footer Links */}
            <div className="flex gap-4 justify-center md:justify-end flex-wrap text-sm md:text-base">
              <a className="underline hover:text-pinkMain transition-colors" href="/terms">
                Terms of Use
              </a>
              <a className="underline hover:text-pinkMain transition-colors" href="/privacy">
                Privacy Policy
              </a>
              <a className="underline hover:text-pinkMain transition-colors" href="/cookies">
                Cookie Policy
              </a>
            </div>
            {/* Social Media Icons */}
            <div className="flex gap-4 justify-center md:justify-end text-xl md:text-2xl">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pinkMain transition-colors" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pinkMain transition-colors" aria-label="Instagram">
                <FontAwesomeIcon icon={faSnapchat} className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pinkMain transition-colors" aria-label="Twitter">
                <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6" />
              </a>

            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
