import Image from "next/image";
import HeroSection from "./components/HeroSection";
import InfoCard from "./components/InfoCard";
import MobileMenu from "./components/MobileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faXTwitter, faInstagram, faSnapchat} from "@fortawesome/free-brands-svg-icons";

export default function Page() {
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
            title="Emotional <span class='inline md:block'>GPS</span>"
            subtitle="Feeling drained? <span class='inline md:block'>Here’s how to refill your cup</span>"
            image="/emotional-gps-thumb.png"
            reverse
          />
          <InfoCard
            title="Dating <span class='inline md:block'>Playbook</span>"
            subtitle="Decode dating lingo, spot <span class='inline md:block'>the flags, vibe like a pro</span>"
            image="/dating-playbook.png"
            
          />
          <InfoCard
            title="Dating Safety <span class='inline md:block'>101</span>"
            subtitle="Safe dating isn’t boring - <span class='inline md:block'>it’s the ultimate flex</span>"
            image="/dating-safty-thumb.png"
            reverse
          />
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
