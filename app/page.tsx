import Image from "next/image";
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HeroSection from "./components/HeroSection";
import InfoCard from "./components/InfoCard";
import MobileMenu from "./components/MobileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faXTwitter, faInstagram, faSnapchat} from "@fortawesome/free-brands-svg-icons";

function DetailsPanel({ open, children, onClose }: { open: boolean; children: React.ReactNode; onClose?: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const recalc = () => setMaxHeight(open ? el.scrollHeight : 0);
    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, children]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-0">
      <div className="overflow-hidden transition-[max-height] duration-500 ease-in-out" style={{ maxHeight }} aria-hidden={!open}>
        <div ref={ref} className="pt-6 pb-8">
          {open && (
            <div className="bg-white/70 rounded-xl-2 md:rounded-xl shadow-card border border-[#bd084d] p-4 md:p-6 lg:p-8">
              <div className="flex justify-end">
                <button onClick={onClose} className="text-sm text-gray-500 underline">Close</button>
              </div>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [selected, setSelected] = useState<string | null>(null);

  const toggle = (id?: string) => {
    if (!id) return;
    setSelected((s) => (s === id ? null : id));
    // scroll into view when opening
    if (selected !== id) {
      // wait for DOM update then scroll
      setTimeout(() => {
        const el = document.querySelector('#details-panel');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 320);
    }
  };

  const emotionalContent = (
    <>
      <h4 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-pinkMain text-center">
        How People Really Feel About Dating, and How They Bounce Back?
      </h4>

      <div className="mt-6 grid gap-6">
        <section className="bg-pinkLight/20 rounded-xl p-4 md:p-6">
          <h5 className="text-lg md:text-xl font-extrabold text-pinkMain">Moving Too Fast</h5>
          <p className="mt-2 text-base md:text-lg text-gray-700">
            34% of Gen Z say moving too fast is the biggest mental health “ick”.
          </p>
          <p className="mt-3 text-gray-700">
            Dr. Chandni’s Tip: Take your time, a steady pace helps your mind and heart align. Don’t rush feelings; set the tempo that feels right for you.
          </p>
        </section>

        <section className="rounded-xl p-4 md:p-6 border border-pinkLight/40">
          <h5 className="text-lg md:text-xl font-extrabold text-pinkMain">Step 1: Unpack the Baggage</h5>
          <p className="mt-2 text-gray-700">
            Make space for yourself by letting go of old memories. Letting go doesn’t mean forgetting; it’s about making
            space for your next chapter. Dropping keepsakes, even symbolically, helps your mind release old attachments.
          </p>
          <blockquote className="mt-3 italic text-gray-700 border-l-4 border-pinkMain pl-3">
            “Every journey looks different—take your pace, try a step, and create your fresh start.”
          </blockquote>
        </section>

        <section className="rounded-xl p-4 md:p-6 bg-pinkLight/10 border border-pinkLight/40 text-center">
          <h6 className="text-lg md:text-xl font-extrabold text-pinkMain">Pick Your Mood, Make Your Move</h6>
          <p className="mt-2 text-gray-700">
            Take insights from your mind and heart with playful Mood Match Cards to guide your dating vibes and reflect on how you’re feeling today.
          </p>
          <a
            href="#download-cards"
            className="inline-flex items-center justify-center mt-4 rounded-full bg-black text-white px-5 py-3 font-semibold hover:bg-pinkMain transition-colors"
          >
            Download Cards
          </a>
        </section>
      </div>
    </>
  );

  return (
    <main className="w-full">
      <nav className="w-full bg-black text-white py-3 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl px-4 md:px-0 mx-auto flex items-center justify-between">
          <div className="text-lg font-bold">
            <Image
              src="/tinder-logo.png"
              alt="Tinder"
              width={100}
              height={100}
              className="w-[100px] h-auto md:w-[100px]"
            />
          </div>
          <MobileMenu />
        </div>
      </nav>

      <HeroSection />

      <section className="w-full mx-auto px-4 mt-4 md:mt-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-8xl font-extrabold text-pinkMain leading-tight md:leading-none px-2 md:px-0">
            What's the hype around
            <span className="block md:whitespace-nowrap">School of Swipe™?</span>
          </h2>
          <p className="mt-4 md:mt-4 text-gray-600 max-w-3xl mx-auto text-base md:text-2xl px-2 md:px-0">
            Because no one teaches you how to flirt, catch feelings, or deal with the "what are we" talk - until now. From decoding green flags to mastering the art of moving on, this is your go-to crash course in dating smarter, feeling deeper, and keeping your chill while you do it.
          </p>
        </div>

        <div className="max-w-6xl mx-auto my-12 md:my-20 grid gap-12 md:gap-20">
          <InfoCard
            id="emotional"
            title="Emotional <span class='inline md:block'>GPS</span>"
            subtitle="Feeling drained? <span class='inline md:block'>Here’s how to refill your cup</span>"
            image="/emotional-gps-thumb.png"
            reverse
            onActivate={(id) => toggle(id)}
            selected={selected === 'emotional'}
          />
          <InfoCard
            id="playbook"
            title="Dating <span class='inline md:block'>Playbook</span>"
            subtitle="Decode dating lingo, spot <span class='inline md:block'>the flags, vibe like a pro</span>"
            image="/dating-playbook.png"
            onActivate={(id) => toggle(id)}
            selected={selected === 'playbook'}
          />
          <InfoCard
            id="safety"
            title="Dating Safety <span class='inline md:block'>101</span>"
            subtitle="Safe dating isn’t boring - <span class='inline md:block'>it’s the ultimate flex</span>"
            image="/dating-safty-thumb.png"
            reverse
            onActivate={(id) => toggle(id)}
            selected={selected === 'safety'}
          />
        </div>

        <div id="details-panel" className="mt-6">
          <DetailsPanel open={selected === 'emotional'} onClose={() => setSelected(null)}>
            {emotionalContent}
          </DetailsPanel>
        </div>
      </section>

      <footer className="w-full bg-black text-white py-6 md:py-8 mt-12 md:mt-16">
        <div className="max-w-5xl mx-auto px-4 text-xs md:text-sm flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="w-full md:w-1/2">
            <p>© 2025 Tinder LLC. Tinder, Swipe, the Flame logo, Super Like, It's A Match!,<br className="hidden md:block"/>
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
             <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pinkMain transition-colors"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pinkMain transition-colors"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faSnapchat} className="w-6 h-6" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pinkMain transition-colors"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6" />
              </a>

            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
