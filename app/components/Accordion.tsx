"use client";

import React, { useState, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-pinkMain/20 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-2 text-left hover:bg-pinkMain/5 transition-colors"
        aria-expanded={isOpen}
      >
        <h5 className="text-lg md:text-2xl font-extrabold text-pinkMain pr-4">
          {title}
        </h5>
        <FontAwesomeIcon
          icon={isOpen ? faMinus : faPlus}
          className="text-pinkMain flex-shrink-0 transition-all duration-300"
          style={{ width: '20px', height: '20px' }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? '2000px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
        aria-hidden={!isOpen}
      >
        <div className="py-4 px-2 text-gray-700 text-base md:text-lg">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(items.map((item, index) => (item.defaultOpen ? index : -1)).filter(i => i !== -1))
  );

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full mx-auto">
      {items.map((item, index) => (
        <div key={index} className="border-b-2 border-[#bd084d] last:border-b-0">
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between py-4 px-6 text-left text-pinkMain hover:bg-pinkMain hover:text-white transition-colors"
            aria-expanded={openItems.has(index)}
          >
            <h5 className="text-lg md:text-2xl font-extrabold  pr-4">
              {item.title}
            </h5>
            <FontAwesomeIcon
              icon={openItems.has(index) ? faMinus : faPlus}
              className="flex-shrink-0 transition-all duration-300"
              style={{ width: '20px', height: '20px' }}
            />
          </button>
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: openItems.has(index) ? '2000px' : '0px',
              opacity: openItems.has(index) ? 1 : 0,
            }}
            aria-hidden={!openItems.has(index)}
          >
            <div className="py-4 px-2 text-gray-700 text-base md:text-lg">
              {item.children}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

