"use client";

import Image from "next/image";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

interface InfoCardProps {
  title: string;
  subtitle: string;
  image: string;
  reverse?: boolean;
  expandable?: boolean;
  expandedContent?: ReactNode;
}

export default function InfoCard({
  title,
  subtitle,
  image,
  reverse = false,
  expandable = false,
  expandedContent,
}: InfoCardProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  // Compute natural height for smooth max-height transition
  const recalc = useMemo(
    () => () => {
      if (!contentRef.current) return;
      const h = contentRef.current.scrollHeight;
      setMaxHeight(open ? h : 0);
    },
    [open]
  );

  useEffect(() => {
    recalc();
  }, [recalc, title, subtitle, image, expandedContent]);

  useEffect(() => {
    if (!contentRef.current) return;
    const ro = new ResizeObserver(() => recalc());
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, [recalc]);

  return (
    <article className="w-full mx-auto overflow-visible">
      <div
        role={expandable ? "button" : undefined}
        tabIndex={expandable ? 0 : undefined}
        aria-expanded={expandable ? open : undefined}
        onClick={expandable ? () => setOpen(v => !v) : undefined}
        onKeyDown={expandable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(v=>!v); } } : undefined}
        className={`bg-white relative h-full rounded-xl border border-[#bd084d] border-2 shadow-lg px-4 md:px-6 lg:px-8 pt-6 md:py-0 flex flex-col md:flex-row items-center gap-4 md:gap-6 overflow-visible ${
          reverse
            ? "md:flex-col-reverse min-h-[280px] md:min-h-[420px] no-scale-image"
            : "min-h-[280px] md:min-h-[380px] scale-image justify-end"
        }`}
        style={{
          boxShadow:
            "0 12px 25px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.15)",
          cursor: expandable ? 'pointer' : undefined
        }}
      >
        <div
          className={`flex-1 w-full relative flex items-end justify-center overflow-visible min-h-[200px] md:min-h-[300px] h-full order-2 ${
            reverse ? "md:order-2" : "md:order-1"
          }`}
        >
          <div className="relative w-full overflow-visible h-[200px] md:h-[480px] -mt-[60px] md:-mt-[100px] pointer-events-none">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain pointer-events-none"
              style={{
                objectPosition: "bottom",
                transformOrigin: "bottom center",
              }}
            />
          </div>
        </div>
        <div
          className={`flex-1 text-left flex items-center cont flex-col w-full md:w-auto order-1 ${
            reverse ? "md:order-1" : "md:order-2"
          }`}
        >
          <h3
            className="text-3xl md:text-2xl lg:text-6xl font-extrabold text-pinkLight"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className="mt-2 text-pinkLight text-base md:text-xl lg:text-2xl"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />

          {/* Small visual affordance - caret */}
          {expandable && (
            <span className={`mt-4 mb-2 self-start inline-flex items-center gap-2 text-sm md:text-base font-semibold text-[#bd084d]`}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}

          {/* Expanded content placed INSIDE the card so the card grows instead of pushing the whole article */}
          {expandable && (
            <div
              className="w-full mt-4 overflow-hidden transition-[max-height] duration-500 ease-in-out"
              style={{ maxHeight }}
              aria-hidden={!open}
            >
              <div ref={contentRef} className="px-0 md:px-0 pt-0">
                {expandedContent}
              </div>
            </div>
          )}
        </div>
      </div>

    </article>
  );
}
