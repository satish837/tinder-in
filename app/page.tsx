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
        <div className="max-w-7xl mx-auto  flex items-center justify-between">
          <div className="text-lg font-bold"><Image src="/tinder-logo.png" alt="Tinder" width={100} height={100} /></div>
          <MobileMenu />
        </div>
      </nav>

      <HeroSection />

      <section className="w-full mx-auto px-4 mt-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-8xl font-extrabold text-pinkMain leading-none">
            What's the hype around
            <span className="whitespace-nowrap block">School of Swipe™?</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-2xl">
            Because no one teaches you how to flirt, catch feelings, or deal with the "what are we" talk - until now. From decoding green flags to mastering the art of moving on, this is your go-to crash course in dating smarter, feeling deeper, and keeping your chill while you do it.
          </p>
        </div>

        <div className="max-w-5xl mx-auto my-20 grid gap-20">
          <InfoCard
            title="Emotional <span class='block'>GPS</span>"
            subtitle="Feeling drained? <span class='block'>Here’s how to refill your cup</span>"
            image="/emotional-gps-thumb.png"
            reverse
          />
          <InfoCard
            title="Dating <span class='block'>Playbook</span>"
            subtitle="Decode dating lingo, spot <span class='block'>the flags, vibe like a pro</span>"
            image="/dating-playbook.png"
            
          />
          <InfoCard
            title="Dating Safety <span class='block'>101</span>"
            subtitle="Safe dating isn’t boring - <span class='block'>it’s the ultimate flex</span>"
            image="/dating-safty-thumb.png"
            reverse
          />
        </div>
      </section>

      <footer className="w-full bg-black text-white py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4 text-sm flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="w-full md:w-1/2">
            <p>© 2025 Tinder LLC. Tinder, Swipe, the Flame logo, Super Like, It's A Match!,<br/>
            and School of Swipe are all trademarks of Tinder LLC. All rights reserved.</p>
          </div>
          
          <div className="flex flex-col gap-2 w-full md:w-auto">
            {/* Footer Links */}
            <div className="flex gap-4 justify-center md:justify-end flex-wrap">
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
             <div className="flex gap-4 justify-center md:justify-end text-2xl">
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
