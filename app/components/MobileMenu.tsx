"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Hamburger from "hamburger-react";

const menuItems = [
  { label: "Emotional GPS", href: "#details-emotional" },
  { label: "Dating Playbook", href: "/safety-syllabus" },
  { label: "Dating Safety 101", href: "/irl-dating" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative">
      <div className="relative z-50">
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          size={32}
          color="#ffffff"
          label="Toggle navigation menu"
          hideOutline
        />
      </div>

    

      <nav
        className={`absolute right-0 top-5 z-40 w-[320px] max-w-[90vw] transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-10 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="relative rounded-3xl shadow-lg overflow-hidden">
         

          <div className="bg-black">
            <ul className="flex flex-col">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || (typeof window !== 'undefined' && window.location.hash === item.href);
                const handleClick = (e: React.MouseEvent) => {
                  // allow hash links and internal routes to be pushed via router
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    router.push(item.href);
                    closeMenu();
                    return;
                  }
                  // otherwise navigate normally
                  closeMenu();
                };

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={handleClick}
                      className={`block px-6 py-4 text-white transition-colors ${
                        isActive
                          ? "bg-white/20"
                          : "hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
