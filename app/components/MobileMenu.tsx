"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Hamburger from "hamburger-react";

const menuItems = [
  { label: "App Academy", href: "/" },
  { label: "Safety Syllabus", href: "/safety-syllabus" },
  { label: "IRL Dating", href: "/irl-dating" },
  { label: "Don't Be An Ick", href: "/dont-be-an-ick" },
  { label: "Dating Dictionary", href: "/dating-dictionary" },
  { label: "Astro Dating", href: "/astro-dating" },
  { label: "Consent Course", href: "/consent-course" },
  { label: "Love & Care", href: "/love-and-care" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { primaryItem, secondaryItems } = useMemo(() => {
    const [first, ...rest] = menuItems;
    return { primaryItem: first, secondaryItems: rest };
  }, []);

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
        className={`absolute right-0 top-0 z-40 w-[320px] max-w-[90vw] transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-10 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="relative rounded-3xl shadow-lg overflow-hidden">
         

          <div className="bg-black">
            <ul className="flex flex-col">
              {secondaryItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={closeMenu}
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

