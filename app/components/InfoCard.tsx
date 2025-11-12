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
        className={`bg-white h-full rounded-xl border border-[#bd084d] border-2 shadow-lg px-4 md:px-6 lg:px-8 pt-6 md:py-0 flex flex-col md:flex-row items-center gap-4 md:gap-6 overflow-visible ${
          reverse
            ? "md:flex-col-reverse min-h-[280px] md:min-h-[420px] no-scale-image"
            : "min-h-[280px] md:min-h-[380px] scale-image justify-end"
        }`}
        style={{
          boxShadow:
            "0 12px 25px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div
          className={`flex-1 w-full relative flex items-end justify-center overflow-visible min-h-[200px] md:min-h-[300px] h-full order-2 ${
            reverse ? "md:order-2" : "md:order-1"
          }`}
        >
          <div className="relative w-full overflow-visible h-[200px] md:h-[480px] -mt-[60px] md:-mt-[100px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
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

          {expandable && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="mt-4 mb-2 self-start inline-flex items-center gap-2 rounded-full border-2 border-[#bd084d] px-4 py-2 text-sm md:text-base font-semibold text-[#bd084d] hover:bg-[#bd084d] hover:text-white transition-colors"
            >
              {open ? "Hide details" : "Show details"}
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
            </button>
          )}
        </div>
      </div>

      {expandable && (
        <div
          className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
          style={{ maxHeight }}
          aria-hidden={!open}
        >
          <div ref={contentRef} className="px-4 md:px-6 lg:px-8 pt-6">
            {expandedContent}
          </div>
        </div>
      )}
    </article>
  );
}
